// ────────────────────────────────────────────────────────────────
// WhatsApp — SINGLE SOURCE OF TRUTH for the business WhatsApp number.
//
// The number lives in ONE place: the VITE_WHATSAPP_NUMBER env var
// (see .env). Nothing reads a WhatsApp number/link from Supabase any
// more. Every WhatsApp button/link in the app builds its href from
// waLink() so the destination is guaranteed identical everywhere.
// ────────────────────────────────────────────────────────────────

// Fallback keeps links working even if the env var is ever missing.
const RAW_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? "971507703483";

// wa.me requires digits only — no "+", spaces, dashes or parentheses.
export const WHATSAPP_NUMBER = String(RAW_NUMBER).replace(/\D/g, "");

/**
 * Build a wa.me deep link to the business number, with an optional
 * page-specific prefilled message.
 *
 *   waLink()                         → https://wa.me/971507703483
 *   waLink("Hi! I'd like to book.")  → https://wa.me/971507703483?text=Hi!%20I'd...
 */
export function waLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message && message.trim()
    ? `${base}?text=${encodeURIComponent(message)}`
    : base;
}
