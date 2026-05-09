"use client";

import { useEffect, useState } from "react";

import {

  Save,

} from "lucide-react";

import {

  getTrainingComparisonSection,

  updateTrainingComparisonSection,

  getTrainingComparisonRows,

  updateTrainingComparisonRow,

} from "@/services/TrainingComparisonService";

/* =========================================
   ADMIN
========================================= */

export default function TrainingComparisonAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [rows, setRows] =
    useState<any[]>([]);

  const [saving, setSaving] =
    useState(false);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const fetchData = async () => {

      const { data: sectionData } =
        await getTrainingComparisonSection();

      const { data: rowsData } =
        await getTrainingComparisonRows();

      setSection(sectionData);

      setRows(rowsData || []);

    };

    fetchData();

  }, []);

  /* =========================================
     SAVE
  ========================================= */

  const handleSave = async () => {

    if (!section?.id) return;

    setSaving(true);

    await updateTrainingComparisonSection(
      section.id,
      section
    );

    setSaving(false);

  };

  if (!section) return null;

  return (

    <section
      className="
        relative
        py-36
        overflow-hidden
        bg-[#02131d]
        text-white
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* GLOW */}
      <div className="
        absolute
        top-0
        left-[-250px]
        w-[650px]
        h-[650px]
        bg-cyan-500/10
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
              text-cyan-400
              tracking-[4px]
              text-[10px]
              mb-3
            ">

              ADMIN PANEL

            </p>

            <h2 className="
              text-4xl
              font-bold
            ">

              Training Comparison

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
          max-w-5xl
          mx-auto
          mb-24
        ">

          {/* TITLE */}
          <div className="
            grid
            md:grid-cols-2
            gap-5
            mb-8
          ">

            <textarea
              rows={2}
              value={
                section.title
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  title:
                    e.target.value,
                })
              }
              className="
                rounded-[28px]
                bg-white/5
                border
                border-white/10
                p-6
                text-5xl
                font-bold
                text-white
                text-center
                outline-none
                resize-none
              "
            />

            <textarea
              rows={2}
              value={
                section.highlighted_title
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  highlighted_title:
                    e.target.value,
                })
              }
              className="
                rounded-[28px]
                bg-cyan-400/10
                border
                border-cyan-400/20
                p-6
                text-5xl
                font-bold
                text-cyan-400
                text-center
                outline-none
                resize-none
              "
            />

          </div>

          {/* DESC */}
          <textarea
            rows={4}
            value={
              section.description
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
              rounded-[30px]
              bg-white/5
              border
              border-white/10
              p-8
              text-center
              text-white/60
              leading-[2]
              outline-none
              resize-none
              mb-10
            "
          />

        </div>

        {/* TABLE */}
        <div className="
          rounded-[34px]
          overflow-hidden
          border
          border-white/10
          bg-white/[0.03]
        ">

          {/* HEAD */}
          <div className="
            grid
            grid-cols-3
            border-b
            border-white/10
            bg-white/[0.02]
          ">

            <div className="
              p-8
              text-[10px]
              tracking-[4px]
              text-white/35
            ">

              PROTOCOL METRIC

            </div>

            <input
              value={
                section.left_heading
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  left_heading:
                    e.target.value,
                })
              }
              className="
                bg-transparent
                text-center
                text-white/40
                tracking-[4px]
                text-[10px]
                outline-none
              "
            />

            <input
              value={
                section.right_heading
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  right_heading:
                    e.target.value,
                })
              }
              className="
                bg-transparent
                text-center
                text-cyan-400
                tracking-[4px]
                text-[10px]
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
                items-center
                border-b
                border-white/10
                last:border-none
              "
            >

              {/* TITLE */}
              <input
                value={row.title}
                onChange={(e) => {

                  const updated =
                    [...rows];

                  updated[i].title =
                    e.target.value;

                  setRows(updated);

                  updateTrainingComparisonRow(
                    row.id,
                    updated[i]
                  );

                }}
                className="
                  bg-transparent
                  p-8
                  text-white
                  outline-none
                "
              />

              {/* STANDARD */}
              <input
                value={
                  row.standard_value
                }
                onChange={(e) => {

                  const updated =
                    [...rows];

                  updated[
                    i
                  ].standard_value =
                    e.target.value;

                  setRows(updated);

                  updateTrainingComparisonRow(
                    row.id,
                    updated[i]
                  );

                }}
                className="
                  bg-transparent
                  text-center
                  text-red-400
                  outline-none
                "
              />

              {/* PREMIUM */}
              <input
                value={
                  row.premium_value
                }
                onChange={(e) => {

                  const updated =
                    [...rows];

                  updated[
                    i
                  ].premium_value =
                    e.target.value;

                  setRows(updated);

                  updateTrainingComparisonRow(
                    row.id,
                    updated[i]
                  );

                }}
                className="
                  bg-transparent
                  text-center
                  text-cyan-300
                  outline-none
                "
              />

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}