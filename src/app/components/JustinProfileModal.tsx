// JustinProfileModal.tsx

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function JustinProfileModal({
  open,
  onClose,
}: Props) {
  return (
    <AnimatePresence>

      {open && (
        <motion.div
          initial={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
          animate={{
            opacity: 1,
            backdropFilter: "blur(12px)",
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
          transition={{
            duration: 0.35,
          }}
          onClick={onClose}
          className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-6 overflow-y-auto"
        >

          {/* PANEL */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: 40,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-6xl rounded-[40px] overflow-hidden border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_20px_100px_rgba(0,0,0,0.45)]"
            style={{
              fontFamily: "Harabara, sans-serif",
            }}
          >

            {/* CLOSE */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full border border-white/10 bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition"
            >

              <X className="w-5 h-5 text-white" />

            </button>

            <div className="grid lg:grid-cols-2 min-h-[650px]">

              {/* LEFT */}
              <div className="relative overflow-hidden">

                <img
                  src="/Justin.webp"
                  alt="Justin"
                  className="w-full h-full object-cover hover:scale-105 transition duration-[2500ms]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-cyan-400/20 blur-[120px]" />

              </div>

              {/* RIGHT */}
              <div className="relative flex flex-col justify-center p-10 md:p-16">

                {/* LABEL */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-[11px] tracking-[4px] uppercase text-cyan-300 mb-5"
                >

                  DiveCampus Instructor Team

                </motion.p>

                {/* NAME */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-4xl md:text-6xl font-semibold tracking-[2px] leading-[1.1]"
                >

                  Justin Marais

                </motion.h2>

                {/* ROLE */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-cyan-300 text-[14px] tracking-[3px] uppercase mt-5"
                >

                  Master Scuba Diver Trainer

                </motion.p>

                {/* BIO */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-10 space-y-7 text-white/70 text-[15px] leading-[2.1] tracking-[0.45px]"
                >

                  <p>
                    Hailing from South Africa, Justin
                    brings global dive experience and
                    infectious, ocean-loving energy to
                    every underwater adventure.
                  </p>

                  <p>
                    After teaching in South Africa,
                    Cambodia, and Thailand, he now
                    shares his polite, witty, and
                    approachable style with aspiring
                    divers in the UAE.
                  </p>

                  <p>
                    Loved by both kids and adults,
                    Justin creates a fun, safe, and
                    supportive learning environment —
                    both on land and beneath the
                    surface.
                  </p>

                  <p>
                    His deep passion for teaching and
                    genuine love for the ocean make
                    every course with him both fun and
                    educational.
                  </p>

                </motion.div>

                {/* TAGS */}
                <div className="flex flex-wrap gap-3 mt-10">

                  <div className="px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-200 text-[11px] tracking-[2px]">
                    SOUTH AFRICA
                  </div>

                  <div className="px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-200 text-[11px] tracking-[2px]">
                    GLOBAL DIVE EXPERIENCE
                  </div>

                  <div className="px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-200 text-[11px] tracking-[2px]">
                    KIDS & ADULT TRAINING
                  </div>

                  <div className="px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-200 text-[11px] tracking-[2px]">
                    OCEAN EDUCATOR
                  </div>

                </div>

                {/* BUTTON */}
                <div className="mt-12">

                  <button className="px-8 py-4 rounded-2xl bg-cyan-400 text-black text-[12px] tracking-[2px] font-semibold hover:scale-[1.03] transition duration-300 shadow-[0_10px_40px_rgba(34,211,238,0.35)]">

                    CONNECT →

                  </button>

                </div>

              </div>

            </div>

          </motion.div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}