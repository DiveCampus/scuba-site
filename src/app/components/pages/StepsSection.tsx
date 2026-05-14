"use client";

import {
  Monitor,
  Waves,
  CheckCircle,
  Globe,
} from "lucide-react";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import { getSteps } from "@/services/stepsService";

export function StepsSection() {
  const [section, setSection] =
    useState<any>(null);

  const [steps, setSteps] =
    useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const {
        section,
        list,
      } = await getSteps();

      setSection(section);

      setSteps(list || []);
    };

    load();
  }, []);

  const icons = [
    <Monitor className="w-6 h-6" />,
    <Waves className="w-6 h-6" />,
    <CheckCircle className="w-6 h-6" />,
    <Globe className="w-6 h-6" />,
  ];

  if (!section) return null;

  return (
    <>
      <section className="py-28 bg-[#f3f6f9]">

        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto px-6 mb-20">

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
            <span>
              {section.title}
            </span>

            <span
              className="
                text-cyan-500
                mt-3
                md:mt-5
              "
            >
              {
                section.highlight
              }
            </span>
          </h2>

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
            {
              section.subtitle
            }
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
          {steps.map(
            (step, i) => (
              <div
                key={step.id}
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

                    ${
                      step.highlight
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
                    >
                      {step.tag}
                    </div>
                  )}

                  {/* ICON */}
                  <div className="text-cyan-500 mb-4">
                    {
                      icons[
                        i
                      ]
                    }
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
                    {
                      step.description
                    }
                  </p>
                </motion.div>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}