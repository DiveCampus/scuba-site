// Stripe webhook handler.
//
// Verifies the Stripe-Signature header with the project webhook secret using
// Web Crypto (no external SDK), dedups events via stripe_webhook_events.id
// (PK), and persists outcomes into the bookings table via service_role.
//
// Required env vars (set with: `supabase secrets set --env-file ...`):
//   STRIPE_WEBHOOK_SECRET       whsec_... from `stripe listen` or dashboard
//   SUPABASE_URL                injected by platform
//   SUPABASE_SERVICE_ROLE_KEY   injected by platform

import { serve } from "std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// 5-minute replay tolerance, same as Stripe SDK default.
const TIMESTAMP_TOLERANCE_SECONDS = 5 * 60;

// -----------------------------------------------------------------------------
// Signature verification (Web Crypto, no external SDK)
// -----------------------------------------------------------------------------

async function verifyStripeSignature(
  rawBody: string,
  sigHeader: string | null,
  secret: string
): Promise<boolean> {
  if (!sigHeader) return false;

  const parsed: Record<string, string[]> = {};
  for (const part of sigHeader.split(",")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    (parsed[k] ??= []).push(v);
  }

  const timestamp = parsed["t"]?.[0];
  const signatures = parsed["v1"] ?? [];
  if (!timestamp || signatures.length === 0) return false;

  // Replay protection
  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) return false;
  const ageSeconds = Math.abs(Date.now() / 1000 - ts);
  if (ageSeconds > TIMESTAMP_TOLERANCE_SECONDS) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`${timestamp}.${rawBody}`)
  );
  const expected = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Stripe may send multiple v1 signatures during secret rotation. Match any.
  return signatures.some((sig) => constantTimeEqual(sig, expected));
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

// -----------------------------------------------------------------------------
// Handlers (idempotent)
// -----------------------------------------------------------------------------

// deno-lint-ignore no-explicit-any
type SupabaseClient = ReturnType<typeof createClient>;

async function handleCheckoutCompleted(
  supabase: SupabaseClient,
  // deno-lint-ignore no-explicit-any
  session: any
) {
  const bookingId: string | undefined = session.metadata?.booking_id;
  const sessionId: string = session.id;
  const paymentIntentId: string | null = session.payment_intent ?? null;
  const courseSlug: string = session.metadata?.course_slug ?? "unknown";
  const courseTitle: string | null =
    session.metadata?.course_title ?? null;
  const amountTotal: number | null = session.amount_total ?? null;
  const currency: string = (session.currency ?? "aed").toLowerCase();
  const customerDetails = session.customer_details ?? {};

  const updates = {
    payment_status: "paid",
    booking_status: "confirmed",
    stripe_session_id: sessionId,
    stripe_payment_intent_id: paymentIntentId,
    amount_total: amountTotal,
    currency,
    customer_email: customerDetails.email ?? null,
    customer_name: customerDetails.name ?? null,
    customer_phone: customerDetails.phone ?? null,
    paid_at: new Date().toISOString(),
  };

  if (bookingId) {
    const { error } = await supabase
      .from("bookings")
      .update(updates)
      .eq("id", bookingId);
    if (error) throw error;
    return;
  }

  // No pre-created row (DB was down at checkout time, or session created
  // outside our flow). Upsert by stripe_session_id — UNIQUE constraint keeps
  // it idempotent on retries.
  const { error } = await supabase
    .from("bookings")
    .upsert(
      {
        course_slug: courseSlug,
        course_title: courseTitle,
        ...updates,
      },
      { onConflict: "stripe_session_id" }
    );
  if (error) throw error;
}

async function handlePaymentIntentSucceeded(
  supabase: SupabaseClient,
  // deno-lint-ignore no-explicit-any
  pi: any
) {
  // Defense-in-depth: checkout.session.completed should already have moved
  // the row to 'paid'. If for any reason it didn't, this catches it. We only
  // touch rows we already know about (matched by payment_intent or booking_id).
  const bookingId: string | undefined = pi.metadata?.booking_id;

  const updates = {
    payment_status: "paid",
    booking_status: "confirmed",
    stripe_payment_intent_id: pi.id,
    paid_at: new Date().toISOString(),
  };

  if (bookingId) {
    const { error } = await supabase
      .from("bookings")
      .update(updates)
      .eq("id", bookingId)
      .neq("payment_status", "paid");
    if (error) throw error;
    return;
  }

  // Match by payment_intent if we already stamped one (after checkout.session.completed)
  const { error } = await supabase
    .from("bookings")
    .update(updates)
    .eq("stripe_payment_intent_id", pi.id)
    .neq("payment_status", "paid");
  if (error) throw error;
}

