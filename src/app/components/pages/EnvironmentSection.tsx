// =========================================
// DynamicEnvironmentSection.tsx
// FRONTEND DYNAMIC UI
// =========================================

"use client";

import {

  useEffect,

  useState,

} from "react";

import {

  motion,

} from "framer-motion";

import {

  getEnvironmentShowcase,

} from "@/services/EnvironmentShowcaseService";

export function EnvironmentSection() {

  const [section, setSection] =
    useState<any>(null);

  const [cards, setCards] =
    useState<any[]>([]);

  const [footerGroups, setFooterGroups] =
    useState<any[]>([]);

  const [footerLinks, setFooterLinks] =
    useState<any[]>([]);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const load =
      async () => {

        const {

          section,

          cards,

          footerGroups,

          footerLinks,

        } = await getEnvironmentShowcase();

        console.log(
          "SECTION =>",
          section
        );

        console.log(
          "CARDS =>",
          cards
        );

        console.log(
          "GROUPS =>",
          footerGroups
        );

        console.log(
          "LINKS =>",
          footerLinks
        );

        setSection(section);

        setCards(cards || []);

        setFooterGroups(
          footerGroups || []
        );

        setFooterLinks(
          footerLinks || []
        );

      };

    load();

  }, []);

  if (!section)
    return null;

  /* =========================================
     FILTER LINKS
  ========================================= */

  const getLinks =
    (groupId: string) => {

      return footerLinks.filter(
        (item) =>
          item.group_id === groupId
      );

    };

  return (

    <section
      className="bg-[#02131d] text-white py-32 relative overflow-hidden"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* GLOW */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full" />

      {/* TOP */}
      <div className="relative max-w-[1120px] mx-auto text-center px-6">

        {/* TITLE */}
        <h2 className="text-3xl md:text-5xl font-semibold leading-[1.18] tracking-[1.2px]">

          {section.title}{" "}

          <span className="text-cyan-400">

            {section.highlighted_title}

          </span>

        </h2>

        {/* DESCRIPTION */}
        <p className="text-white/55 text-[15px] md:text-[16px] mt-5 max-w-[760px] mx-auto leading-relaxed tracking-[0.5px]">

          {section.description}

        </p>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-8 mt-20">

          {cards.map((card, i) => (

            <motion.div
              key={card.id}
              whileHover={{
                scale: 1.02,
              }}
              transition={{
                duration: 0.25,
              }}
              className="bg-white/5 border border-white/10 rounded-3xl p-9 text-left backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >

              {/* LABEL */}
              <p className="text-[10px] text-cyan-400 tracking-[3.2px] mb-6">

                {card.label}

              </p>

              {/* TITLE */}
              <h3 className="text-2xl font-semibold tracking-[0.9px] leading-[1.5]">

                {card.title}

              </h3>

              {/* DESC */}
              <p className="text-white/60 text-[14px] mt-6 leading-relaxed tracking-[0.4px]">

                {card.description}

              </p>

              {/* FEATURES */}
              <ul className="mt-9 space-y-5 text-[13px] text-white/72 tracking-[0.4px]">

                {card.features?.map(
                  (
                    feature: string,
                    idx: number
                  ) => (

                    <li
                      key={idx}
                      className="flex items-center gap-3"
                    >

                      <span className="w-2 h-2 bg-cyan-400 rounded-full shrink-0" />

                      {feature}

                    </li>

                  )
                )}

              </ul>

            </motion.div>

          ))}

        </div>

      </div>

      {/* FOOTER */}
      <div className="relative mt-28 border-t border-white/10 pt-16 px-6">

        <div className="max-w-[1150px] mx-auto grid md:grid-cols-5 gap-12 text-sm">

          {footerGroups.map(
            (group) => (

              <div
                key={group.id}
              >

                <p className="text-white/50 text-[10px] tracking-[3.2px] mb-6">

                  {group.title}

                </p>

                <ul className="space-y-5 text-white/70 text-[13px] tracking-[0.4px]">

                  {getLinks(
                    group.id
                  ).map(
                    (link) => (

                      <li
                        key={link.id}
                        className="hover:text-white transition cursor-pointer"
                      >

                        {link.text}

                      </li>

                    )
                  )}

                </ul>

              </div>

            )
          )}

        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-white/35 text-[11px] tracking-[1.2px] mt-20 leading-relaxed">

          {section.footer_text}

        </div>

      </div>

    </section>

  );

}