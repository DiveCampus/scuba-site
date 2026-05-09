"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { Check } from "lucide-react";

import {

  getEliteBenefitsSection,

  getEliteBenefitsPoints,

} from "@/services/EliteBenefitsService";

/* =========================================
   FRONTEND
========================================= */

export function EliteBenefitsSection() {

  const [section, setSection] =
    useState<any>(null);

  const [points, setPoints] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const fetchData = async () => {

      const { data: sectionData } =
        await getEliteBenefitsSection();

      const { data: pointsData } =
        await getEliteBenefitsPoints();

      setSection(sectionData);

      setPoints(pointsData || []);

      setLoading(false);

    };

    fetchData();

  }, []);

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {

    return null;

  }

  return (

    <section
      className="
        py-32
        bg-[#03121c]
        text-white
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      <div className="
        max-w-7xl
        mx-auto
        grid
        lg:grid-cols-2
        gap-20
        px-6
        items-center
      ">

        {/* IMAGE */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            flex
            justify-center
          "
        >

          <div className="
            rounded-3xl
            overflow-hidden
            shadow-[0_20px_80px_rgba(0,0,0,0.6)]
            max-w-[440px]
            w-full
          ">

            <img
              src={
                section?.image_url
              }
              className="
                w-full
                h-full
                object-cover
              "
            />

          </div>

        </motion.div>

        {/* CONTENT */}
        <div>

          {/* LABEL */}
          <p className="
            text-[10px]
            tracking-[4px]
            text-cyan-400
            mb-5
          ">

            {section?.label}

          </p>

          {/* TITLE */}
          <h2 className="
            text-3xl
            md:text-5xl
            font-bold
            leading-[1.2]
            tracking-[1px]
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

          {/* DESC */}
          <p className="
            text-white/60
            max-w-xl
            text-[15px]
            md:text-[16px]
            leading-[1.95]
            tracking-[0.45px]
            mb-14
          ">

            {section?.description}

          </p>

          {/* POINTS */}
          <div className="
            space-y-8
          ">

            {points.map((item, i) => (

              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  x: 30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: i * 0.08,
                }}
                className="
                  flex
                  gap-5
                  border-b
                  border-white/10
                  pb-7
                  last:border-none
                "
              >

                {/* ICON */}
                <div className="
                  mt-1
                ">

                  <div className="
                    w-7
                    h-7
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-cyan-400/10
                    text-cyan-400
                  ">

                    <Check size={14} />

                  </div>

                </div>

                {/* TEXT */}
                <div>

                  <h3 className="
                    text-[15px]
                    font-semibold
                    tracking-[0.7px]
                    leading-[1.65]
                    text-white
                    mb-2.5
                  ">

                    {item.title}

                  </h3>

                  <p className="
                    text-[13px]
                    text-white/60
                    leading-[1.95]
                    tracking-[0.35px]
                    max-w-lg
                  ">

                    {item.description}

                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>

  );

}