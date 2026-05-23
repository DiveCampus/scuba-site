"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { Save } from "lucide-react";

import {

  getChooseEnvironmentSection,

  updateChooseEnvironmentSection,

  getChooseEnvironmentCards,

  updateChooseEnvironmentCard,

} from "@/services/ChooseEnvironmentService";

/* =========================================
   COMPONENT
========================================= */

export default function ChooseEnvironmentAdmin() {

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

      const { data: sectionData } = await getChooseEnvironmentSection();

      const { data: cardsData } = await getChooseEnvironmentCards();

      setSection(sectionData);

      setCards(cardsData || []);

      setLoading(false);

    };

    fetchData();

  }, []);

  /* =========================================
     SAVE SECTION
  ========================================= */

  const handleSave = async () => {

    if (!section?.id) return;

    setSaving(true);

    await updateChooseEnvironmentSection(
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

      <div className="min-h-screen flex items-center justify-center bg-[#03121c] text-white">

        Loading...

      </div>

    );

  }

  return (

    <section
      className="relative py-36 bg-[#03121c] text-white overflow-hidden"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#061a28] via-[#03121c] to-black" />

      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center justify-between flex-wrap gap-5 mb-20">

          <div>

            <p className="text-[10px] tracking-[4px] text-cyan-400 mb-3">
              ADMIN PANEL
            </p>

            <h2 className="text-3xl md:text-5xl font-bold">
              Choose Environment
            </h2>

          </div>

          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            onClick={handleSave}
            className="h-[56px] px-7 rounded-2xl bg-cyan-400 text-black font-semibold flex items-center gap-3"
          >

            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save"}

          </motion.button>

        </div>

        {/* ================= HEADER FORM ================= */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-20 space-y-6">

          {/* TITLE */}
          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="text-[10px] tracking-[3px] uppercase text-white/45">
                Title
              </label>

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
                className="mt-3 w-full h-[58px] rounded-2xl bg-white/5 border border-white/10 px-5 text-white outline-none"
              />

            </div>

            <div>

              <label className="text-[10px] tracking-[3px] uppercase text-white/45">
                Highlighted Title
              </label>

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
                className="mt-3 w-full h-[58px] rounded-2xl bg-white/5 border border-white/10 px-5 text-cyan-300 outline-none"
              />

            </div>

          </div>

          {/* DESCRIPTION */}
          <div>

            <label className="text-[10px] tracking-[3px] uppercase text-white/45">
              Description
            </label>

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
              className="mt-3 w-full rounded-2xl bg-white/5 border border-white/10 p-5 text-white outline-none resize-none"
            />

          </div>

        </div>

        {/* ================= CARDS ================= */}
        <div className="grid md:grid-cols-2 gap-9">

          {cards.map(
            (card, i) => (

              <motion.div
                key={card.id}
                whileHover={{
                  y: -6,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="relative p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] space-y-6"
              >

                {/* TOP LABEL */}
                <div>

                  <label className="text-[10px] tracking-[3px] uppercase text-white/45">
                    Top Label
                  </label>

                  <input
                    value={
                      card.top_label
                    }
                    onChange={(
                      e
                    ) => {

                      const updated =
                        [...cards];

                      updated[
                        i
                      ].top_label =
                        e.target.value;

                      setCards(
                        updated
                      );

                      updateChooseEnvironmentCard(
                        card.id,
                        updated[i]
                      );

                    }}
                    className="mt-3 w-full h-[56px] rounded-2xl bg-white/5 border border-white/10 px-5 text-cyan-300 outline-none"
                  />

                </div>

                {/* TITLE */}
                <div>

                  <label className="text-[10px] tracking-[3px] uppercase text-white/45">
                    Card Title
                  </label>

                  <input
                    value={
                      card.title
                    }
                    onChange={(
                      e
                    ) => {

                      const updated =
                        [...cards];

                      updated[
                        i
                      ].title =
                        e.target.value;

                      setCards(
                        updated
                      );

                      updateChooseEnvironmentCard(
                        card.id,
                        updated[i]
                      );

                    }}
                    className="mt-3 w-full h-[58px] rounded-2xl bg-white/5 border border-white/10 px-5 text-white text-xl font-semibold outline-none"
                  />

                </div>

                {/* DESCRIPTION */}
                <div>

                  <label className="text-[10px] tracking-[3px] uppercase text-white/45">
                    Description
                  </label>

                  <textarea
                    rows={5}
                    value={
                      card.description
                    }
                    onChange={(
                      e
                    ) => {

                      const updated =
                        [...cards];

                      updated[
                        i
                      ].description =
                        e.target.value;

                      setCards(
                        updated
                      );

                      updateChooseEnvironmentCard(
                        card.id,
                        updated[i]
                      );

                    }}
                    className="mt-3 w-full rounded-2xl bg-white/5 border border-white/10 p-5 text-white outline-none resize-none"
                  />

                </div>

                {/* FEATURES */}
                <div className="space-y-5">

                  {[1, 2, 3].map(
                    (num) => (

                      <div
                        key={num}
                        className="flex items-center gap-4"
                      >

                        <span className="w-2 h-2 bg-cyan-400 rounded-full shrink-0" />

                        <input
                          value={
                            card[
                              `feature_${num}`
                            ]
                          }
                          onChange={(
                            e
                          ) => {

                            const updated =
                              [...cards];

                            updated[
                              i
                            ][
                              `feature_${num}`
                            ] =
                              e.target.value;

                            setCards(
                              updated
                            );

                            updateChooseEnvironmentCard(
                              card.id,
                              updated[i]
                            );

                          }}
                          className="flex-1 h-[50px] rounded-2xl bg-white/5 border border-white/10 px-5 text-white outline-none tracking-[0.45px]"
                        />

                      </div>

                    )
                  )}

                </div>

              </motion.div>

            )
          )}

        </div>

      </div>

    </section>
  );
}