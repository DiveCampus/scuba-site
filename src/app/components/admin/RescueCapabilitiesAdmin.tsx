// =========================================
// RescueCapabilitiesAdmin.tsx
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

  getRescueCapabilities,

  updateRescueCapabilitiesSection,

  updateRescueCapabilitiesCard,

} from "@/services/RescueCapabilitiesService";

export default function RescueCapabilitiesAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [cards, setCards] =
    useState<any[]>([]);

  const [saving, setSaving] =
    useState(false);

  /* =========================================
     LOAD
  ========================================= */

  useEffect(() => {

    const load =
      async () => {

        const {

          section,

          cards,

        } =
          await getRescueCapabilities();

        setSection(section);

        setCards(cards || []);

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

        await updateRescueCapabilitiesSection(

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
     SAVE CARD
  ========================================= */

  const handleSaveCard =
    async (
      card: any
    ) => {

      try {

        await updateRescueCapabilitiesCard(

          card.id,

          card

        );

        alert(
          "Card Updated"
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

              Rescue Capabilities

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

        {/* CARDS */}
        <div className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        ">

          {cards.map(

            (
              card,
              i
            ) => (

              <div

                key={card.id}

                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-7
                "

              >

                {/* ICON */}
                <input

                  value={
                    card.icon || ""
                  }

                  onChange={(e) => {

                    const updated =
                      [...cards];

                    updated[i].icon =
                      e.target.value;

                    setCards(updated);

                  }}

                  placeholder="Icon"

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

                {/* TITLE */}
                <input

                  value={
                    card.title || ""
                  }

                  onChange={(e) => {

                    const updated =
                      [...cards];

                    updated[i].title =
                      e.target.value;

                    setCards(updated);

                  }}

                  placeholder="Title"

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

                {/* TAG */}
                <input

                  value={
                    card.tag || ""
                  }

                  onChange={(e) => {

                    const updated =
                      [...cards];

                    updated[i].tag =
                      e.target.value;

                    setCards(updated);

                  }}

                  placeholder="Tag"

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

                {/* DESCRIPTION */}
                <textarea

                  rows={5}

                  value={
                    card.description || ""
                  }

                  onChange={(e) => {

                    const updated =
                      [...cards];

                    updated[
                      i
                    ].description =
                      e.target.value;

                    setCards(updated);

                  }}

                  placeholder="Description"

                  className="
                    w-full
                    rounded-2xl
                    bg-black/20
                    border
                    border-white/10
                    p-5
                    outline-none
                    resize-none
                    mb-5
                  "

                />

                {/* SAVE */}
                <button

                  onClick={() =>
                    handleSaveCard(
                      card
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