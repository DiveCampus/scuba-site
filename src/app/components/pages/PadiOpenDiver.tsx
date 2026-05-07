"use client";

import { motion } from "framer-motion";
import { Navbar } from "../Navbar";

export function PadiOpenDiver() {


  return (
    <><>
      <Navbar />
    </><section className="relative min-h-screen w-full overflow-hidden font-habara">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <img
            src="/1.avif"
            alt="scuba"
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#02182b]/60" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">

          {/* TOP BADGE */}
          <div className="relative overflow-hidden mb-6 px-5 py-2 text-xs tracking-widest border border-cyan-300/40 rounded-full text-cyan-200">
            <span className="relative z-10">
              LEVEL 1 - PADI OPEN DIVER
            </span>

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
              className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent blur-md opacity-80" />
          </div>

          {/* SUB TEXT */}
          <p className="text-xs tracking-[3px] text-white/60 mb-4">
            BEGINNER LEVEL | START FROM ZERO
          </p>

          {/* MAIN HEADING */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
            DISCOVER THE{" "}
            <span className="text-cyan-400">UNDERWATER WORLD</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-4 text-white/70 max-w-2xl">
            Take your first step into scuba diving. Learn essential skills and
            experience the ocean like never before with expert guidance.
          </p>

          {/* PRICE CARD */}
          <div
            className="
    mt-8

    bg-white/10
    backdrop-blur-lg

    border
    border-white/20

    rounded-xl

    px-8
    py-6

    shadow-xl
  "
          >
            <p
              className="
      text-sm
      text-white/50
      line-through
      mb-1
    "
            >
              AED 2,199
            </p>

            <p className="text-4xl font-bold">
              <span
                className="
        text-cyan-400
        text-lg
        mr-2
      "
              >
                AED
              </span>

              1,599
            </p>

            <p
              className="
      text-xs
      text-white/60
      mt-2
    "
            >
              Includes Basic Training +
              Certification
            </p>
          </div>
          {/* BUTTONS */}
          <div className="mt-8 flex gap-4 flex-wrap justify-center">
            <button className="px-8 py-3 bg-cyan-400 text-black font-semibold rounded-lg hover:scale-105 transition duration-300">
              ENROLL NOW →
            </button>

            <button className="px-8 py-3 border border-white/30 rounded-lg text-white hover:bg-white/10 transition duration-300">
              BOOK VIA WHATSAPP
            </button>
          </div>

          {/* FEATURES */}
          <div className="mt-12 flex gap-10 text-white/60 text-xs flex-wrap justify-center">
            <span>✔ No Experience Needed</span>
            <span>✔ Pool Training Included</span>
            <span>✔ Certified Instructors</span>
            <span>✔ Safe & Guided Learning</span>
          </div>
        </div>
      </section></>
  );
}