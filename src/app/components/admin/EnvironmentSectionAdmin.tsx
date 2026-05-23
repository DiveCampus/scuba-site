// =========================================
// EnvironmentSectionAdmin.tsx
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

  getEnvironmentShowcase,

  updateEnvironmentShowcaseSection,

  updateEnvironmentShowcaseCard,

  updateEnvironmentShowcaseFooterGroup,

  updateEnvironmentShowcaseFooterLink,

} from "@/services/EnvironmentShowcaseService";

export default function EnvironmentSectionAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [cards, setCards] =
    useState<any[]>([]);

  const [groups, setGroups] =
    useState<any[]>([]);

  const [links, setLinks] =
    useState<any[]>([]);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const load =
      async () => {

        const {

          section,

          cards,

          footerGroups,

          footerLinks,

        } = await getEnvironmentShowcase();

        setSection(section);

        setCards(cards || []);

        setGroups(
          footerGroups || []
        );

        setLinks(
          footerLinks || []
        );

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

      await updateEnvironmentShowcaseSection(
        section.id,
        section
      );

      alert(
        "Saved Successfully"
      );

    };

  return (

    <section className="min-h-screen bg-[#02131d] text-white py-20 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-14">

          <div>

            <p className="text-cyan-400 tracking-[4px] text-[10px] mb-4">

              ADMIN PANEL

            </p>

            <h2 className="text-4xl font-semibold">

              Environment Section

            </h2>

          </div>

          <button
            onClick={
              handleSaveSection
            }
            className="h-[56px] px-7 rounded-2xl bg-cyan-500 flex items-center gap-3 font-semibold"
          >

            <Save size={18} />

            Save Changes

          </button>

        </div>

        {/* SECTION */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">

          <input
            value={section.title}
            onChange={(e) =>
              setSection({
                ...section,
                title:
                  e.target.value,
              })
            }
            placeholder="Title"
            className="h-[58px] rounded-2xl bg-white/5 border border-white/10 px-5 outline-none"
          />

          <input
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
            placeholder="Highlighted Title"
            className="h-[58px] rounded-2xl bg-cyan-500/10 border border-cyan-400/20 px-5 outline-none text-cyan-400"
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
            placeholder="Description"
            className="md:col-span-2 rounded-2xl bg-white/5 border border-white/10 p-5 outline-none"
          />

        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">

          {cards.map(
            (card, i) => (

              <div
                key={card.id}
                className="bg-white/5 border border-white/10 rounded-3xl p-8"
              >

                <input
                  value={card.label}
                  onChange={(
                    e
                  ) => {

                    const updated =
                      [...cards];

                    updated[i].label =
                      e.target.value;

                    setCards(
                      updated
                    );

                  }}
                  placeholder="Label"
                  className="w-full h-[54px] rounded-2xl bg-black/20 border border-white/10 px-5 outline-none mb-5"
                />

                <input
                  value={card.title}
                  onChange={(
                    e
                  ) => {

                    const updated =
                      [...cards];

                    updated[i].title =
                      e.target.value;

                    setCards(
                      updated
                    );

                  }}
                  placeholder="Title"
                  className="w-full h-[54px] rounded-2xl bg-black/20 border border-white/10 px-5 outline-none mb-5"
                />

                <textarea
                  rows={4}
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

                  }}
                  placeholder="Description"
                  className="w-full rounded-2xl bg-black/20 border border-white/10 p-5 outline-none mb-5"
                />

                {/* FEATURES */}
                {card.features?.map(
                  (
                    feature: string,
                    idx: number
                  ) => (

                    <input
                      key={idx}
                      value={feature}
                      onChange={(
                        e
                      ) => {

                        const updated =
                          [...cards];

                        updated[
                          i
                        ].features[
                          idx
                        ] =
                          e.target.value;

                        setCards(
                          updated
                        );

                      }}
                      className="w-full h-[50px] rounded-2xl bg-black/20 border border-white/10 px-5 outline-none mb-4"
                    />

                  )
                )}

                <button
                  onClick={
                    async () => {

                      await updateEnvironmentShowcaseCard(
                        card.id,
                        card
                      );

                      alert(
                        "Card Updated"
                      );

                    }
                  }
                  className="mt-4 h-[52px] px-6 rounded-2xl bg-cyan-500 font-semibold"
                >

                  Update Card

                </button>

              </div>

            )
          )}

        </div>

      </div>

    </section>

  );
}