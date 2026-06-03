"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Award,
  Clock,
  Users,
} from "lucide-react";

import {

  getAdvancedTrainingGoldSection,

} from "@/services/AdvancedTrainingGoldService";

/* =========================================
   COMPONENT
========================================= */

export function AdvancedTrainingGoldSection() {

  const [section, setSection] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const fetchData = async () => {

      const { data } = await getAdvancedTrainingGoldSection();

      setSection(data);

      setLoading(false);

    };

    fetchData();

  }, []);

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa]">

        Loading...

      </div>

    );

  }

  return (

    <section
      className="py-16 md:py-24 bg-[#f5f7fa]"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 px-6 items-center">

        {/* ================= LEFT ================= */}
        <div>

          {/* BADGE */}
          <div className="inline-block px-5 py-2.5 text-[12px] font-semibold tracking-[3px] uppercase rounded-full border border-cyan-400/30 text-cyan-500 mb-3">

            {section?.badge}

          </div>

          {/* TITLE */}
          <h2 className="text-[36px] md:text-[52px] font-semibold text-[#0a0e27] leading-[1.1] tracking-[1px] mt-3 mb-5">

            {section?.title}{" "}

            <span className="text-cyan-500">

              {section?.highlighted_title}

            </span>

          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-500 text-[14px] md:text-[15px] leading-relaxed tracking-[0.45px] max-w-xl mt-5 mb-8 md:mb-12">

            {section?.description}

          </p>

          {/* PREMIUM CARD */}
          <motion.div
            whileHover={{
              y: -5,
            }}
            transition={{
              duration: 0.25,
            }}
            className="relative p-8 rounded-3xl border border-yellow-300/40 bg-[#fffdf7] shadow-sm"
          >

            {/* ICON */}
            <div className="absolute -top-5 left-8 bg-white p-3 rounded-full border border-yellow-300 shadow-sm">

              <Award className="text-yellow-500 w-5 h-5" />

            </div>

            {/* TITLE */}
            <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] text-[#0a0e27] mb-4 mt-3">

              {section?.card_title}

            </h3>

            {/* TEXT */}
            <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed tracking-[0.35px] mb-8">

              {section?.card_description}

            </p>

            {/* TAGS */}
            <div className="flex flex-wrap gap-4">

              <span className="px-5 py-2.5 text-[11px] tracking-[1px] border border-yellow-400 text-yellow-600 rounded-xl flex items-center gap-2">

                <Clock size={14} />

                {section?.tag_1}

              </span>

              <span className="px-5 py-2.5 text-[11px] tracking-[1px] border border-yellow-400 text-yellow-600 rounded-xl flex items-center gap-2">

                <Award size={14} />

                {section?.tag_2}

              </span>

              <span className="px-5 py-2.5 text-[11px] tracking-[1px] border border-yellow-400 text-yellow-600 rounded-xl flex items-center gap-2">

                <Users size={14} />

                {section?.tag_3}

              </span>

            </div>

          </motion.div>

        </div>

        {/* ================= RIGHT ================= */}
        <div className="grid grid-cols-2 gap-6">

          {/* BIG IMAGE */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            transition={{
              duration: 0.3,
            }}
            className="row-span-2 rounded-3xl overflow-hidden shadow-md"
          >

            <img
              src={
                section?.left_image
              }
              className="w-full h-full object-cover"
            />

          </motion.div>

          {/* TOP RIGHT */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            transition={{
              duration: 0.3,
            }}
            className="rounded-3xl overflow-hidden shadow-md"
          >

            <img
              src={
                section?.top_right_image
              }
              className="w-full h-full object-cover"
            />

          </motion.div>

          {/* BOTTOM RIGHT */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            transition={{
              duration: 0.3,
            }}
            className="rounded-3xl overflow-hidden shadow-md"
          >

            <img
              src={
                section?.bottom_right_image
              }
              className="w-full h-full object-cover"
            />

          </motion.div>

        </div>

      </div>

    </section>

  );

}