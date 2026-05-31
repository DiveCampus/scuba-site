// ────────────────────────────────────────────────────────────────
// FloatingChatbot  (entry point — lightweight, always mounted)
//
// Renders only a tiny floating action button by default. The heavy
// chat panel (ChatWidget + framer-motion timelines) is code-split via
// React.lazy and is fetched ONLY after the first user interaction, so:
//   • no impact on first paint / LCP / Lighthouse
//   • no layout shift (FAB is position:fixed, out of document flow)
//   • no SEO impact (purely client-side, nothing crawlable affected)
//
// Mounting itself is deferred to browser idle time so it never competes
// with the initial render.
// ────────────────────────────────────────────────────────────────

import { lazy, Suspense, useEffect, useState } from "react";

import "./chatbot.css";

const ChatWidget = lazy(() => import("./ChatWidget"));

type ChatState = "closed" | "open" | "minimized";

// Dev-only logger — stripped from production builds (Vite dead-code elim).
const log = (msg: string) => {
  if (import.meta.env.DEV) console.log(`[CHATBOT] ${msg}`);
};

/**
 * Inline SVG AI/robot mark. Zero network cost, scales crisply, and
 * inherits `currentColor` so it matches the FAB theme. Lighter than
 * pulling another lucide icon into the bundle.
 */
function RobotIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* antenna */}
      <path d="M12 2.5v2.5" />
      <circle cx="12" cy="1.7" r="1.1" fill="currentColor" stroke="none" />
      {/* head */}
      <rect x="4" y="5" width="16" height="13" rx="3.5" />
      {/* side ears */}
      <path d="M2 10.5v2.5M22 10.5v2.5" />
      {/* eyes */}
      <circle cx="9" cy="11.4" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="15" cy="11.4" r="1.25" fill="currentColor" stroke="none" />
      {/* smile */}
      <path d="M9.4 14.4c.7.7 1.7 1 2.6 1s1.9-.3 2.6-1" />
    </svg>
  );
}

export default function FloatingChatbot() {
  // Defer first mount to idle time so the FAB never blocks initial paint.
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<ChatState>("closed");

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true));
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return null;

  const isOpen = state === "open";

  return (
    <div className="fixed bottom-4 right-4 z-[1000] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Panel — lazy-loaded, only rendered while open */}
      {isOpen && (
        <Suspense fallback={null}>
          <ChatWidget
            onClose={() => {
              log("Closed");
              setState("closed");
            }}
            onMinimize={() => setState("minimized")}
          />
        </Suspense>
      )}

      {/* Floating action button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => {
            log("Opened");
            setState("open");
          }}
          aria-label="Open AI chat assistant"
          className="
            group relative flex h-14 w-14 items-center justify-center rounded-full
            bg-gradient-to-br from-cyan-400 to-cyan-500 text-[#05263c] shadow-lg
            shadow-cyan-900/40 ring-1 ring-cyan-300/40 transition
            hover:scale-105 hover:shadow-cyan-700/50 active:scale-95
            motion-reduce:transition-none motion-reduce:hover:scale-100
          "
        >
          {/* Soft glowing pulse (GPU: transform/opacity only) */}
          <span
            aria-hidden="true"
            className="cb-glow absolute inset-0 rounded-full bg-cyan-400/40 blur-md motion-reduce:hidden"
          />
          {/* Orbiting accent dot — the subtle "AI" signal */}
          <span
            aria-hidden="true"
            className="cb-orbit pointer-events-none absolute -inset-1 motion-reduce:hidden"
          >
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-100 shadow-[0_0_8px_2px] shadow-cyan-300/70" />
          </span>
          {/* Robot mark with a gentle idle float */}
          <RobotIcon className="cb-float relative h-7 w-7" />
        </button>
      )}
    </div>
  );
}
