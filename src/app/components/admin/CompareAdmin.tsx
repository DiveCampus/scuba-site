"use client";

import { useEffect, useState } from "react";

import {
  Check,
  X,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  getCompare,
  updateCompareSection,
  updateCompareItem,
} from "@/services/compareService";

export default function CompareAdmin() {
  const [section, setSection] =
    useState<any>(null);

  const [items, setItems] =
    useState<any[]>([]);

  const [editing, setEditing] =
    useState<string | null>(null);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const {
      section,
      items,
    } = await getCompare();

    setSection(section);

    setItems(items || []);
  };

  const handleSave = async () => {
    setSaving(true);

    await updateCompareSection(
      section
    );

    for (const item of items) {
      await updateCompareItem(
        item
      );
    }

    setSaving(false);

    setEditing(null);
  };

  if (!section) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#02131d] text-white">
        Loading...
      </div>
    );
  }

  return (
    <section className="relative py-32 bg-[#02131d] text-white overflow-hidden min-h-screen">

      {/* HEADER */}
      <div className="text-center mb-16 px-6">

        {/* TITLE */}
        {editing === "title" ? (
          <div className="max-w-4xl mx-auto">

            <input
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
                w-full
                text-center
                text-3xl
                md:text-5xl
                font-bold
                bg-white/10
                border
                border-cyan-400/30
                rounded-2xl
                px-6
                py-4
                outline-none
              "
            />

            <input
              value={
                section.highlight
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  highlight:
                    e.target.value,
                })
              }
              className="
                w-full
                mt-4
                text-center
                text-2xl
                md:text-4xl
                text-cyan-400
                font-bold
                bg-white/10
                border
                border-cyan-400/30
                rounded-2xl
                px-6
                py-4
                outline-none
              "
            />

            <textarea
              value={
                section.subtitle
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  subtitle:
                    e.target.value,
                })
              }
              className="
                w-full
                mt-4
                text-center
                bg-white/10
                border
                border-cyan-400/30
                rounded-2xl
                px-6
                py-4
                outline-none
                text-white/70
              "
            />

          </div>
        ) : (
          <motion.div
            whileHover={{
              scale: 1.01,
            }}
            onClick={() =>
              setEditing(
                "title"
              )
            }
            className="cursor-pointer"
          >

            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">

              {
                section.title
              }{" "}

              <span className="text-cyan-400">
                {
                  section.highlight
                }
              </span>

            </h2>

            <p className="text-white/60 max-w-2xl mx-auto">
              {
                section.subtitle
              }
            </p>

          </motion.div>
        )}

      </div>

      {/* TABLE */}
      <div className="max-w-6xl mx-auto px-6">

        <div className="rounded-3xl border border-white/10 overflow-hidden backdrop-blur-xl bg-white/5 shadow-[0_0_40px_rgba(0,255,255,0.06)]">

          {/* HEAD */}
          <div className="grid grid-cols-3 text-sm text-white/50 border-b border-white/10">

            <div className="p-5">
              FEATURE
            </div>

            <div className="p-5 text-center">
              OTHERS
            </div>

            <div className="p-5 text-center text-cyan-400 font-semibold">
              DIVE CAMPUS
            </div>

          </div>

          {/* ROWS */}
          {items.map(
            (row, i) => {
              const isEditing =
                editing ===
                row.id;

              return (
                <motion.div
                  key={row.id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      i * 0.05,
                  }}
                  whileHover={{
                    backgroundColor:
                      "rgba(255,255,255,0.03)",
                  }}
                  onClick={() =>
                    setEditing(
                      row.id
                    )
                  }
                  className={`
                    grid
                    grid-cols-3
                    border-b
                    border-white/10
                    last:border-none
                    cursor-pointer
                    transition

                    ${
                      isEditing
                        ? "bg-cyan-400/5"
                        : ""
                    }
                  `}
                >

                  {/* FEATURE */}
                  <div className="p-5 text-white/80">

                    {isEditing ? (
                      <input
                        value={
                          row.feature
                        }
                        onChange={(
                          e
                        ) => {
                          const updated =
                            [
                              ...items,
                            ];

                          updated[
                            i
                          ].feature =
                            e.target.value;

                          setItems(
                            updated
                          );
                        }}
                        className="
                          w-full
                          bg-white/10
                          border
                          border-cyan-400/30
                          rounded-xl
                          px-4
                          py-3
                          outline-none
                        "
                      />
                    ) : (
                      row.feature
                    )}

                  </div>

                  {/* OTHERS */}
                  <div className="p-5 flex items-center justify-center">

                    {isEditing ? (
                      <input
                        value={
                          row.others
                        }
                        onChange={(
                          e
                        ) => {
                          const updated =
                            [
                              ...items,
                            ];

                          updated[
                            i
                          ].others =
                            e.target.value;

                          setItems(
                            updated
                          );
                        }}
                        className="
                          w-full
                          bg-white/10
                          border
                          border-red-400/30
                          rounded-xl
                          px-4
                          py-3
                          outline-none
                          text-red-400
                        "
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-red-400">

                        <X
                          size={
                            16
                          }
                        />

                        {
                          row.others
                        }

                      </div>
                    )}

                  </div>

                  {/* DIVE CAMPUS */}
                  <div className="p-5 flex items-center justify-center">

                    {isEditing ? (
                      <input
                        value={
                          row.nemo
                        }
                        onChange={(
                          e
                        ) => {
                          const updated =
                            [
                              ...items,
                            ];

                          updated[
                            i
                          ].nemo =
                            e.target.value;

                          setItems(
                            updated
                          );
                        }}
                        className="
                          w-full
                          bg-white/10
                          border
                          border-cyan-400/30
                          rounded-xl
                          px-4
                          py-3
                          outline-none
                          text-cyan-300
                        "
                      />
                    ) : (
                      <div className="flex items-center gap-2 px-5 py-2 rounded-xl border border-cyan-400/30 bg-cyan-400/5 text-cyan-300">

                        <Check
                          size={
                            16
                          }
                        />

                        {
                          row.nemo
                        }

                      </div>
                    )}

                  </div>

                </motion.div>
              );
            }
          )}

        </div>

      </div>

      {/* SAVE */}
      <div className="text-center mt-14">

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={handleSave}
          className="
            px-10
            py-4
            bg-cyan-400
            text-black
            rounded-full
            font-semibold
            shadow-[0_0_30px_rgba(0,255,255,0.25)]
          "
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </motion.button>

      </div>

    </section>
  );
}