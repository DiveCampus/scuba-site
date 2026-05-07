"use client";

import { motion } from "framer-motion";
import { Navbar } from "../Navbar";

export function SpecialtyCourses() {
  return (
    <>
      <Navbar />

      <section className="relative min-h-screen w-full overflow-hidden font-habara text-white">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">

          <img
            src="/1.avif"
            alt="scuba"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-[#02182b]/60" />

        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">

          {/* TOP BADGE */}
          <div className="relative overflow-hidden mb-8 px-6 py-2.5 text-[11px] tracking-[3px] border border-cyan-300/40 rounded-full text-cyan-200 backdrop-blur-md">

            <span className="relative z-10">
              SPECIALTY COURSES
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
              className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent blur-md opacity-80"
            />

          </div>

          {/* SUB TEXT */}
          <p className="text-[11px] tracking-[4px] text-white/55 mb-5 uppercase">

            EXPAND YOUR SKILLS · MASTER NEW ADVENTURES

          </p>

          {/* MAIN HEADING */}
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.18] tracking-[1px] max-w-5xl">

            EXPLORE{" "}

            <span className="text-cyan-400">
              SPECIALIZED DIVING
            </span>

          </h1>

          {/* DESCRIPTION */}
          <p className="mt-7 text-white/72 max-w-2xl text-[15px] md:text-[16px] leading-[1.95] tracking-[0.5px]">

            Choose from a variety of specialty diving
            courses like night diving, wreck diving,
            underwater photography, and advanced
            deep diving experiences to elevate
            your underwater skills.

          </p>

          {/* PRICE CARD */}
          <div
            className="
    mt-14

    bg-white/10
    backdrop-blur-xl

    border
    border-white/20

    rounded-2xl

    px-12
    py-8

    shadow-xl
  "
          >
            {/* LABEL */}
            <p
              className="
      text-xs
      text-white/45
      mb-3
      tracking-[2px]
      uppercase
    "
            >
              Starting From
            </p>

            {/* PRICE */}
            <p
              className="
      text-5xl
      font-bold
      tracking-[1px]
      leading-none
    "
            >
              <span
                className="
        text-cyan-400
        text-lg
        tracking-[2px]
        font-medium
        mr-2
      "
              >
                AED
              </span>

              799
            </p>

            {/* SUBTEXT */}
            <p
              className="
      text-xs
      text-white/55
      mt-5
      tracking-[1px]
      leading-[1.8]
    "
            >
              Flexible Courses · International
              Certification
            </p>
          </div>
          {/* BUTTONS */}
          <div className="mt-11 flex gap-5 flex-wrap justify-center">

            {/* PRIMARY BUTTON */}
            <button className="px-9 py-3.5 bg-cyan-400 text-black font-semibold rounded-xl tracking-[1px] hover:scale-105 transition duration-300 shadow-lg">

              ENROLL NOW →

            </button>

            {/* SECONDARY BUTTON */}
            <button className="px-9 py-3.5 border border-white/25 rounded-xl text-white tracking-[1px] hover:bg-white/10 transition duration-300 backdrop-blur-md">

              BOOK VIA WHATSAPP

            </button>

          </div>

          {/* FEATURES */}
          <div className="mt-14 flex gap-10 text-white/55 text-[11px] tracking-[1.3px] flex-wrap justify-center">

            <span>✔ Night Diving</span>

            <span>✔ Wreck Diving</span>

            <span>✔ Underwater Photography</span>

            <span>✔ Deep Diving</span>

          </div>

        </div>
      </section>
    </>
  );
}