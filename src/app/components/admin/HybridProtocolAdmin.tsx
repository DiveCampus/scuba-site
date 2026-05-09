"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {

  Anchor,

  Compass,

  MapPin,

  Waves,

  MessageCircle,

  Save,

} from "lucide-react";

import {

  getHybridProtocolSection,

  updateHybridProtocolSection,

  getHybridProtocolCards,

  updateHybridProtocolCard,

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

export default function HybridProtocolAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [cards, setCards] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

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
     SAVE
  ========================================= */

  const handleSave = async () => {

    if (!section?.id) return;

    setSaving(true);

    await updateHybridProtocolSection(
      section.id,
      section
    );

    setSaving(false);

  };

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
        bg-[#f5f7fa]
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* HEADER */}
      <div className="
        max-w-7xl
        mx-auto
        px-6
        flex
        items-center
        justify-between
        mb-16
        flex-wrap
        gap-5
      ">

        <div>

          <p className="
            text-[10px]
            tracking-[4px]
            text-cyan-500
            mb-3
          ">

            ADMIN PANEL

          </p>

          <h2 className="
            text-4xl
            font-bold
            text-[#0a0e27]
          ">

            Hybrid Protocol

          </h2>

        </div>

        <button
          onClick={handleSave}
          className="
            h-[56px]
            px-7
            rounded-2xl
            bg-cyan-500
            text-white
            font-semibold
            flex
            items-center
            gap-3
          "
        >

          <Save size={18} />

          {
            saving
              ? "Saving..."
              : "Save"
          }

        </button>

      </div>

      {/* HEADER SECTION */}
      <div className="
        text-center
        max-w-4xl
        mx-auto
        px-6
        mb-20
      ">

        <input
          value={
            section?.top_label || ""
          }
          onChange={(e) =>
            setSection({
              ...section,
              top_label:
                e.target.value,
            })
          }
          className="
            w-full
            h-[54px]
            rounded-2xl
            border
            border-gray-200
            bg-white
            text-center
            text-cyan-500
            text-[10px]
            tracking-[4px]
            outline-none
            mb-6
          "
        />

        {/* TITLES */}
        <div className="
          grid
          md:grid-cols-2
          gap-5
          mb-6
        ">

          <input
            value={
              section?.title || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                title:
                  e.target.value,
              })
            }
            className="
              h-[68px]
              rounded-2xl
              border
              border-gray-200
              bg-white
              px-6
              text-3xl
              font-bold
              text-[#0a0e27]
              outline-none
            "
          />

          <input
            value={
              section?.highlighted_title || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                highlighted_title:
                  e.target.value,
              })
            }
            className="
              h-[68px]
              rounded-2xl
              border
              border-cyan-200
              bg-cyan-50
              px-6
              text-3xl
              font-bold
              text-cyan-500
              outline-none
            "
          />

        </div>

        {/* DESCRIPTION */}
        <textarea
          rows={4}
          value={
            section?.description || ""
          }
          onChange={(e) =>
            setSection({
              ...section,
              description:
                e.target.value,
            })
          }
          className="
            w-full
            rounded-3xl
            border
            border-gray-200
            bg-white
            p-6
            text-gray-600
            outline-none
            resize-none
            mb-8
          "
        />

        {/* INFO BOX */}
        <div className="
          bg-white
          border
          border-gray-200
          rounded-3xl
          p-7
          shadow-sm
        ">

          <textarea
            rows={3}
            value={
              section?.info_box_1 || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                info_box_1:
                  e.target.value,
              })
            }
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-[#f8fafc]
              p-4
              text-gray-600
              outline-none
              resize-none
              mb-4
            "
          />

          <textarea
            rows={3}
            value={
              section?.info_box_2 || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                info_box_2:
                  e.target.value,
              })
            }
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-[#f8fafc]
              p-4
              text-gray-600
              outline-none
              resize-none
            "
          />

        </div>

      </div>

      {/* CARDS */}
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
            <input
              value={
                card.tag || ""
              }
              onChange={(e) => {

                const updated =
                  [...cards];

                updated[i].tag =
                  e.target.value;

                setCards(updated);

                updateHybridProtocolCard(
                  card.id,
                  updated[i]
                );

              }}
              className="
                w-full
                h-[42px]
                rounded-xl
                border
                border-gray-200
                bg-[#f8fafc]
                px-4
                text-[10px]
                tracking-[3px]
                text-cyan-500
                outline-none
                mb-6
              "
            />

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
            <input
              value={
                card.title || ""
              }
              onChange={(e) => {

                const updated =
                  [...cards];

                updated[i].title =
                  e.target.value;

                setCards(updated);

                updateHybridProtocolCard(
                  card.id,
                  updated[i]
                );

              }}
              className="
                w-full
                h-[56px]
                rounded-2xl
                border
                border-gray-200
                bg-white
                px-5
                text-[#0a0e27]
                font-semibold
                outline-none
                mb-4
              "
            />

            {/* DESCRIPTION */}
            <textarea
              rows={5}
              value={
                card.description || ""
              }
              onChange={(e) => {

                const updated =
                  [...cards];

                updated[
                  i
                ].description =
                  e.target.value;

                setCards(updated);

                updateHybridProtocolCard(
                  card.id,
                  updated[i]
                );

              }}
              className="
                w-full
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-4
                text-gray-500
                text-[13px]
                leading-[1.9]
                outline-none
                resize-none
              "
            />

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

          <input
            value={
              section?.cta_title || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                cta_title:
                  e.target.value,
              })
            }
            className="
              w-full
              h-[56px]
              rounded-2xl
              border
              border-gray-200
              bg-white
              px-5
              text-center
              text-[#0a0e27]
              font-semibold
              outline-none
              mb-4
            "
          />

          <textarea
            rows={4}
            value={
              section?.cta_description || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                cta_description:
                  e.target.value,
              })
            }
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-4
              text-gray-500
              text-center
              outline-none
              resize-none
              mb-5
            "
          />

          <input
            value={
              section?.cta_button || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                cta_button:
                  e.target.value,
              })
            }
            className="
              w-full
              h-[48px]
              rounded-xl
              border
              border-gray-300
              bg-[#f8fafc]
              text-center
              text-[11px]
              tracking-[1.5px]
              outline-none
            "
          />

        </div>

      </div>

    </section>

  );

}