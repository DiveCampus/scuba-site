"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function IslamProfileModal({
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
          className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center p-6 overflow-y-auto"
        >

          {/* PANEL */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
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

              {/* LEFT IMAGE */}
              <motion.div
                initial={{
                  scale: 1.08,
                }}
                animate={{
                  scale: 1,
                }}
                transition={{
                  duration: 1,
                }}
                className="relative overflow-hidden"
              >

                <img
                  src="/Islam.webp"
                  alt="Islam Etman"
                  className="w-full h-full object-cover hover:scale-105 transition duration-[2500ms]"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* GLOW */}
                <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-cyan-400/20 blur-[120px]" />

              </motion.div>

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
                  Islam Etman
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-cyan-300 text-[14px] tracking-[3px] uppercase mt-5"
                >
                  founder & CEO
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-10 space-y-7 text-white/70 text-[15px] leading-[2.1] tracking-[0.45px]"
                >

                  <p>
                    Known for his witty sense of humour,
                    Islam comes with over 30 years of
                    diving experience.
                  </p>

                  <p>
                    Apart from his extensive accolades
                    in the diving world of being a Tec
                    Trimix Instructor, IDC Staff Instructor
                    and Master Free diver.
                  </p>

                  <p>
                    With over 2 decades of experience in
                    building brands and spearheading
                    business transformations.
                  </p>

                </motion.div>

                {/* TAGS */}
                <div className="flex flex-wrap gap-3 mt-10">

                  {[
                    "30+ YEARS EXPERIENCE",
                    "TEC TRIMIX",
                    "IDC STAFF",
                    "MASTER FREEDIVER",
                  ].map((tag, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-200 text-[11px] tracking-[2px]"
                    >
                      {tag}
                    </div>
                  ))}

                </div>

                {/* BUTTON */}
                <div className="mt-12">

                  <button className="px-8 py-4 rounded-2xl bg-cyan-400 text-black text-[12px] tracking-[2px] font-semibold hover:scale-[1.03] transition duration-300 shadow-[0_10px_40px_rgba(34,211,238,0.35)]">
                    CONNECT WITH ISLAM →
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