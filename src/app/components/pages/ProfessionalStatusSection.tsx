"use client";

import { Check } from "lucide-react";

import { motion } from "framer-motion";

import {

  useEffect,

  useState,

} from "react";

import {

  getProfessionalStatusSection,

  getProfessionalStatusItems,

} from "@/services/ProfessionalStatusService";

/* =========================================
   FRONTEND
========================================= */

export function ProfessionalStatusSection() {

  const [section, setSection] =
    useState<any>(null);

  const [items, setItems] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH DATA
  ========================================= */

  useEffect(() => {

    const fetchData =
      async () => {

        const sectionResponse = await getProfessionalStatusSection();

        const itemsResponse = await getProfessionalStatusItems();

        console.log(
          "PRO STATUS SECTION =>",
          sectionResponse
        );

        console.log(
          "PRO STATUS ITEMS =>",
          itemsResponse
        );

        setSection(
          sectionResponse.data
        );

        setItems(
          itemsResponse.data || []
        );

        setLoading(false);

      };

    fetchData();

  }, []);

  if (loading || !section)
    return null;

  return (

    <section
      className="py-16 md:py-24 bg-[#f4f7fb]"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* HEADER */}
      <div className="text-center max-w-[720px] mx-auto px-4">

        {/* TOP */}
        <p className="text-[12px] font-semibold tracking-[3px] uppercase text-gray-500 mb-3">

          {section.top_label}

        </p>

        {/* TITLE */}
        <h2 className="text-[36px] md:text-[52px] font-semibold text-[#0a0e27] leading-[1.1] tracking-[1px]">

          {section.title}

        </h2>

        {/* DESCRIPTION */}
        <p className="mt-5 text-[15px] md:text-[16px] font-normal leading-[1.7] tracking-[0.45px] text-gray-500 max-w-2xl mx-auto">

          {section.description}

        </p>

      </div>

      {/* IMAGE */}
      <div className="max-w-[960px] mx-auto mt-8 md:mt-12 px-4">

        <motion.img
          src={section.image_url}
          className="w-full h-[300px] md:h-[360px] object-cover rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
          }}
        />

      </div>

      {/* GRID */}
      <div className="max-w-[960px] mx-auto mt-8 md:mt-12 grid md:grid-cols-2 gap-7 px-4">

        {items.map((item, i) => (

          <motion.div
            key={item.id}
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
            className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100"
          >

            {/* TITLE */}
            <div className="flex items-center gap-3 mb-5">

              {/* ICON */}
              <div className="w-7 h-7 rounded-full bg-cyan-100 flex items-center justify-center shrink-0">

                <Check
                  className="w-3.5 h-3.5 text-cyan-500"
                />

              </div>

              {/* TITLE */}
              <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] text-[#0a0e27]">

                {item.title}

              </h3>

            </div>

            {/* LIST */}
            <ul className="text-[13px] text-gray-500 space-y-3 leading-relaxed tracking-[0.35px]">

              {item.descriptions?.map(
                (
                  d: string,
                  idx: number
                ) => (

                  <li
                    key={idx}
                    className="flex gap-2"
                  >

                    <span className="text-cyan-500">

                      •

                    </span>

                    <span>

                      {d}

                    </span>

                  </li>

                )
              )}

            </ul>

            {/* HIGHLIGHT */}
            {item.highlight && (

              <div className="mt-5 text-[11px] tracking-[0.6px] leading-relaxed bg-cyan-50 text-cyan-600 px-4 py-3 rounded-xl border border-cyan-100">

                {item.highlight}

              </div>

            )}

          </motion.div>

        ))}

      </div>

    </section>

  );

}