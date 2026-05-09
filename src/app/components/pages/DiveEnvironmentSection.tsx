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

      const { data: sectionData } =
        await getDiveEnvironmentSection();

      const { data: cardsData } =
        await getDiveEnvironmentCards();

      setSection(sectionData);

      setCards(cardsData || []);

      setLoading(false);

    };

    fetchData();

  }, []);

  if (loading) return null;

  return (

    <section
      className="
        relative
        py-32
        overflow-hidden
        bg-black
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* GLOW */}
      <div className="
        absolute
        left-[-220px]
        top-[-120px]
        w-[650px]
        h-[650px]
        bg-cyan-500/20
        blur-[180px]
        rounded-full
      " />

      <div className="
        relative
        max-w-7xl
        mx-auto
        px-6
      ">

        {/* HEADER */}
        <div className="
          text-center
          max-w-4xl
          mx-auto
          mb-24
        ">

          <h2 className="
            text-4xl
            md:text-6xl
            font-bold
            text-white
            leading-[1.05]
            tracking-[-2px]
            mb-8
          ">

            {section?.title}{" "}

            <span className="
              text-cyan-400
            ">

              {
                section?.highlighted_title
              }

            </span>

          </h2>

          <p className="
            text-white/55
            text-[16px]
            leading-[2]
            max-w-4xl
            mx-auto
          ">

            {section?.description}

          </p>

        </div>

        {/* CARDS */}
        <div className="
          grid
          lg:grid-cols-2
          gap-10
        ">

          {cards.map((item, i) => (

            <motion.div
              key={item.id}
              whileHover={{
                y: -6,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                relative
                rounded-[34px]
                border
                border-white/10
                bg-gradient-to-br
                from-[#111f2a]
                to-[#05080d]
                p-10
                overflow-hidden
              "
            >

              {/* BADGE */}
              <p className="
                text-[10px]
                tracking-[4px]
                text-cyan-400
                mb-10
              ">

                {item.badge}

              </p>

              {/* TITLE */}
              <h3 className="
                text-[42px]
                font-bold
                text-white
                leading-[1.1]
                mb-10
              ">

                {item.title}

              </h3>

              {/* DESCRIPTION */}
              <p className="
                text-white/55
                leading-[2]
                text-[15px]
                mb-12
                max-w-xl
              ">

                {item.description}

              </p>

              {/* FEATURES */}
              <div className="
                space-y-6
              ">

                {[
                  item.feature_1,
                  item.feature_2,
                  item.feature_3,
                ].map((feature, index) => (

                  <div
                    key={index}
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >

                    <div className="
                      w-2.5
                      h-2.5
                      rounded-full
                      bg-cyan-400
                    " />

                    <span className="
                      text-white/75
                      text-[15px]
                      tracking-[0.4px]
                    ">

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