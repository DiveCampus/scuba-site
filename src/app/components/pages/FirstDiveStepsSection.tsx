"use client";

import { motion } from "framer-motion";
import {
  Settings2,
  Waves,
  LifeBuoy,
} from "lucide-react";

export function FirstDiveStepsSection() {
  const steps = [
    {
      step: "STEP 01",
      icon: <Settings2 className="w-5 h-5" />,
      title: "BRIEFING & GEAR UP",
      desc: "Learn the basic hand signals and safety rules on land. We'll help you get suited up in premium, sanitized gear.",
    },
    {
      step: "STEP 02",
      icon: <Waves className="w-5 h-5" />,
      title: "SHALLOW WATER PRACTICE",
      desc: "Start in shallow water where you can stand. You'll practice breathing underwater until you feel 100% comfortable.",
    },
    {
      step: "STEP 03",
      icon: <LifeBuoy className="w-5 h-5" />,
      title: "THE OCEAN DIVE",
      desc: "Once you're ready, we gently swim out to the reef. Enjoy a 45-minute guided tour surrounded by colorful marine life.",
    },
  ];

  return (
    <section
      className="relative py-16 md:py-20 bg-[#f4f7fa] overflow-hidden"
      style={{
        fontFamily: "Harabara, sans-serif",
      }}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,194,255,0.04),transparent_45%)]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">

          {/* SMALL LABEL */}
          <p
            className="
              text-[8px]
              md:text-[9px]

              uppercase

              tracking-[4px]

              text-cyan-500/90

              mb-4
            "
          >
            HOW IT WORKS
          </p>

          {/* TITLE */}
          <h2
            className="
              text-[26px]
              md:text-[44px]

              text-[#0b1b2b]

              font-semibold

              tracking-[1px]
              md:tracking-[2px]

              leading-[1.1]

              uppercase
            "
          >
            3 STEPS TO YOUR FIRST DIVE
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-4

              text-[11px]
              md:text-[13px]

              text-[#7b8794]

              leading-[1.7]

              tracking-[0.3px]

              max-w-xl
              mx-auto
            "
          >
            Safe, easy, and designed for complete beginners.
            No prior experience needed.
          </p>
        </div>

        {/* CARDS */}
        <div
          className="
            mt-12

            grid
            grid-cols-1
            md:grid-cols-3

            gap-5
            lg:gap-6
          "
        >
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
              }}
              whileHover={{
                y: -6,
              }}
              className="
                relative

                rounded-[24px]

                bg-white

                border
                border-[#edf1f5]

                shadow-[0_10px_30px_rgba(15,23,42,0.04)]

                px-6
                md:px-7

                py-8
                md:py-10

                text-center

                overflow-hidden

                group
              "
            >
              {/* HOVER GLOW */}
              <div
                className="
                  absolute
                  inset-0

                  opacity-0
                  group-hover:opacity-100

                  transition
                  duration-700

                  bg-[radial-gradient(circle_at_top,rgba(0,194,255,0.05),transparent_60%)]
                "
              />

              {/* STEP BADGE */}
              <div
                className="
                  relative
                  z-10

                  inline-flex
                  items-center
                  justify-center

                  px-3
                  py-1.5

                  rounded-full

                  bg-[#f4f7fa]

                  text-[#687280]

                  text-[8px]

                  tracking-[2px]

                  uppercase

                  mb-6
                "
              >
                {item.step}
              </div>

              {/* ICON */}
              <div
                className="
                  relative
                  z-10

                  mx-auto

                  w-14
                  h-14

                  rounded-full

                  bg-cyan-50

                  flex
                  items-center
                  justify-center

                  text-cyan-500

                  mb-6

                  group-hover:scale-105

                  transition
                  duration-500
                "
              >
                {item.icon}
              </div>

              {/* TITLE */}
              <h3
                className="
                  relative
                  z-10

                  text-[15px]
                  md:text-[17px]

                  text-[#0b1b2b]

                  font-semibold

                  tracking-[1px]

                  leading-[1.5]

                  uppercase

                  mb-3
                "
              >
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p
                className="
                  relative
                  z-10

                  text-[11px]
                  md:text-[12px]

                  text-[#7b8794]

                  leading-[1.8]

                  tracking-[0.3px]

                  max-w-[240px]
                  mx-auto
                "
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}