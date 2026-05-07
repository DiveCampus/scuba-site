"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

export function DiveConfidenceFAQ() {
  const [active, setActive] = useState(0);

  const faqs = [
    {
      q: "What if I run out of air?",
      a: "We eliminate this risk completely. Your instructor acts as your personal safety monitor, checking your air levels every few minutes. You don't need to worry about the numbers; just breathe and enjoy the underwater world.",
    },
    {
      q: "Will my ears hurt?",
      a: "Not at all. Your instructor teaches simple equalization techniques before descending slowly and comfortably.",
    },
    {
      q: "Do I need to be a strong swimmer?",
      a: "No professional swimming skills are required. You only need basic comfort in water and confidence to float.",
    },
    {
      q: "Can I wear contact lenses?",
      a: "Yes. Most divers comfortably wear soft contact lenses during scuba sessions without issues.",
    },
    {
      q: "What is the minimum age?",
      a: "Kids from 10 years old can start diving programs under instructor supervision.",
    },
    {
      q: "Can I get a female instructor?",
      a: "Absolutely. Female instructors are available upon request for a more comfortable experience.",
    },
    {
      q: "Are photos included?",
      a: "Yes. Underwater photos and videos are included in selected packages.",
    },
  ];

  return (
    <>
      <section
        className="py-28 bg-[#f7f9fc]"
        style={{ fontFamily: "Harabara, sans-serif" }}
      >

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 px-6">

          {/* LEFT SIDE */}
          <div className="max-w-md">

            {/* TITLE */}
            <h2 className="text-4xl md:text-5xl leading-[1.05] tracking-[-1px] font-semibold text-[#0a0e27]">

              Dive with <br />

              <span className="text-cyan-500">
                Absolute Confidence.
              </span>

            </h2>

            {/* DESC */}
            <p className="mt-7 text-[15px] leading-[1.9] text-[#7b8794]">
              Safety is our absolute priority. Every session is led by our
              PADI Licensed Instructors to ensure you are comfortable,
              supported, and secure from your first breath to your final ascent.
            </p>

            {/* REVIEWS */}
            <div className="mt-10 space-y-4">

              {/* GOOGLE */}
              <div className="w-fit flex items-center gap-4 px-5 py-3 rounded-full border border-[#d7e1ea] bg-white shadow-sm">

                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                  className="w-12 object-contain"
                />

                <div>
                  <p className="text-sm font-semibold text-[#0a0e27]">
                    4.9 ★★★★★
                  </p>

                  <p className="text-[10px] tracking-[1px] text-cyan-500">
                    1,054+ REVIEWS
                  </p>
                </div>

              </div>

              {/* TRUSTPILOT */}
              <div className="w-fit flex items-center gap-4 px-5 py-3 rounded-full border border-[#d7e1ea] bg-white shadow-sm">

                <div className="w-3 h-3 rounded-full bg-green-500" />

                <div>
                  <p className="text-sm font-semibold text-[#0a0e27]">
                    5.0 ★★★★★
                  </p>

                  <p className="text-[10px] tracking-[1px] text-cyan-500">
                    654 REVIEWS
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT FAQ */}
          <div className="space-y-4">

            {faqs.map((item, i) => {
              const isOpen = active === i;

              return (
                <motion.div
                  key={i}
                  layout
                  className={`rounded-2xl border transition overflow-hidden
                  ${
                    isOpen
                      ? "border-cyan-400 bg-white shadow-md"
                      : "border-[#d9e2ec] bg-white"
                  }`}
                >

                  {/* HEADER */}
                  <button
                    onClick={() => setActive(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >

                    <h3 className="text-[15px] text-[#243447] font-medium tracking-[-0.2px]">
                      {item.q}
                    </h3>

                    <div className="text-cyan-500">

                      {isOpen ? (
                        <X size={16} />
                      ) : (
                        <Plus size={16} />
                      )}

                    </div>

                  </button>

                  {/* CONTENT */}
                  <AnimatePresence>

                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >

                        <div className="px-6 pb-6">

                          <p className="text-[14px] leading-[1.9] text-[#7b8794] max-w-xl">
                            {item.a}
                          </p>

                        </div>

                      </motion.div>
                    )}

                  </AnimatePresence>

                </motion.div>
              );
            })}

          </div>

        </div>

      </section>

      {/* FONT */}
      <style jsx global>{`
        @font-face {
          font-family: 'Harabara';
          src: url('/fonts/Harabara.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }
      `}</style>
    </>
  );
}