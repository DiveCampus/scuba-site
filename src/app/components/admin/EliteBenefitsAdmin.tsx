"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {

  Save,

  Check,

} from "lucide-react";

import {

  getEliteBenefitsSection,

  updateEliteBenefitsSection,

  getEliteBenefitsPoints,

  updateEliteBenefitsPoint,

} from "@/services/EliteBenefitsService";

/* =========================================
   ADMIN
========================================= */

export default function EliteBenefitsAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [points, setPoints] =
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
        await getEliteBenefitsSection();

      const { data: pointsData } =
        await getEliteBenefitsPoints();

      setSection(sectionData);

      setPoints(pointsData || []);

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

    await updateEliteBenefitsSection(
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
        bg-[#03121c]
        text-white
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
              text-cyan-400
              mb-3
            ">

              ADMIN PANEL

            </p>

            <h2 className="
              text-4xl
              font-bold
            ">

              Elite Benefits

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
                : "Save"
            }

          </button>

        </div>

        {/* MAIN */}
        <div className="
          grid
          lg:grid-cols-2
          gap-20
          items-center
        ">

          {/* IMAGE */}
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="
              rounded-3xl
              overflow-hidden
              shadow-[0_20px_80px_rgba(0,0,0,0.5)]
            "
          >

            <img
              src={
                section?.image_url
              }
              className="
                w-full
                h-full
                object-cover
              "
            />

          </motion.div>

          {/* CONTENT */}
          <div>

            {/* LABEL */}
            <input
              value={
                section?.label || ""
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  label:
                    e.target.value,
                })
              }
              className="
                w-full
                h-[52px]
                rounded-2xl
                bg-white/5
                border
                border-white/10
                px-5
                text-cyan-400
                text-[10px]
                tracking-[4px]
                outline-none
                mb-5
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
                  bg-white/5
                  border
                  border-white/10
                  px-6
                  text-3xl
                  font-bold
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
                  bg-cyan-400/10
                  border
                  border-cyan-400/20
                  px-6
                  text-3xl
                  font-bold
                  text-cyan-400
                  outline-none
                "
              />

            </div>

            {/* DESC */}
            <textarea
              rows={5}
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
                bg-white/5
                border
                border-white/10
                p-6
                text-white/70
                outline-none
                resize-none
                mb-12
              "
            />

            {/* IMAGE URL */}
            <input
              value={
                section?.image_url || ""
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  image_url:
                    e.target.value,
                })
              }
              className="
                w-full
                h-[56px]
                rounded-2xl
                bg-white/5
                border
                border-white/10
                px-5
                text-white
                outline-none
                mb-10
              "
              placeholder="Image URL"
            />

            {/* POINTS */}
            <div className="
              space-y-6
            ">

              {points.map((item, i) => (

                <motion.div
                  key={item.id}
                  whileHover={{
                    y: -3,
                  }}
                  className="
                    flex
                    gap-5
                    border-b
                    border-white/10
                    pb-7
                  "
                >

                  {/* ICON */}
                  <div className="
                    mt-1
                  ">

                    <div className="
                      w-7
                      h-7
                      flex
                      items-center
                      justify-center
                      rounded-full
                      bg-cyan-400/10
                      text-cyan-400
                    ">

                      <Check size={14} />

                    </div>

                  </div>

                  {/* INPUTS */}
                  <div className="
                    flex-1
                  ">

                    <input
                      value={
                        item.title
                      }
                      onChange={(e) => {

                        const updated =
                          [...points];

                        updated[i].title =
                          e.target.value;

                        setPoints(updated);

                        updateEliteBenefitsPoint(
                          item.id,
                          updated[i]
                        );

                      }}
                      className="
                        w-full
                        h-[52px]
                        rounded-2xl
                        bg-white/5
                        border
                        border-white/10
                        px-5
                        text-white
                        font-semibold
                        outline-none
                        mb-4
                      "
                    />

                    <textarea
                      rows={4}
                      value={
                        item.description
                      }
                      onChange={(e) => {

                        const updated =
                          [...points];

                        updated[
                          i
                        ].description =
                          e.target.value;

                        setPoints(updated);

                        updateEliteBenefitsPoint(
                          item.id,
                          updated[i]
                        );

                      }}
                      className="
                        w-full
                        rounded-2xl
                        bg-white/5
                        border
                        border-white/10
                        p-5
                        text-white/70
                        outline-none
                        resize-none
                      "
                    />

                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}