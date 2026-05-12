// =========================================
// RescueComparisonAdmin.tsx
// ADMIN UI
// =========================================

"use client";

import {

  useEffect,

  useState,

} from "react";

import {

  Save,

} from "lucide-react";

import {

  getEliteRescueComparison,

  updateEliteRescueComparisonSection,

  updateEliteRescueComparisonRow,

} from "@/services/EliteRescueComparisonService";

export default function RescueComparisonAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [rows, setRows] =
    useState<any[]>([]);

  const [saving, setSaving] =
    useState(false);

  /* =========================================
     LOAD DATA
  ========================================= */

  useEffect(() => {

    const load =
      async () => {

        const {

          section,

          rows,

        } =
          await getEliteRescueComparison();

        setSection(section);

        setRows(rows || []);

      };

    load();

  }, []);

  if (!section)
    return null;

  /* =========================================
     SAVE SECTION
  ========================================= */

  const handleSaveSection =
    async () => {

      try {

        setSaving(true);

        await updateEliteRescueComparisonSection(

          section.id,

          section

        );

        alert(
          "Section Updated"
        );

      } catch (err) {

        console.error(err);

      } finally {

        setSaving(false);

      }

    };

  /* =========================================
     SAVE ROW
  ========================================= */

  const handleSaveRow =
    async (
      row: any
    ) => {

      try {

        await updateEliteRescueComparisonRow(

          row.id,

          row

        );

        alert(
          "Row Updated"
        );

      } catch (err) {

        console.error(err);

      }

    };

  return (

    <section className="
      min-h-screen
      bg-[#02131d]
      text-white
      py-20
      px-6
    ">

      <div className="
        max-w-7xl
        mx-auto
      ">

        {/* HEADER */}
        <div className="
          flex
          items-center
          justify-between
          mb-16
        ">

          <div>

            <p className="
              text-cyan-400
              tracking-[4px]
              text-[10px]
              mb-4
            ">

              ADMIN PANEL

            </p>

            <h2 className="
              text-4xl
              font-semibold
            ">

              Rescue Comparison

            </h2>

          </div>

          <button

            onClick={
              handleSaveSection
            }

            className="
              h-[56px]
              px-8
              rounded-2xl
              bg-cyan-500
              hover:bg-cyan-400
              transition
              flex
              items-center
              gap-3
              font-semibold
            "

          >

            <Save size={18} />

            {

              saving
                ? "Saving..."
                : "Save Section"

            }

          </button>

        </div>

        {/* SECTION FORM */}
        <div className="
          grid
          md:grid-cols-2
          gap-6
          mb-20
        ">

          {Object.keys(section).map(

            (key) => {

              if (

                key === "id" ||

                key === "created_at" ||

                key === "updated_at"

              ) {

                return null;

              }

              return (

                <div

                  key={key}

                  className="
                    flex
                    flex-col
                    gap-2
                  "

                >

                  <label className="
                    text-sm
                    uppercase
                    tracking-[2px]
                    text-white/60
                  ">

                    {key}

                  </label>

                  <input

                    value={
                      section[key] || ""
                    }

                    onChange={(e) =>
                      setSection({

                        ...section,

                        [key]:
                          e.target.value,

                      })
                    }

                    className="
                      h-[56px]
                      rounded-2xl
                      bg-white/5
                      border
                      border-white/10
                      px-5
                      outline-none
                    "

                  />

                </div>

              );

            }

          )}

        </div>

        {/* ROWS */}
        <div className="
          grid
          md:grid-cols-2
          gap-8
        ">

          {rows.map(

            (
              row,
              i
            ) => (

              <div

                key={row.id}

                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-7
                "

              >

                {/* LABEL */}
                <input

                  value={
                    row.label || ""
                  }

                  onChange={(e) => {

                    const updated =
                      [...rows];

                    updated[i].label =
                      e.target.value;

                    setRows(updated);

                  }}

                  placeholder="Label"

                  className="
                    w-full
                    h-[52px]
                    rounded-2xl
                    bg-black/20
                    border
                    border-white/10
                    px-5
                    outline-none
                    mb-5
                  "

                />

                {/* OTHER */}
                <input

                  value={
                    row.other_text || ""
                  }

                  onChange={(e) => {

                    const updated =
                      [...rows];

                    updated[
                      i
                    ].other_text =
                      e.target.value;

                    setRows(updated);

                  }}

                  placeholder="Other Text"

                  className="
                    w-full
                    h-[52px]
                    rounded-2xl
                    bg-black/20
                    border
                    border-white/10
                    px-5
                    outline-none
                    mb-5
                  "

                />

                {/* NEMO */}
                <input

                  value={
                    row.nemo_text || ""
                  }

                  onChange={(e) => {

                    const updated =
                      [...rows];

                    updated[
                      i
                    ].nemo_text =
                      e.target.value;

                    setRows(updated);

                  }}

                  placeholder="Nemo Text"

                  className="
                    w-full
                    h-[52px]
                    rounded-2xl
                    bg-black/20
                    border
                    border-white/10
                    px-5
                    outline-none
                    mb-5
                  "

                />

                {/* SAVE */}
                <button

                  onClick={() =>
                    handleSaveRow(
                      row
                    )
                  }

                  className="
                    w-full
                    h-[52px]
                    rounded-2xl
                    bg-cyan-500
                    hover:bg-cyan-400
                    transition
                    font-semibold
                  "

                >

                  Update Row

                </button>

              </div>

            )

          )}

        </div>

      </div>

    </section>

  );

}