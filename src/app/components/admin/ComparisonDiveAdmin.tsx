"use client";

import {

  useEffect,

  useState,

} from "react";

import {

  Save,

} from "lucide-react";

import {

  getComparisonDiveSection,

  updateComparisonDiveSection,

  getComparisonDiveRows,

  updateComparisonDiveRow,

} from "@/services/ComparisonDiveService";

/* =========================================
   ADMIN
========================================= */

export default function ComparisonDiveAdmin() {

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

    const fetchData =
      async () => {

        const sectionResponse = await getComparisonDiveSection();

        const rowsResponse = await getComparisonDiveRows();

        setSection(
          sectionResponse.data
        );

        setRows(
          rowsResponse.data || []
        );

      };

    fetchData();

  }, []);

  /* =========================================
     SAVE SECTION
  ========================================= */

  const handleSave =
    async () => {

      if (!section?.id)
        return;

      setSaving(true);

      await updateComparisonDiveSection(
        section.id,
        section
      );

      setSaving(false);

    };

  if (!section)
    return null;

  return (

    <section
      className="relative py-36 bg-[#02131d] text-white overflow-hidden"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* GLOW */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* TOP */}
        <div className="flex items-center justify-between mb-16 flex-wrap gap-5">

          <div>

            <p className="text-[10px] tracking-[4px] text-cyan-400 mb-3">

              ADMIN PANEL

            </p>

            <h2 className="text-4xl font-bold">

              Comparison Dive

            </h2>

          </div>

          <button
            onClick={handleSave}
            className="h-[56px] px-8 rounded-2xl bg-cyan-400 text-black font-semibold flex items-center gap-3"
          >

            <Save size={18} />

            {
              saving
                ? "Saving..."
                : "Save Changes"
            }

          </button>

        </div>

        {/* SECTION */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">

          <textarea
            rows={3}
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
            className="rounded-3xl bg-white/5 border border-white/10 p-5 outline-none resize-none text-white"
          />

          <textarea
            rows={3}
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
            className="rounded-3xl bg-white/5 border border-cyan-400/20 p-5 outline-none resize-none text-cyan-400"
          />

          <textarea
            rows={5}
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
            className="rounded-3xl bg-white/5 border border-white/10 p-5 outline-none resize-none text-white/70 md:col-span-2"
          />

        </div>

        {/* TABLE */}
        <div className="rounded-3xl border border-white/10 overflow-hidden backdrop-blur-xl bg-white/5">

          {/* HEAD */}
          <div className="grid grid-cols-3 border-b border-white/10">

            <div className="p-6 text-white/40 tracking-[3px] text-[10px]">

              FEATURE

            </div>

            <div className="p-6 text-center text-white/40 tracking-[3px] text-[10px]">

              {
                section.others_heading
              }

            </div>

            <div className="p-6 text-center text-cyan-400 tracking-[3px] text-[10px]">

              {
                section.nemo_heading
              }

            </div>

          </div>

          {/* ROWS */}
          {rows.map((row, i) => (

            <div
              key={row.id}
              className="grid grid-cols-3 border-b border-white/10 last:border-none"
            >

              {/* FEATURE */}
              <textarea
                rows={2}
                value={
                  row.feature
                }
                onChange={async (e) => {

                  const updated =
                    [...rows];

                  updated[
                    i
                  ].feature =
                    e.target.value;

                  setRows(updated);

                  await updateComparisonDiveRow(
                    row.id,
                    updated[i]
                  );

                }}
                className="bg-transparent p-6 outline-none resize-none text-white"
              />

              {/* OTHERS */}
              <textarea
                rows={2}
                value={
                  row.others_text
                }
                onChange={async (e) => {

                  const updated =
                    [...rows];

                  updated[
                    i
                  ].others_text =
                    e.target.value;

                  setRows(updated);

                  await updateComparisonDiveRow(
                    row.id,
                    updated[i]
                  );

                }}
                className="bg-transparent p-6 outline-none resize-none text-red-400 text-center"
              />

              {/* NEMO */}
              <textarea
                rows={2}
                value={
                  row.nemo_text
                }
                onChange={async (e) => {

                  const updated =
                    [...rows];

                  updated[
                    i
                  ].nemo_text =
                    e.target.value;

                  setRows(updated);

                  await updateComparisonDiveRow(
                    row.id,
                    updated[i]
                  );

                }}
                className="bg-transparent p-6 outline-none resize-none text-cyan-300 text-center"
              />

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}