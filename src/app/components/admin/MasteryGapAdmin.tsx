"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Check,
  X,
  Save,
} from "lucide-react";

import {

  getMasteryGapSection,

  updateMasteryGapSection,

  getMasteryGapRows,

  updateMasteryGapRow,

} from "@/services/MasteryGapService";

export default function MasteryGapAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [rows, setRows] =
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
        await getMasteryGapSection();

      const { data: rowsData } =
        await getMasteryGapRows();

      setSection(sectionData);

      setRows(rowsData || []);

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

    await updateMasteryGapSection(
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
        bg-[#02131d]
        text-white
      ">

        Loading...

      </div>

    );

  }

  return (

    <section
      className="
        relative
        py-36
        bg-[#02131d]
        text-white
        overflow-hidden
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* GLOW */}
      <div className="
        absolute
        top-20
        left-20
        w-72
        h-72
        bg-cyan-400/10
        blur-[120px]
        rounded-full
      " />

      <div className="
        absolute
        bottom-20
        right-20
        w-72
        h-72
        bg-blue-500/10
        blur-[120px]
        rounded-full
      " />

      <div className="
        relative
        max-w-6xl
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
              text-3xl
              md:text-5xl
              font-bold
            ">
              Mastery Gap
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
              bg-cyan-400
              text-black
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

        {/* SECTION FORM */}
        <div className="
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
          mb-16
          space-y-6
        ">

          <div className="
            grid
            md:grid-cols-2
            gap-6
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
                h-[58px]
                rounded-2xl
                bg-white/5
                border
                border-white/10
                px-5
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
                h-[58px]
                rounded-2xl
                bg-white/5
                border
                border-white/10
                px-5
                text-cyan-400
                outline-none
              "
            />

          </div>

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
              p-5
              text-white
              outline-none
              resize-none
            "
          />

        </div>

        {/* TABLE */}
        <div className="
          rounded-3xl
          border
          border-white/10
          overflow-hidden
          bg-white/5
          backdrop-blur-xl
        ">

          {/* HEAD */}
          <div className="
            grid
            grid-cols-3
            border-b
            border-white/10
          ">

            <input
              value={
                section?.table_heading_1 || ""
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  table_heading_1:
                    e.target.value,
                })
              }
              className="
                h-[70px]
                bg-transparent
                border-r
                border-white/10
                px-6
                text-white/60
                text-[10px]
                tracking-[3px]
                outline-none
              "
            />

            <input
              value={
                section?.table_heading_2 || ""
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  table_heading_2:
                    e.target.value,
                })
              }
              className="
                h-[70px]
                bg-transparent
                border-r
                border-white/10
                px-6
                text-center
                text-white/60
                text-[10px]
                tracking-[3px]
                outline-none
              "
            />

            <input
              value={
                section?.table_heading_3 || ""
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  table_heading_3:
                    e.target.value,
                })
              }
              className="
                h-[70px]
                bg-transparent
                px-6
                text-center
                text-cyan-400
                text-[10px]
                tracking-[3px]
                outline-none
              "
            />

          </div>

          {/* ROWS */}
          {rows.map((row, i) => (

            <div
              key={row.id}
              className="
                grid
                grid-cols-3
                border-b
                border-white/10
                last:border-none
              "
            >

              {/* TITLE */}
              <div className="
                p-5
                border-r
                border-white/10
              ">

                <input
                  value={
                    row.title
                  }
                  onChange={(e) => {

                    const updated =
                      [...rows];

                    updated[i].title =
                      e.target.value;

                    setRows(updated);

                    updateMasteryGapRow(
                      row.id,
                      updated[i]
                    );

                  }}
                  className="
                    w-full
                    h-[50px]
                    rounded-xl
                    bg-white/5
                    border
                    border-white/10
                    px-4
                    text-white
                    outline-none
                  "
                />

              </div>

              {/* STANDARD */}
              <div className="
                p-5
                border-r
                border-white/10
                flex
                items-center
                gap-3
              ">

                <X
                  size={16}
                  className="
                    text-red-400
                    shrink-0
                  "
                />

                <input
                  value={
                    row.standard_text
                  }
                  onChange={(e) => {

                    const updated =
                      [...rows];

                    updated[
                      i
                    ].standard_text =
                      e.target.value;

                    setRows(updated);

                    updateMasteryGapRow(
                      row.id,
                      updated[i]
                    );

                  }}
                  className="
                    flex-1
                    h-[50px]
                    rounded-xl
                    bg-white/5
                    border
                    border-white/10
                    px-4
                    text-red-300
                    outline-none
                  "
                />

              </div>

              {/* NEMO */}
              <div className="
                p-5
                flex
                items-center
                gap-3
              ">

                <Check
                  size={16}
                  className="
                    text-cyan-400
                    shrink-0
                  "
                />

                <input
                  value={
                    row.nemo_text
                  }
                  onChange={(e) => {

                    const updated =
                      [...rows];

                    updated[
                      i
                    ].nemo_text =
                      e.target.value;

                    setRows(updated);

                    updateMasteryGapRow(
                      row.id,
                      updated[i]
                    );

                  }}
                  className="
                    flex-1
                    h-[50px]
                    rounded-xl
                    bg-cyan-400/5
                    border
                    border-cyan-400/20
                    px-4
                    text-cyan-300
                    outline-none
                  "
                />

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}