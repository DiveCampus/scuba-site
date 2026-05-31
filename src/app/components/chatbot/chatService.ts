// ────────────────────────────────────────────────────────────────
// Demo chat service  (UI-ONLY — NO REAL AI)
//
// This file is the ONLY place that knows how replies are produced.
// It returns canned, scripted responses so the UI looks alive without
// any backend, API key, database, or agent logic.
//
// ── HOW TO PLUG IN REAL AI LATER ────────────────────────────────
// 1. Create e.g. `aiChatService.ts` that also implements `ChatService`.
// 2. Inside its `send()`, call your endpoint:
//        const res = await fetch("/api/chat", { ... });
//        const data = await res.json();
//        return makeMessage("bot", data.reply);
// 3. In ChatWidget.tsx swap `demoChatService` for your new service.
// Nothing else in the UI has to change.
// ────────────────────────────────────────────────────────────────

import type { ChatMessage, ChatRole, ChatService, QuickAction } from "./types";

// Monotonic id generator. Date.now()/Math.random() are avoided so this
// stays deterministic and lint-friendly; uniqueness only needs to hold
// within a single session.
let seq = 0;
const nextId = () => `msg_${++seq}`;

export function makeMessage(role: ChatRole, text: string): ChatMessage {
  return { id: nextId(), role, text, timestamp: Date.now() };
}

const QUICK_ACTIONS: QuickAction[] = [
  { id: "courses", label: "Explore Courses" },
  { id: "try-dive", label: "Try Scuba Diving" },
  { id: "padi", label: "PADI Certification" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact Us" },
];

// Scripted replies. Keyed by quick-action id first, then loose keyword
// matching for free-typed input. Purely cosmetic placeholder copy.
const SCRIPTED: Record<string, string> = {
  courses:
    "We offer the full PADI path 🤿 — from Open Water beginners to Divemaster pros. Which level are you starting at?",
  "try-dive":
    "Try Scuba Diving is perfect for first-timers — no certification needed! You'll breathe underwater with an instructor by your side. Want me to share what's included?",
  padi:
    "Our PADI certifications are globally recognised 🌊. Open Water, Advanced, Rescue Diver and more. Which certification are you aiming for?",
  pricing:
    "I can help with pricing 😊 Which diving experience are you interested in?",
  contact:
    "You can reach our dive team any time — tap “Book Now” on the site, or share your question here and we'll point you the right way. 📞",
};

function matchKeyword(text: string): string {
  const t = text.toLowerCase();
  if (/(price|cost|rate|aed|how much|fee)/.test(t)) return SCRIPTED.pricing;
  if (/(padi|certif|licen|card)/.test(t)) return SCRIPTED.padi;
  if (/(try|first time|beginner|discover|intro)/.test(t)) return SCRIPTED["try-dive"];
  if (/(course|class|learn|train)/.test(t)) return SCRIPTED.courses;
  if (/(contact|call|whatsapp|email|reach|book)/.test(t)) return SCRIPTED.contact;
  return "Thanks for your message! 🌊 A member of our dive team will help you with that shortly. In the meantime, feel free to explore courses or pricing above.";
}

/** Demo implementation of the ChatService seam. */
export const demoChatService: ChatService = {
  greeting() {
    return [
      makeMessage(
        "bot",
        "👋 Welcome to UAE Dive Center!\nHow can I help you today?"
      ),
    ];
  },

  quickActions() {
    return QUICK_ACTIONS;
  },

  send(userText: string) {
    // A scripted action id maps directly; otherwise keyword-match.
    const reply = SCRIPTED[userText] ?? matchKeyword(userText);
    return Promise.resolve(makeMessage("bot", reply));
  },
};
