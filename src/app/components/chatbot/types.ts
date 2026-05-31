// ────────────────────────────────────────────────────────────────
// Chatbot shared types
//
// UI ONLY for now. These types describe the contract the UI speaks.
// When real AI is wired in later, the backend just has to satisfy
// the `ChatService` interface (see ./chatService.ts) — the UI does
// not need to change.
// ────────────────────────────────────────────────────────────────

export type ChatRole = "bot" | "user";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  /** Plain text content. Markdown/rich content can be layered in later. */
  text: string;
  /** Epoch ms. Used only for timestamp display. */
  timestamp: number;
}

export interface QuickAction {
  /** Stable key — also used as the lookup key for demo replies. */
  id: string;
  label: string;
}

/**
 * The single seam the future AI integration plugs into.
 *
 * Today this is implemented by a local demo (canned replies).
 * Tomorrow swap in an implementation that calls your API / agent /
 * RAG pipeline. The UI is intentionally agnostic to which one is used.
 */
export interface ChatService {
  /** First message(s) shown when the panel opens. */
  greeting(): ChatMessage[];
  /** Quick-reply chips shown under the greeting. */
  quickActions(): QuickAction[];
  /**
   * Produce a bot reply to a user message.
   * Returns a promise so a real network/AI call slots in unchanged.
   */
  send(userText: string): Promise<ChatMessage>;
}
