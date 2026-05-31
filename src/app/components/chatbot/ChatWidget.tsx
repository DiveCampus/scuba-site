// ────────────────────────────────────────────────────────────────
// ChatWidget  (UI ONLY — premium scuba/ocean themed chatbot shell)
//
// This is the heavy part of the chatbot (panel + animations) and is
// lazy-loaded by ./index.tsx so it has zero cost until first opened.
//
// It talks ONLY to a `ChatService` (see ./chatService.ts). There is no
// real AI here — replies are scripted demo content. Swap the service
// to integrate a real backend later; this file should not need edits.
// ────────────────────────────────────────────────────────────────

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Send, Waves, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { demoChatService } from "./chatService";
import type { ChatMessage, QuickAction } from "./types";

// Single seam: change this line to wire in real AI later.
const chat = demoChatService;

// Dev-only logger — stripped from production builds (Vite dead-code elim).
const log = (msg: string) => {
  if (import.meta.env.DEV) console.log(`[CHATBOT] ${msg}`);
};

function formatTime(ts: number): string {
  try {
    return new Date(ts).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-1" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-cyan-300/80"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

interface ChatWidgetProps {
  onClose: () => void;
  onMinimize: () => void;
}

export default function ChatWidget({ onClose, onMinimize }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => chat.greeting());
  const [quickActions] = useState<QuickAction[]>(() => chat.quickActions());
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep the latest message in view.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (typingTimer.current) clearTimeout(typingTimer.current);
    };
  }, []);

  // `displayText` is shown in the user bubble; `serviceText` is what the
  // ChatService receives (lets quick actions show a label but resolve by id).
  function pushUserMessage(displayText: string, serviceText?: string) {
    const shown = displayText.trim();
    if (!shown) return;

    log("User message");

    setMessages((prev) => [
      ...prev,
      { id: `u_${prev.length}_${shown.length}`, role: "user", text: shown, timestamp: Date.now() },
    ]);
    setShowQuickActions(false);
    setInput("");

    // Fake "thinking" delay so the typing indicator reads as natural.
    setIsTyping(true);
    typingTimer.current = setTimeout(async () => {
      log("Bot reply triggered");
      const reply = await chat.send(serviceText ?? shown);
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 850);
  }

  return (
    <motion.div
      role="dialog"
      aria-label="UAE Dive Center chat assistant"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className="
        flex h-[min(560px,75vh)] w-[min(380px,calc(100vw-2rem))] flex-col
        overflow-hidden rounded-2xl border border-cyan-400/20
        bg-[#05263c]/85 text-white shadow-2xl shadow-cyan-900/40 backdrop-blur-xl
      "
    >
      {/* Header */}
      <div className="relative flex items-center gap-3 border-b border-cyan-400/15 bg-gradient-to-r from-[#082544] to-[#05263c] px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/15 ring-1 ring-cyan-300/30">
          <Waves className="h-5 w-5 text-cyan-300" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold leading-tight">UAE Dive Center</p>
          <span className="flex items-center gap-1.5 text-[11px] text-cyan-200/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px] shadow-emerald-400" />
            Online · typically replies instantly
          </span>
        </div>
        <button
          type="button"
          onClick={onMinimize}
          aria-label="Minimize chat"
          className="rounded-lg p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-lg p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-[#05263c]/40 to-[#0a0e27]/60 px-4 py-4"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={
                m.role === "user"
                  ? "max-w-[82%] whitespace-pre-line rounded-2xl rounded-br-sm bg-cyan-400 px-3.5 py-2 text-[13.5px] leading-relaxed text-[#05263c] shadow-sm"
                  : "max-w-[82%] whitespace-pre-line rounded-2xl rounded-bl-sm border border-white/10 bg-white/10 px-3.5 py-2 text-[13.5px] leading-relaxed text-white shadow-sm"
              }
            >
              {m.text}
            </div>
            <span className="mt-1 px-1 text-[10px] text-white/40">{formatTime(m.timestamp)}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start">
            <div className="rounded-2xl rounded-bl-sm border border-white/10 bg-white/10 px-2 py-1.5">
              <TypingDots />
            </div>
          </div>
        )}

        {/* Quick action chips */}
        <AnimatePresence>
          {showQuickActions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap gap-2 pt-1"
            >
              {quickActions.map((qa) => (
                <button
                  key={qa.id}
                  type="button"
                  // Show the label in the bubble, but resolve the reply by action id.
                  onClick={() => {
                    log("Quick action");
                    pushUserMessage(qa.label, qa.id);
                  }}
                  className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-400/20"
                >
                  {qa.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          pushUserMessage(input);
        }}
        className="flex items-center gap-2 border-t border-cyan-400/15 bg-[#05263c]/80 px-3 py-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message…"
          aria-label="Message"
          className="
            flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13.5px]
            text-white placeholder:text-white/40 outline-none transition
            focus:border-cyan-300/50 focus:bg-white/10
          "
        />
        <button
          type="submit"
          aria-label="Send message"
          disabled={!input.trim()}
          className="
            flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400
            text-[#05263c] transition hover:bg-cyan-300 disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </motion.div>
  );
}
