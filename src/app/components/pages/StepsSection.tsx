"use client";

import {
  Monitor,
  Waves,
  CheckCircle,
  Globe,
} from "lucide-react";

import { motion } from "framer-motion";

export function StepsSection() {
  const steps = [
    {
      icon: <Monitor className="w-6 h-6" />,

      title: "Step 1: PADI e-Learning",

      desc:
        "Bypass the classroom. Execute the PADI coursework instantly on your mobile device at your designated pace within 1 Year.",
    },

    {
      icon: <Waves className="w-6 h-6" />,

      title: "Step 2: Confined Water",

      desc:
        "Master the mechanics at our Palm Jumeirah facility. Utilize our private shore access for rapid water entry and immediate skill application.",
    },

    {
      icon: <CheckCircle className="w-6 h-6" />,

      title: "Step 3: Certification",

      desc:
        "Validate your skills in the ocean to secure your PADI Global License. This credential is recognized universally. Valid Worldwide.",
    },

    {
      icon: <Globe className="w-6 h-6" />,

      title: "Step 4: Global Access",

      desc:
        "Elevate your final dives with our Fujairah Upgrade. Post-certification, unlock members-only access to our private international dive expeditions.",

      highlight: true,
    },
  ];

  return (
    <>
      <section className="py-28 bg-[#f3f6f9]">

        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto px-6 mb-20">

          {/* TITLE */}
          <h2
            className="
    flex
    flex-col
    items-center

    text-4xl
    md:text-7xl

    font-bold

    text-[#0a0e27]

    leading-[1.05]
    tracking-[1px]
  "
            style={{
              fontFamily:
                "Harabara, sans-serif",
            }}
          >
            <span className="block">
              Get Certified
            </span>

            <span
              className="
      text-cyan-500
      block

      mt-3
      md:mt-5
    "
            >
              IN JUST 3-4 DAYS.
            </span>
          </h2>
          {/* DESC */}
          <p
            className="
              text-gray-500
              mt-4
            "
            style={{
              fontFamily:
                "Inter, sans-serif",
            }}
          >
            Understand the exact sequence of your
            training. We have engineered a
            streamlined progression from
            theoretical coursework to your final
            ocean dive.
          </p>
        </div>

        {/* STEPS */}
        <div
          className="
            relative
            max-w-7xl
            mx-auto
            px-6

            grid
            md:grid-cols-4
            gap-6
          "
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative"
            >
              {/* ARROW */}
              {i !== 0 && (
                <div
                  className="
                    hidden
                    md:block

                    absolute
                    -left-4
                    top-1/2

                    -translate-y-1/2

                    text-cyan-400
                    text-xl
                  "
                >
                  →
                </div>
              )}

              {/* CARD */}
              <motion.div
                whileHover={{
                  y: -5,
                }}
                className={`
                  p-6
                  rounded-2xl
                  border
                  transition
                  shadow-sm

                  ${step.highlight
                    ? "bg-[#fffdf7] border-yellow-300 shadow-md"
                    : "bg-white border-gray-200"
                  }
                `}
              >
                {/* BADGE */}
                {step.highlight && (
                  <div
                    className="
                      absolute
                      top-3
                      right-3

                      text-[10px]

                      px-3
                      py-1

                      bg-cyan-500
                      text-white

                      rounded-full
                    "
                    style={{
                      fontFamily:
                        "Inter, sans-serif",
                    }}
                  >
                    EXCLUSIVE ACCESS
                  </div>
                )}

                {/* ICON */}
                <div className="text-cyan-500 mb-4">
                  {step.icon}
                </div>

                {/* TITLE */}
                <h3
                  className="
                    font-semibold
                    text-[#0a0e27]
                    mb-2
                  "
                  style={{
                    fontFamily:
                      "Harabara, sans-serif",
                  }}
                >
                  {step.title}
                </h3>

                {/* DESC */}
                <p
                  className="
                    text-sm
                    text-gray-500
                    leading-relaxed
                  "
                  style={{
                    fontFamily:
                      "Inter, sans-serif",
                  }}
                >
                  {step.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* HARABARA FONT */}
      <style jsx global>{`
        @font-face {
          font-family: "Harabara";

          src: url("/fonts/Harabara.woff")
            format("woff");

          font-weight: normal;

          font-style: normal;
        }
      `}</style>
    </>
  );
}