"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Award,
  Clock,
  Users,
  Save,
} from "lucide-react";

import {

  getAdvancedTrainingGoldSection,

  updateAdvancedTrainingGoldSection,

} from "@/services/AdvancedTrainingGoldService";

/* =========================================
   COMPONENT
========================================= */

export default function AdvancedTrainingGoldAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const fetchData = async () => {

      const { data } =
        await getAdvancedTrainingGoldSection();

      setSection(data);

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

    await updateAdvancedTrainingGoldSection(
      section.id,
      section
    );

    setSaving(false);

  };

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
        py-36
        bg-[#f5f7fa]
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      <div className="
        max-w-7xl
        mx-auto
        px-6
      ">

        {/* HEADER */}
        <div className="
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
              text-3xl
              md:text-5xl
              font-bold
              text-[#0a0e27]
            ">
              Advanced Training Gold
            </h2>

          </div>

          <motion.button
            whileTap={{
              scale: 0.95,
            }}
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

            {saving
              ? "Saving..."
              : "Save"}

          </motion.button>

        </div>

        {/* MAIN GRID */}
        <div className="
          grid
          lg:grid-cols-2
          gap-20
          items-start
        ">

          {/* ================= LEFT ================= */}
          <div className="
            space-y-6
          ">

            <input
              value={
                section?.badge || ""
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  badge:
                    e.target.value,
                })
              }
              className="
                w-full
                h-[56px]
                rounded-2xl
                border
                border-gray-200
                px-5
                text-black
                outline-none
                bg-white
              "
            />

            <div className="
              grid
              md:grid-cols-2
              gap-5
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
                  w-full
                  h-[58px]
                  rounded-2xl
                  border
                  border-gray-200
                  px-5
                  text-black
                  outline-none
                  bg-white
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
                  w-full
                  h-[58px]
                  rounded-2xl
                  border
                  border-gray-200
                  px-5
                  text-cyan-500
                  outline-none
                  bg-white
                "
              />

            </div>

            <textarea
              rows={6}
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
                p-6
                text-black
                outline-none
                resize-none
                bg-white
              "
            />

            {/* PREMIUM CARD */}
            <div className="
              relative
              p-8
              rounded-3xl
              border
              border-yellow-300/40
              bg-[#fffdf7]
              shadow-sm
            ">

              <div className="
                absolute
                -top-5
                left-8
                bg-white
                p-3
                rounded-full
                border
                border-yellow-300
              ">

                <Award className="
                  text-yellow-500
                  w-5
                  h-5
                " />

              </div>

              <input
                value={
                  section?.card_title || ""
                }
                onChange={(e) =>
                  setSection({
                    ...section,
                    card_title:
                      e.target.value,
                  })
                }
                className="
                  mt-5
                  w-full
                  h-[56px]
                  rounded-2xl
                  border
                  border-yellow-200
                  px-5
                  text-black
                  outline-none
                  bg-white
                  mb-5
                "
              />

              <textarea
                rows={5}
                value={
                  section?.card_description || ""
                }
                onChange={(e) =>
                  setSection({
                    ...section,
                    card_description:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  rounded-3xl
                  border
                  border-yellow-200
                  p-5
                  text-black
                  outline-none
                  resize-none
                  bg-white
                  mb-6
                "
              />

              {/* TAGS */}
              <div className="
                flex
                flex-wrap
                gap-4
              ">

                <div className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-3
                  border
                  border-yellow-300
                  rounded-xl
                  bg-white
                ">

                  <Clock
                    size={14}
                    className="
                      text-yellow-500
                    "
                  />

                  <input
                    value={
                      section?.tag_1 || ""
                    }
                    onChange={(e) =>
                      setSection({
                        ...section,
                        tag_1:
                          e.target.value,
                      })
                    }
                    className="
                      bg-transparent
                      outline-none
                      text-black
                      text-[11px]
                      tracking-[1px]
                    "
                  />

                </div>

                <div className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-3
                  border
                  border-yellow-300
                  rounded-xl
                  bg-white
                ">

                  <Award
                    size={14}
                    className="
                      text-yellow-500
                    "
                  />

                  <input
                    value={
                      section?.tag_2 || ""
                    }
                    onChange={(e) =>
                      setSection({
                        ...section,
                        tag_2:
                          e.target.value,
                      })
                    }
                    className="
                      bg-transparent
                      outline-none
                      text-black
                      text-[11px]
                      tracking-[1px]
                    "
                  />

                </div>

                <div className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-3
                  border
                  border-yellow-300
                  rounded-xl
                  bg-white
                ">

                  <Users
                    size={14}
                    className="
                      text-yellow-500
                    "
                  />

                  <input
                    value={
                      section?.tag_3 || ""
                    }
                    onChange={(e) =>
                      setSection({
                        ...section,
                        tag_3:
                          e.target.value,
                      })
                    }
                    className="
                      bg-transparent
                      outline-none
                      text-black
                      text-[11px]
                      tracking-[1px]
                    "
                  />

                </div>

              </div>

            </div>

          </div>

          {/* ================= RIGHT ================= */}
          <div className="
            grid
            grid-cols-2
            gap-6
          ">

            {/* BIG IMAGE */}
            <div className="
              row-span-2
              rounded-3xl
              overflow-hidden
              bg-white
              border
              border-gray-200
              p-4
            ">

              <img
                src={
                  section?.left_image
                }
                className="
                  w-full
                  h-[500px]
                  object-cover
                  rounded-2xl
                "
              />

              <input
                value={
                  section?.left_image || ""
                }
                onChange={(e) =>
                  setSection({
                    ...section,
                    left_image:
                      e.target.value,
                  })
                }
                className="
                  mt-4
                  w-full
                  h-[52px]
                  rounded-2xl
                  border
                  border-gray-200
                  px-5
                  text-black
                  outline-none
                "
              />

            </div>

            {/* TOP RIGHT */}
            <div className="
              rounded-3xl
              overflow-hidden
              bg-white
              border
              border-gray-200
              p-4
            ">

              <img
                src={
                  section?.top_right_image
                }
                className="
                  w-full
                  h-[220px]
                  object-cover
                  rounded-2xl
                "
              />

              <input
                value={
                  section?.top_right_image || ""
                }
                onChange={(e) =>
                  setSection({
                    ...section,
                    top_right_image:
                      e.target.value,
                  })
                }
                className="
                  mt-4
                  w-full
                  h-[52px]
                  rounded-2xl
                  border
                  border-gray-200
                  px-5
                  text-black
                  outline-none
                "
              />

            </div>

            {/* BOTTOM RIGHT */}
            <div className="
              rounded-3xl
              overflow-hidden
              bg-white
              border
              border-gray-200
              p-4
            ">

              <img
                src={
                  section?.bottom_right_image
                }
                className="
                  w-full
                  h-[220px]
                  object-cover
                  rounded-2xl
                "
              />

              <input
                value={
                  section?.bottom_right_image || ""
                }
                onChange={(e) =>
                  setSection({
                    ...section,
                    bottom_right_image:
                      e.target.value,
                  })
                }
                className="
                  mt-4
                  w-full
                  h-[52px]
                  rounded-2xl
                  border
                  border-gray-200
                  px-5
                  text-black
                  outline-none
                "
              />

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}