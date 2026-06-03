"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {

  getChooseEnvironmentSection,

  getChooseEnvironmentCards,

} from "@/services/ChooseEnvironmentService";

/* =========================================
   COMPONENT
========================================= */

export function ChooseEnvironmentSection() {

  const [section, setSection] =
    useState<any>(null);

  const [cards, setCards] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH DATA
  ========================================= */

  useEffect(() => {

    const fetchData = async () => {

      const { data: sectionData } = await getChooseEnvironmentSection();

      const { data: cardsData } = await getChooseEnvironmentCards();

      setSection(sectionData);

      setCards(cardsData || []);

      setLoading(false);

    };

    fetchData();

  }, []);

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#03121c] text-white">

        Loading...

      </div>

    );

  }

  return (

    <section
      className="relative py-36 bg-[#03121c] text-white overflow-hidden"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#061a28] via-[#03121c] to-black" />

      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">

          {/* TITLE */}
          <h2 className="text-3xl md:text-5xl font-bold leading-[1.2] tracking-[1px]">

            {section?.title}{" "}

            <span className="text-cyan-400">

              {section?.highlighted_title}

            </span>

          </h2>

          {/* DESCRIPTION */}
          <p className="text-white/55 mt-5 max-w-3xl mx-auto text-[15px] md:text-[16px] leading-relaxed tracking-[0.45px]">

            {section?.description}

          </p>

        </div>

        {/* ================= CARDS ================= */}
        <div className="grid md:grid-cols-2 gap-9">

          {cards.map(
            (card) => (

              <motion.div
                key={card.id}
                whileHover={{
                  y: -6,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="relative p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              >

                {/* TOP LABEL */}
                <p className="text-[10px] tracking-[3.5px] text-cyan-400 mb-6">

                  {card.top_label}

                </p>

                {/* TITLE */}
                <h3 className="text-2xl font-semibold tracking-[0.8px] leading-[1.4] mb-6">

                  {card.title}

                </h3>

                {/* DESCRIPTION */}
                <p className="text-white/60 text-[14px] leading-relaxed tracking-[0.35px] mb-8">

                  {card.description}

                </p>

                {/* FEATURES */}
                <div className="space-y-5 text-sm text-white/72">

                  {[1, 2, 3].map(
                    (num) => (

                      <div
                        key={num}
                        className="flex items-center gap-4 tracking-[0.45px]"
                      >

                        <span className="w-2 h-2 bg-cyan-400 rounded-full shrink-0" />

                        {
                          card[
                            `feature_${num}`
                          ]
                        }

                      </div>

                    )
                  )}

                </div>

              </motion.div>

            )
          )}

        </div>

      </div>

    </section>

  );

}