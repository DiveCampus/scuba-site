"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {

  getDiveEnvironmentSection,

  getDiveEnvironmentCards,

} from "@/services/DiveEnvironmentService";

/* =========================================
   FRONTEND
========================================= */

export function DiveEnvironmentSection() {

  const [section, setSection] =
    useState<any>(null);

  const [cards, setCards] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const fetchData = async () => {

      const { data: sectionData } = await getDiveEnvironmentSection();

      const { data: cardsData } = await getDiveEnvironmentCards();

      setSection(sectionData);

      setCards(cardsData || []);

      setLoading(false);

    };

    fetchData();

  }, []);

  if (loading) return null;

  return (

    <section
      className="relative py-16 md:py-24 overflow-hidden bg-black"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* GLOW */}
      <div className="absolute left-[-220px] top-[-120px] w-[650px] h-[650px] bg-cyan-500/20 blur-[180px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">

          <h2 className="text-[36px] md:text-[52px] font-semibold text-white leading-[1.1] tracking-[1px] mb-5">

            {section?.title}{" "}

            <span className="text-cyan-400">

              {
                section?.highlighted_title
              }

            </span>

          </h2>

          <p className="text-white/55 text-[15px] md:text-[16px] font-normal leading-[1.7] max-w-4xl mx-auto">

            {section?.description}

          </p>

        </div>

        {/* CARDS */}
        <div className="grid lg:grid-cols-2 gap-10">

          {cards.map((item, i) => (

            <motion.div
              key={item.id}
              whileHover={{
                y: -6,
              }}
              transition={{
                duration: 0.3,
              }}
              className="relative rounded-[34px] border border-white/10 bg-gradient-to-br from-[#111f2a] to-[#05080d] p-10 overflow-hidden"
            >

              {/* BADGE */}
              <p className="text-[12px] font-semibold tracking-[3px] uppercase text-cyan-400 mb-3">

                {item.badge}

              </p>

              {/* TITLE */}
              <h3 className="text-[20px] md:text-[24px] font-semibold text-white leading-[1.2] tracking-[0.5px] mt-3 mb-4">

                {item.title}

              </h3>

              {/* DESCRIPTION */}
              <p className="text-white/55 text-[14px] md:text-[15px] leading-relaxed mb-8 max-w-xl">

                {item.description}

              </p>

              {/* FEATURES */}
              <div className="space-y-6">

                {[
                  item.feature_1,
                  item.feature_2,
                  item.feature_3,
                ].map((feature, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-4"
                  >

                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />

                    <span className="text-white/75 text-[15px] tracking-[0.4px]">

                      {feature}

                    </span>

                  </div>

                ))}

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );

}