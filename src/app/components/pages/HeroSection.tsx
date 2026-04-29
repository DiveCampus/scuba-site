"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BookingModal } from "./BookingModal";

export function HeroSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        className="relative min-h-screen w-full overflow-hidden text-white"
        style={{ fontFamily: "Harabara, sans-serif" }} // ✅ FORCE FONT
      >

        {/* BACKGROUND */}
        <div className="absolute inset-0">
          <img
            src="/1.avif"
            className="w-full h-full object-cover scale-110 animate-[zoom_20s_linear_infinite]"
          />
          <div className="absolute inset-0 bg-[#02182b]/70" />
        </div>

        {/* GLOW EFFECTS */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">

          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden mb-6 px-5 py-2 text-xs tracking-widest border border-cyan-300/40 rounded-full text-cyan-200"
          >
            LEVEL 1 - PADI OPEN WATER

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent blur-md"
            />
          </motion.div>

          {/* HEADING */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl tracking-tight"
          >
            START YOUR{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              DIVING JOURNEY
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-white/70 max-w-2xl"
          >
            Learn the basics of scuba diving, gain confidence underwater, and become a certified diver with expert instructors.
          </motion.p>

          {/* PRICE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            <p className="text-sm text-white/50 line-through">
              AED 2,499
            </p>
            <p className="text-4xl font-bold">
              1,799 <span className="text-cyan-400 text-lg">AED</span>
            </p>
          </motion.div>

          {/* BUTTONS */}
          <div className="mt-8 flex gap-4 flex-wrap justify-center">

            {/* ENROLL */}
            <button
              onClick={() => setOpen(true)}
              className="px-8 py-3 bg-cyan-400 text-black font-semibold rounded-lg hover:scale-105 transition"
            >
              ENROLL NOW →
            </button>

            {/* WHATSAPP */}
            <button className="px-8 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition">
              BOOK VIA WHATSAPP
            </button>
          </div>

          {/* FEATURES */}
          <div className="mt-12 flex gap-8 text-white/60 text-xs flex-wrap justify-center">
            <span>✔ Beginner Friendly</span>
            <span>✔ Pool + Ocean Training</span>
            <span>✔ Certified Instructors</span>
            <span>✔ Global Certification</span>
          </div>
        </div>

        {/* SCROLL */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          ↓ Scroll
        </div>

        {/* KEYFRAME */}
        <style>
          {`
            @keyframes zoom {
              0% { transform: scale(1); }
              100% { transform: scale(1.15); }
            }
          `}
        </style>
      </section>

      {/* ================= MODAL ================= */}
      <BookingModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />

      {/* ✅ HARABARA FONT LOAD (LOCAL FIX) */}
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