"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

export function ExpertHands() {
  const features = [
    "MAX 3 STUDENTS PER INSTRUCTOR",
    "PRIVATE INSTRUCTORS ON REQUEST",
    "FREE PHOTOS & VIDEOS",
    "PREMIUM GEARS",
  ];

  return (
    <>
      <section
        className="py-24 bg-[#f5f8fb]"
        style={{ fontFamily: "Harabara, sans-serif" }}
      >

        {/* CONTAINER */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-14 items-center px-6">

          {/* IMAGE SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-fit"
          >

            {/* CORNER ACCENT */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-l-[3px] border-t-[3px] border-cyan-400 rounded-tl-sm" />

            {/* IMAGE */}
            <div className="w-[320px] h-[205px] rounded-md overflow-hidden shadow-lg">

              <img
                src="/1.avif"
                alt="Diver"
                className="w-full h-full object-cover"
              />

            </div>

          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >

            {/* BADGE */}
            <p className="text-[10px] tracking-[3px] uppercase text-cyan-500 mb-4">
              THE NEMO STANDARD
            </p>

            {/* TITLE */}
            <h2 className="text-[42px] leading-[1.05] tracking-[-1px] font-semibold text-[#0b1623]">

              EXPERT HANDS. ALWAYS.

            </h2>

            {/* DESC */}
            <p className="mt-6 text-[14px] leading-[1.9] text-[#7a8795] max-w-md">
              Your safety is our Priority. We maintain a strict maximum ratio
              of 3 students per instructor, ensuring you never feel lost in a crowd.
            </p>

            <p className="mt-6 text-[14px] leading-[1.9] text-[#7a8795] max-w-md">
              Want exclusive focus? You can upgrade to a dedicated 1-on-1
              Private Instructor during booking for total privacy and personalized attention.
            </p>

            {/* FEATURES */}
            <div className="mt-10 grid grid-cols-2 gap-y-6 gap-x-8">

              {features.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3"
                >

                  {/* ICON */}
                  <div className="w-5 h-5 rounded-full border border-cyan-400 flex items-center justify-center shrink-0 mt-[2px]">

                    <Check
                      size={10}
                      className="text-cyan-500"
                    />

                  </div>

                  {/* TEXT */}
                  <p className="text-[11px] tracking-[1px] leading-[1.6] font-semibold text-[#1b2735]">
                    {item}
                  </p>

                </div>
              ))}

            </div>

          </motion.div>

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