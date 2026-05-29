import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  verifyStripeSignature,
  constantTimeEqual,
} from "../supabase/functions/stripe-webhook/index";

// Helper: produce a real Stripe-style HMAC-SHA256 hex signature for a payload,
// using the exact scheme the handler verifies (`${timestamp}.${rawBody}`).
async function sign(payload: string, timestamp: number, secret: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const buf = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(`${timestamp}.${payload}`)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const SECRET = "whsec_test_secret";

describe("constantTimeEqual", () => {
  it("returns true for identical strings", () => {
    expect(constantTimeEqual("abc123", "abc123")).toBe(true);
  });
  it("returns false for same-length but different strings", () => {
    expect(constantTimeEqual("abc123", "abc124")).toBe(false);
  });
  it("returns false for different-length strings", () => {
    expect(constantTimeEqual("abc", "abcd")).toBe(false);
  });
});

describe("verifyStripeSignature", () => {
  const NOW_MS = 1_700_000_000_000; // fixed clock → deterministic
  const ts = Math.floor(NOW_MS / 1000);
  const body = JSON.stringify({ id: "evt_1", type: "checkout.session.completed" });

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW_MS);
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("accepts a valid, fresh signature", async () => {
    const header = `t=${ts},v1=${await sign(body, ts, SECRET)}`;
    expect(await verifyStripeSignature(body, header, SECRET)).toBe(true);
  });

  it("rejects a tampered body (replay/forgery protection)", async () => {
    const header = `t=${ts},v1=${await sign(body, ts, SECRET)}`;
    expect(await verifyStripeSignature(body + "X", header, SECRET)).toBe(false);
  });

  it("rejects a signature made with the wrong secret", async () => {
    const header = `t=${ts},v1=${await sign(body, ts, "whsec_wrong")}`;
    expect(await verifyStripeSignature(body, header, SECRET)).toBe(false);
  });

  it("rejects an expired timestamp (> 5 min tolerance)", async () => {
    const oldTs = ts - 6 * 60;
    const header = `t=${oldTs},v1=${await sign(body, oldTs, SECRET)}`;
    expect(await verifyStripeSignature(body, header, SECRET)).toBe(false);
  });

  it("rejects a missing signature header", async () => {
    expect(await verifyStripeSignature(body, null, SECRET)).toBe(false);
  });

  it("rejects a malformed signature header", async () => {
    expect(await verifyStripeSignature(body, "not-a-real-header", SECRET)).toBe(false);
  });

  it("rejects a non-numeric timestamp", async () => {
    const header = `t=abc,v1=${await sign(body, ts, SECRET)}`;
    expect(await verifyStripeSignature(body, header, SECRET)).toBe(false);
  });

  it("accepts when one of several v1 signatures matches (key rotation)", async () => {
    const good = await sign(body, ts, SECRET);
    const header = `t=${ts},v1=deadbeef,v1=${good}`;
    expect(await verifyStripeSignature(body, header, SECRET)).toBe(true);
  });
});
