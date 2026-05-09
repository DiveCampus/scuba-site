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

  getHybridProtocolSection,

  getHybridProtocolCards,

} from "@/services/HybridProtocolService";

/* =========================================
   ICONS
========================================= */

const icons: any = {

  Anchor: <Anchor size={20} />,

  Compass: <Compass size={20} />,

  MapPin: <MapPin size={20} />,

  Waves: <Waves size={20} />,

};

/* =========================================
   COMPONENT
========================================= */

export function HybridProtocolSection() {

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
        await getHybridProtocolSection();

      const { data: cardsData } =
        await getHybridProtocolCards();

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

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#f5f7fa]
      ">

        Loading...

      </div>

    );

  }

  return (

    <section
      className="
        py-32
        bg-[#f5f7fa]
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* HEADER */}
      <div className="
        text-center
        max-w-4xl
        mx-auto
        px-6
        mb-20
      ">

        <p className="
          text-[10px]
          tracking-[4px]
          text-cyan-500
          mb-5
        ">

          {section?.top_label}

        </p>

        <h2 className="
          text-3xl
          md:text-5xl
          font-bold
          text-[#0a0e27]
          leading-[1.2]
          tracking-[1px]
        ">

          {section?.title}{" "}

          <span className="
            text-cyan-500
          ">

            {section?.highlighted_title}

          </span>

        </h2>

        <p className="
          mt-7
          text-[15px]
          md:text-[16px]
          leading-[1.95]
          tracking-[0.5px]
          text-gray-500
          max-w-2xl
          mx-auto
        ">

          {section?.description}

        </p>

        {/* INFO BOX */}
        <div className="
          mt-10
          bg-white
          border
          border-gray-200
          rounded-3xl
          p-7
          shadow-sm
          text-left
        ">

          <p className="
            text-gray-600
            text-[14px]
            leading-[1.9]
            mb-4
          ">

            • {section?.info_box_1}

          </p>

          <p className="
            text-gray-600
            text-[14px]
            leading-[1.9]
          ">

            • {section?.info_box_2}

          </p>

        </div>

      </div>

      {/* GRID */}
      <div className="
        max-w-6xl
        mx-auto
        px-6
        grid
        md:grid-cols-4
        gap-7
      ">

        {cards.map((card, i) => (

          <motion.div
            key={card.id}
            whileHover={{
              y: -5,
            }}
            transition={{
              duration: 0.25,
            }}
            className={`
              p-7
              rounded-3xl
              border
              bg-white
              shadow-sm

              ${
                card.highlight
                  ? "border-yellow-400"
                  : "border-gray-200"
              }
            `}
          >

            {/* TAG */}
            <p className="
              text-[9px]
              tracking-[3px]
              text-cyan-500
              mb-6
            ">

              {card.tag}

            </p>

            {/* ICON */}
            <div className="
              text-cyan-500
              mb-6
            ">

              {
                icons[
                  card.icon
                ]
              }

            </div>

            {/* TITLE */}
            <h3 className="
              text-[17px]
              font-semibold
              text-[#0a0e27]
              leading-[1.5]
              mb-4
            ">

              {card.title}

            </h3>

            {/* DESC */}
            <p className="
              text-[13px]
              text-gray-500
              leading-[1.95]
            ">

              {card.description}

            </p>

          </motion.div>

        ))}

        {/* CTA CARD */}
        <div className="
          p-7
          rounded-3xl
          border
          border-gray-200
          bg-white
          shadow-sm
          flex
          flex-col
          justify-center
          items-center
          text-center
        ">

          <MessageCircle
            className="
              text-cyan-500
              mb-5
            "
            size={22}
          />

          <h3 className="
            text-[18px]
            font-semibold
            text-[#0a0e27]
            mb-4
          ">

            {section?.cta_title}

          </h3>

          <p className="
            text-[13px]
            text-gray-500
            leading-[1.9]
            mb-6
          ">

            {section?.cta_description}

          </p>

          <button className="
            px-6
            py-3
            border
            border-gray-300
            rounded-xl
            text-[11px]
            tracking-[1.5px]
            hover:bg-gray-100
            transition
          ">

            {section?.cta_button}

          </button>

        </div>

      </div>
 
    </section>

  );

}