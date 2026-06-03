// SnehaProfileModal.tsx

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SnehaProfileModal({
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
                  src="/Sneha.webp"
                  alt="Sneha"
                  className="w-full h-full object-cover hover:scale-105 transition duration-[2500ms]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-cyan-400/20 blur-[120px]" />

              </div>

              {/* RIGHT */}
              <div className="relative flex flex-col justify-center p-10 md:p-16">

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-[11px] tracking-[4px] uppercase text-cyan-300 mb-5"
                >

                  DiveCampus Leadership

                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-4xl md:text-6xl font-semibold tracking-[2px] leading-[1.1]"
                >

                  Sneha Shetty

                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-cyan-300 text-[14px] tracking-[3px] uppercase mt-5"
                >

                  Co-founder, MD & PADI Course Director

                </motion.p>

                {/* BIO */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-10 space-y-7 text-white/70 text-[15px] leading-[1.7] tracking-[0.45px]"
                >

                  <p>
                    From a non-swimmer to a PADI Course Director,
                    Freediver Instructor, Tec Instructor,
                    PADI Swim School Program Director and the
                    1st Indian Woman to dive 100m depth.
                  </p>

                  <p>
                    Sneha loves to instill her passion for the
                    ocean into people who have gone most of
                    their life without knowing how to swim.
                  </p>

                  <p>
                    She is known for her systematic &
                    conservation-focused teaching style and has
                    trained many individuals with severe water
                    phobia into passionate divers.
                  </p>

                  <p>
                    With a decade of leading Marketing for top
                    brands, Sneha is now the MD at DiveCampus
                    and the creative brains behind the unique &
                    aesthetically-rich facilities.
                  </p>

                </motion.div>

                {/* TAGS */}
                <div className="flex flex-wrap gap-3 mt-10">

                  <div className="px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-200 text-[11px] tracking-[2px]">
                    100M DEPTH
                  </div>

                  <div className="px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-200 text-[11px] tracking-[2px]">
                    PADI COURSE DIRECTOR
                  </div>

                  <div className="px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-200 text-[11px] tracking-[2px]">
                    TEC INSTRUCTOR
                  </div>

                  <div className="px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-200 text-[11px] tracking-[2px]">
                    FREEDIVER INSTRUCTOR
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