async function handlePaymentIntentFailed(
  supabase: SupabaseClient,
  // deno-lint-ignore no-explicit-any
  pi: any
) {
  const bookingId: string | undefined = pi.metadata?.booking_id;
  const failureReason: string =
    pi.last_payment_error?.message ??
    pi.last_payment_error?.code ??
    "Payment failed";

  const updates = {
    payment_status: "failed",
    failure_reason: failureReason,
    stripe_payment_intent_id: pi.id,
  };

  if (bookingId) {
    const { error } = await supabase
      .from("bookings")
      .update(updates)
      .eq("id", bookingId);
    if (error) throw error;
    return;
  }

  // No metadata — try by payment_intent (in case checkout.session.completed
  // already stamped it).
  const { error } = await supabase
    .from("bookings")
    .update(updates)
    .eq("stripe_payment_intent_id", pi.id);
  if (error) throw error;
}

async function handleCheckoutExpired(
  supabase: SupabaseClient,
  // deno-lint-ignore no-explicit-any
  session: any
) {
  const bookingId: string | undefined = session.metadata?.booking_id;
  if (!bookingId) return; // Nothing to expire if we never pre-created a row.

  const { error } = await supabase
    .from("bookings")
    .update({ payment_status: "expired" })
    .eq("id", bookingId)
    .eq("payment_status", "pending"); // never demote a paid booking
  if (error) throw error;
}

// -----------------------------------------------------------------------------
// HTTP entry point
// -----------------------------------------------------------------------------

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!webhookSecret || !supabaseUrl || !serviceKey) {
    console.error("[stripe-webhook] missing required env vars");
    return new Response("Server misconfigured", { status: 500 });
  }

  const sigHeader = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  const valid = await verifyStripeSignature(rawBody, sigHeader, webhookSecret);
  if (!valid) {
    return new Response("Invalid signature", { status: 400 });
  }

  // deno-lint-ignore no-explicit-any
  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response("Invalid payload", { status: 400 });
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Idempotency gate. Insert the event id; PK conflict means we already
  // processed it on a prior retry and we should return 200 fast.
  const dedup = await supabase
    .from("stripe_webhook_events")
    .insert({ id: event.id, type: event.type, payload: event });

  if (dedup.error) {
    // 23505 = unique_violation
    // deno-lint-ignore no-explicit-any
    const code = (dedup.error as any).code;
    if (code === "23505") {
      return new Response("Already processed", { status: 200 });
    }
    console.error("[stripe-webhook] dedup insert error:", dedup.error.message);
    // Returning non-2xx will make Stripe retry, giving us another shot at
    // the DB later.
    return new Response("Persistence error", { status: 500 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(supabase, event.data.object);
        break;
      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(supabase, event.data.object);
        break;
      case "payment_intent.payment_failed":
        await handlePaymentIntentFailed(supabase, event.data.object);
        break;
      case "checkout.session.expired":
        await handleCheckoutExpired(supabase, event.data.object);
        break;
      default:
        // Unhandled event types are logged in stripe_webhook_events and
        // acknowledged with 200 to stop Stripe retrying.
        break;
    }
    return new Response("ok", { status: 200 });
  } catch (err) {
    console.error(
      `[stripe-webhook] handler "${event.type}" failed:`,
      err instanceof Error ? err.message : err
    );
    // Returning 500 makes Stripe retry. Note: the dedup row IS already
    // present, so the retry will short-circuit. To allow retry-on-failure
    // we delete the dedup row here.
    await supabase.from("stripe_webhook_events").delete().eq("id", event.id);
    return new Response("Handler error", { status: 500 });
  }
});
