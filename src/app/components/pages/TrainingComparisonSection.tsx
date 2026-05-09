"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {

  Check,

  X,

} from "lucide-react";

import {

  getTrainingComparisonSection,

  getTrainingComparisonRows,

} from "@/services/TrainingComparisonService";

/* =========================================
   FRONTEND
========================================= */

export function TrainingComparisonSection() {

  const [section, setSection] =
    useState<any>(null);

  const [rows, setRows] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const fetchData = async () => {

      const { data: sectionData } =
        await getTrainingComparisonSection();

      const { data: rowsData } =
        await getTrainingComparisonRows();

      setSection(sectionData);

      setRows(rowsData || []);

      setLoading(false);

    };

    fetchData();

  }, []);

  if (loading) return null;

  return (

    <section
      className="
        relative
        py-36
        overflow-hidden
        bg-[#02131d]
        text-white
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* GLOW */}
      <div className="
        absolute
        top-0
        left-[-250px]
        w-[650px]
        h-[650px]
        bg-cyan-500/10
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
          max-w-5xl
          mx-auto
          mb-24
        ">

          {/* TITLE */}
          <h2 className="
            text-5xl
            md:text-6xl
            font-bold
            leading-[1.1]
            tracking-[-2px]
            mb-10
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
            text-white/55
            text-[17px]
            leading-[2]
            max-w-4xl
            mx-auto
          ">

            {section?.description}

          </p>

        </div>

        {/* TABLE */}
        <div className="
          rounded-[34px]
          overflow-hidden
          border
          border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
          shadow-[0_20px_80px_rgba(0,0,0,0.4)]
        ">

          {/* HEAD */}
          <div className="
            grid
            grid-cols-3
            border-b
            border-white/10
            bg-white/[0.02]
          ">

            <div className="
              p-8
              text-[10px]
              tracking-[4px]
              text-white/35
            ">

              PROTOCOL METRIC

            </div>

            <div className="
              p-8
              text-center
              text-[10px]
              tracking-[4px]
              text-white/35
            ">

              {section?.left_heading}

            </div>

            <div className="
              p-8
              text-center
              text-[10px]
              tracking-[4px]
              text-cyan-400
            ">

              {section?.right_heading}

            </div>

          </div>

          {/* ROWS */}
          {rows.map((row, i) => (

            <motion.div
              key={row.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: i * 0.05,
              }}
              className="
                grid
                grid-cols-3
                items-center
                border-b
                border-white/10
                last:border-none
              "
            >

              {/* TITLE */}
              <div className="
                p-8
                text-white/85
                text-[15px]
                leading-[1.8]
              ">

                {row.title}

              </div>

              {/* STANDARD */}
              <div className="
                p-8
                flex
                items-center
                justify-center
                gap-3
                text-red-400
                text-[14px]
              ">

                <X
                  size={16}
                  className="
                    shrink-0
                  "
                />

                <span>

                  {row.standard_value}

                </span>

              </div>

              {/* PREMIUM */}
              <div className="
                p-8
                flex
                justify-center
              ">

                <div className="
                  px-7
                  py-4
                  rounded-full
                  border
                  border-cyan-400/30
                  bg-cyan-400/5
                  text-cyan-300
                  flex
                  items-center
                  gap-3
                  text-[14px]
                ">

                  <Check
                    size={16}
                    className="
                      shrink-0
                    "
                  />

                  <span>

                    {row.premium_value}

                  </span>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );

}