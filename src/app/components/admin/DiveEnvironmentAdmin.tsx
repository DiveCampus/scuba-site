"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {

  Save,

} from "lucide-react";

import {

  getDiveEnvironmentSection,

  updateDiveEnvironmentSection,

  getDiveEnvironmentCards,

  updateDiveEnvironmentCard,

} from "@/services/DiveEnvironmentService";

/* =========================================
   ADMIN
========================================= */

export default function DiveEnvironmentAdmin() {

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
        await getDiveEnvironmentSection();

      const { data: cardsData } =
        await getDiveEnvironmentCards();

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

    await updateDiveEnvironmentSection(
      section.id,
      section
    );

    setSaving(false);

  };

  if (loading) return null;

  return (

    <section
      className="
        relative
        py-32
        overflow-hidden
        bg-black
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* GLOW */}
      <div className="
        absolute
        left-[-220px]
        top-[-120px]
        w-[650px]
        h-[650px]
        bg-cyan-500/20
        blur-[180px]
        rounded-full
      " />

      <div className="
        relative
        max-w-7xl
        mx-auto
        px-6
      ">

        {/* TOP */}
        <div className="
          flex
          items-center
          justify-between
          mb-20
          flex-wrap
          gap-5
        ">

          <div>

            <p className="
              text-[10px]
              tracking-[4px]
              text-cyan-400
              mb-3
            ">

              ADMIN PANEL

            </p>

            <h2 className="
              text-4xl
              font-bold
              text-white
            ">

              Dive Environment

            </h2>

          </div>

          <button
            onClick={handleSave}
            className="
              h-[56px]
              px-7
              rounded-2xl
              bg-cyan-400
              text-black
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
                : "Save Changes"
            }

          </button>

        </div>

        {/* HEADER */}
        <div className="
          text-center
          max-w-4xl
          mx-auto
          mb-24
        ">

          <div className="
            grid
            md:grid-cols-2
            gap-5
            mb-8
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
                h-[76px]
                rounded-3xl
                bg-white/5
                border
                border-white/10
                text-center
                text-4xl
                font-bold
                text-white
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
                h-[76px]
                rounded-3xl
                bg-cyan-400/10
                border
                border-cyan-400/20
                text-center
                text-4xl
                font-bold
                text-cyan-400
                outline-none
              "
            />

          </div>

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
              rounded-[32px]
              bg-white/5
              border
              border-white/10
              p-8
              text-center
              text-white/60
              leading-[2]
              outline-none
              resize-none
            "
          />

        </div>

        {/* CARDS */}
        <div className="
          grid
          lg:grid-cols-2
          gap-10
        ">

          {cards.map((item, i) => (

            <motion.div
              key={item.id}
              whileHover={{
                y: -5,
              }}
              className="
                rounded-[34px]
                border
                border-white/10
                bg-gradient-to-br
                from-[#111f2a]
                to-[#05080d]
                p-10
              "
            >

              {/* BADGE */}
              <input
                value={
                  item.badge
                }
                onChange={(e) => {

                  const updated =
                    [...cards];

                  updated[i].badge =
                    e.target.value;

                  setCards(updated);

                  updateDiveEnvironmentCard(
                    item.id,
                    updated[i]
                  );

                }}
                className="
                  w-full
                  h-[50px]
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  px-5
                  text-cyan-400
                  text-[10px]
                  tracking-[4px]
                  outline-none
                  mb-8
                "
              />

              {/* TITLE */}
              <input
                value={
                  item.title
                }
                onChange={(e) => {

                  const updated =
                    [...cards];

                  updated[i].title =
                    e.target.value;

                  setCards(updated);

                  updateDiveEnvironmentCard(
                    item.id,
                    updated[i]
                  );

                }}
                className="
                  w-full
                  h-[76px]
                  rounded-3xl
                  bg-white/5
                  border
                  border-white/10
                  px-6
                  text-[42px]
                  font-bold
                  text-white
                  outline-none
                  mb-8
                "
              />

              {/* DESCRIPTION */}
              <textarea
                rows={5}
                value={
                  item.description
                }
                onChange={(e) => {

                  const updated =
                    [...cards];

                  updated[
                    i
                  ].description =
                    e.target.value;

                  setCards(updated);

                  updateDiveEnvironmentCard(
                    item.id,
                    updated[i]
                  );

                }}
                className="
                  w-full
                  rounded-[28px]
                  bg-white/5
                  border
                  border-white/10
                  p-6
                  text-white/60
                  leading-[2]
                  outline-none
                  resize-none
                  mb-10
                "
              />

              {/* FEATURES */}
              <div className="
                space-y-5
              ">

                {[
                  "feature_1",
                  "feature_2",
                  "feature_3",
                ].map((key: any, index) => (

                  <input
                    key={index}
                    value={item[key]}
                    onChange={(e) => {

                      const updated =
                        [...cards];

                      updated[i][key] =
                        e.target.value;

                      setCards(updated);

                      updateDiveEnvironmentCard(
                        item.id,
                        updated[i]
                      );

                    }}
                    className="
                      w-full
                      h-[54px]
                      rounded-2xl
                      bg-white/5
                      border
                      border-white/10
                      px-5
                      text-white
                      outline-none
                    "
                  />

                ))}

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );

}