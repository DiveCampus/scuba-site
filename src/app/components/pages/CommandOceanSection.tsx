"use client";

import {

  Compass,

  Users,

  BookOpen,

  Globe,

} from "lucide-react";

import { motion } from "framer-motion";

import {

  useEffect,

  useState,

} from "react";

import {

  getCommandOceanSection,

  getCommandOceanItems,

} from "@/services/CommandOceanService";

/* =========================================
   ICON MAP
========================================= */

const iconMap: any = {

  Compass: Compass,

  Users: Users,

  BookOpen: BookOpen,

  Globe: Globe,

};

/* =========================================
   FRONTEND
========================================= */

export function CommandOceanSection() {

  const [section, setSection] =
    useState<any>(null);

  const [items, setItems] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const fetchData =
      async () => {

        const sectionResponse = await getCommandOceanSection();

        const itemsResponse = await getCommandOceanItems();

        console.log(
          "COMMAND SECTION =>",
          sectionResponse
        );

        console.log(
          "COMMAND ITEMS =>",
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

          {section.top_text}

        </p>

        {/* TITLE */}
        <h2 className="text-[36px] md:text-[52px] font-semibold leading-[1.1] tracking-[1px] text-cyan-500 mt-3">

          {section.title}

        </h2>

        {/* DESC */}
        <p className="mt-5 text-[15px] md:text-[16px] font-normal leading-[1.7] tracking-[0.45px] text-gray-500 max-w-2xl mx-auto">

          {section.description}

        </p>

      </div>

      {/* GRID */}
      <div className="max-w-[980px] mx-auto mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4">

        {items.map((item, i) => {

          const Icon =
            iconMap[item.icon_name];

          return (

            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: 24,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: i * 0.08,
              }}
              className="text-center flex flex-col items-center"
            >

              {/* ICON */}
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-cyan-100 text-cyan-500 mb-6">

                {Icon && (

                  <Icon
                    className="w-5 h-5"
                  />

                )}

              </div>

              {/* TITLE */}
              <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] text-[#0a0e27]">

                {item.title}

              </h3>

              {/* DESC */}
              <p className="text-[14px] md:text-[15px] text-gray-500 mt-4 max-w-[240px] leading-relaxed tracking-[0.35px]">

                {item.description}

              </p>

            </motion.div>

          );

        })}

      </div>

    </section>

  );

}