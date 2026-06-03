"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Clock,
  Users,
  ShieldCheck,
  Award,
} from "lucide-react";

import { getWhyChoose } from "@/services/whyChooseService";

const iconMap: any = {
  Clock: (
    <Clock className="w-5 h-5" />
  ),

  Users: (
    <Users className="w-5 h-5" />
  ),

  ShieldCheck: (
    <ShieldCheck className="w-5 h-5" />
  ),

  Award: (
    <Award className="w-5 h-5" />
  ),
};

export function WhyChooseDiveCampusSection() {
  const [section, setSection] =
    useState<any>(null);

  const [features, setFeatures] =
    useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { section, features } = await getWhyChoose();

      setSection(section);

      setFeatures(features || []);
    };

    load();
  }, []);

  if (!section) return null;

  return (
    <>
      <section
        className="relative py-16 md:py-24 bg-[#02131d] text-white overflow-hidden"
        style={{
          fontFamily:
            "Harabara, sans-serif",
        }}
      >

        {/* BACKGROUND GLOW */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 px-6 items-center">

          {/* LEFT CONTENT */}
          <div>

            {/* SMALL LABEL */}
            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              className="text-cyan-400 tracking-[3px] text-[12px] font-semibold mb-3 uppercase"
            >
              {section.tag}
            </motion.p>

            {/* TITLE */}
            <motion.h2
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
              }}
              className="text-[36px] md:text-[52px] font-semibold mb-5 leading-[1.1] tracking-[1px]"
            >

              {section.title}{" "}

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                {
                  section.highlight
                }

              </span>

            </motion.h2>

            {/* DESC */}
            <motion.p
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
              }}
              className="text-white/60 mb-8 md:mb-12 max-w-lg text-[14px] md:text-[15px] leading-relaxed"
            >
              {
                section.description
              }
            </motion.p>

            {/* FEATURES */}
            <div className="space-y-8">

              {features.map(
                (
                  item,
                  i
                ) => (
                  <motion.div
                    key={item.id}
                    initial={{
                      opacity: 0,
                      x: -30,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay:
                        i * 0.1,
                    }}
                    className="flex gap-4 items-start"
                  >

                    {/* ICON */}
                    <div
                      className="w-12 h-12 flex items-center justify-center rounded-full border border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 text-cyan-400 shadow-inner"
                    >
                      {
                        iconMap[
                          item.icon
                        ]
                      }
                    </div>

                    {/* TEXT */}
                    <div>

                      <h3
                        className="text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] mb-1 text-white"
                      >
                        {
                          item.title
                        }
                      </h3>

                      <p
                        className="text-[14px] md:text-[15px] text-white/60 leading-relaxed"
                      >
                        {
                          item.description
                        }
                      </p>

                    </div>

                  </motion.div>
                )
              )}

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
            }}
            className="relative"
          >

            <div className="rounded-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.7)]">

              <img
                src={
                  section.image_url
                }
                alt="Divers"
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />

            </div>

            {/* GLOW */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-400/20 blur-[120px] rounded-full" />

          </motion.div>

        </div>
      </section>

      {/* FONT LOAD */}
      <style jsx global>{`
        @font-face {
          font-family: "Harabara";
          src: url("/fonts/Harabara.woff")
            format("woff");
        }
      `}</style>
    </>
  );
}