"use client";

import { useEffect, useState } from "react";

import { Check, X } from "lucide-react";

import { motion } from "framer-motion";

import {

  getMasteryGapSection,

  getMasteryGapRows,

} from "@/services/MasteryGapService";

export function MasteryGapSection() {

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

      const { data: sectionData } = await getMasteryGapSection();

      const { data: rowsData } = await getMasteryGapRows();

      setSection(sectionData);

      setRows(rowsData || []);

      setLoading(false);

    };

    fetchData();

  }, []);

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#02131d] text-white">

        Loading...

      </div>

    );

  }

  return (

    <section
      className="relative py-36 bg-[#02131d] text-white overflow-hidden"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* BACKGROUND GLOW */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">

          <h2 className="text-3xl md:text-5xl font-bold leading-[1.2] tracking-[1px]">

            {section?.title}{" "}

            <span className="text-cyan-400">

              {section?.highlighted_title}

            </span>

          </h2>

          <p className="text-white/60 mt-5 max-w-3xl mx-auto text-[15px] md:text-[16px] leading-relaxed tracking-[0.45px]">

            {section?.description}

          </p>

        </div>

        {/* TABLE */}
        <div className="rounded-3xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

          {/* TABLE HEAD */}
          <div className="grid grid-cols-3 text-[10px] tracking-[3px] text-white/40 border-b border-white/10 bg-white/[0.03]">

            <div className="p-6">

              {section?.table_heading_1}

            </div>

            <div className="p-6 text-center">

              {section?.table_heading_2}

            </div>

            <div className="p-6 text-center text-cyan-400">

              {section?.table_heading_3}

            </div>

          </div>

          {/* ROWS */}
          {rows.map((row, i) => (

            <motion.div
              key={row.id}
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: i * 0.05,
              }}
              className="grid grid-cols-3 border-b border-white/10 last:border-none items-center"
            >

              {/* TITLE */}
              <div className="p-6 text-white/82 text-[14px] tracking-[0.45px] leading-relaxed">

                {row.title}

              </div>

              {/* STANDARD */}
              <div className="p-6 flex items-center justify-center gap-3 text-red-400 text-[13px] tracking-[0.35px] leading-relaxed">

                <X
                  size={16}
                  className="shrink-0"
                />

                <span>

                  {row.standard_text}

                </span>

              </div>

              {/* NEMO */}
              <div className="p-6 flex items-center justify-center">

                <div className="flex items-center gap-3 px-6 py-3 rounded-xl border border-cyan-400/30 bg-cyan-400/5 text-cyan-300 text-[13px] tracking-[0.35px] leading-[1.7]">

                  <Check
                    size={16}
                    className="shrink-0"
                  />

                  <span>

                    {row.nemo_text}

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