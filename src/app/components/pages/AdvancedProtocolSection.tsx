"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Anchor,
  Compass,
  MapPin,
  Waves,
  MessageCircle,
} from "lucide-react";

import {
  getAdvancedProtocol,
} from "@/services/AdvancedProtocolService";

const icons: any = {
  Anchor: <Anchor size={20} />,
  Compass: <Compass size={20} />,
  MapPin: <MapPin size={20} />,
  Waves: <Waves size={20} />,
};

export function AdvancedProtocolSection() {

  const [section, setSection] =
    useState<any>(null);

  const [cards, setCards] =
    useState<any[]>([]);

  useEffect(() => {

    const load = async () => {

      const res = await getAdvancedProtocol();

      setSection(res.section);

      setCards(res.cards);
    };

    load();

  }, []);

  if (!section) return null;

  return (

    <section className="py-16 md:py-24 bg-[#f3f6f9]">

      {/* HEADER */}
      <div className="text-center max-w-4xl mx-auto px-6 mb-8 md:mb-12">

        <p className="text-[12px] font-semibold tracking-[3px] text-cyan-500 mb-3">
          {section.top_label}
        </p>

        <h2 className="text-[36px] md:text-[52px] font-semibold tracking-[1px] leading-[1.1] text-[#0a0e27] mt-3">

          {section.title}{" "}

          <span className="text-cyan-500">
            {section.highlighted_title}
          </span>

        </h2>

        <p className="mt-5 text-gray-500 text-[15px] md:text-[16px] font-normal max-w-2xl mx-auto leading-[1.7]">
          {section.description}
        </p>

      </div>

      {/* CARDS */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-7">

        {cards.map((card) => (

          <motion.div
            key={card.id}
            whileHover={{ y: -5 }}
            className={`
              p-7
              rounded-2xl
              border
              bg-white
              shadow-sm

              ${
                card.highlight
                  ? "border-yellow-400 bg-[#fffdf7]"
                  : "border-gray-200"
              }
            `}
          >

            <div className="text-cyan-500 mb-5">
              {icons[card.icon]}
            </div>

            <div className="text-[12px] font-semibold tracking-[3px] text-cyan-500 mb-3">
              {card.tag}
            </div>

            <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] text-[#0a0e27] mt-4 mb-4">
              {card.title}
            </h3>

            <p className="text-[14px] md:text-[15px] text-gray-500 leading-relaxed">
              {card.description}
            </p>

          </motion.div>

        ))}

        {/* CTA */}
        <div className="p-7 rounded-2xl border border-gray-200 bg-white flex flex-col items-center justify-center text-center">

          <MessageCircle
            className="text-cyan-500 mb-5"
            size={22}
          />

          <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] text-[#0a0e27] mt-4 mb-4">
            {section.cta_title}
          </h3>

          <p className="text-[14px] md:text-[15px] text-gray-500 mb-6 leading-relaxed">
            {section.cta_description}
          </p>

          <button className="px-5 py-3 rounded-xl border border-gray-300">
            {section.cta_button}
          </button>

        </div>

      </div>

    </section>
  );
}