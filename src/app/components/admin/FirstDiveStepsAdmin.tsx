"use client";

import {

  useEffect,
  useState,

} from "react";

import { motion } from "framer-motion";

import {

  Settings2,
  Waves,
  LifeBuoy,
  Save,

} from "lucide-react";

import {

  getFirstDiveSteps,
  updateFirstDiveStepsSection,
  updateFirstDiveStepsCard,

} from "@/services/FirstDiveStepsService";

/* =====================================
   ICON MAP
===================================== */

const iconMap: any = {

  Settings2:
    <Settings2 className="w-5 h-5" />,

  Waves:
    <Waves className="w-5 h-5" />,

  LifeBuoy:
    <LifeBuoy className="w-5 h-5" />,

};

export default function
FirstDiveStepsAdmin() {

  const [

    section,
    setSection,

  ] = useState<any>(null);

  const [

    cards,
    setCards,

  ] = useState<any[]>([]);

  const [

    saving,
    setSaving,

  ] = useState(false);

  /* =====================================
     LOAD DATA
  ===================================== */

  useEffect(() => {

    load();

  }, []);

  const load =
    async () => {

      const { section, cards } = await getFirstDiveSteps();

      setSection(
        section
      );

      setCards(
        cards || []
      );

    };

  /* =====================================
     UPDATE CARD
  ===================================== */

  const updateCard =
    (
      id: string,
      field: string,
      value: any
    ) => {

      setCards(
        prev =>
          prev.map(card =>
            card.id === id
              ? {
                  ...card,
                  [field]:
                    value,
                }
              : card
          )
      );

    };

  /* =====================================
     SAVE
  ===================================== */

  const handleSave =
    async () => {

      try {

        setSaving(
          true
        );

        /* SECTION */
        await updateFirstDiveStepsSection(

          section.id,

          section

        );

        /* CARDS */
        for (
          const card
          of cards
        ) {

          await updateFirstDiveStepsCard(

            card.id,

            card

          );

        }

        alert(
          "Saved Successfully ✅"
        );

      } catch (
        err
      ) {

        console.error(
          err
        );

      } finally {

        setSaving(
          false
        );

      }

    };

  if (
    !section
  )
    return null;

  return (

    <section
      className="relative py-20 bg-[#f4f7fa] overflow-hidden"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,194,255,0.04),transparent_45%)]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="text-center max-w-2xl mx-auto">

          {/* LABEL */}
          <input
            value={
              section.label
            }
            onChange={e =>
              setSection({

                ...section,

                label:
                  e.target
                    .value,

              })
            }
            className="bg-transparent text-center uppercase tracking-[4px] text-cyan-500 text-[11px] outline-none w-full mb-4"
          />

          {/* TITLE */}
          <textarea
            value={
              section.title
            }
            onChange={e =>
              setSection({

                ...section,

                title:
                  e.target
                    .value,

              })
            }
            rows={2}
            className="w-full bg-transparent text-center text-[26px] md:text-[44px] font-semibold text-[#0b1b2b] uppercase tracking-[2px] outline-none resize-none"
          />

          {/* DESCRIPTION */}
          <textarea
            value={
              section.description
            }
            onChange={e =>
              setSection({

                ...section,

                description:
                  e.target
                    .value,

              })
            }
            rows={2}
            className="mt-4 w-full bg-transparent text-center text-[#7b8794] text-[13px] outline-none resize-none"
          />

        </div>

        {/* =====================================
            CARDS
        ===================================== */}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">

          {cards.map(

            (
              item,
              i
            ) => (

              <motion.div
                key={
                  item.id
                }
                whileHover={{
                  y: -6,
                }}
                className="relative rounded-[24px] bg-white border border-[#edf1f5] shadow-[0_10px_30px_rgba(15,23,42,0.04)] px-7 py-10 text-center overflow-hidden"
              >

                {/* STEP */}
                <input
                  value={
                    item.step
                  }
                  onChange={e =>
                    updateCard(

                      item.id,

                      "step",

                      e.target
                        .value
                    )
                  }
                  className="bg-[#f4f7fa] rounded-full px-3 py-2 text-center text-[10px] tracking-[2px] uppercase mb-6 outline-none"
                />

                {/* ICON */}
                <div className="mx-auto w-14 h-14 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-500 mb-6">

                  {
                    iconMap[
                      item
                        .icon
                    ]
                  }

                </div>

                {/* ICON SELECT */}
                <select
                  value={
                    item.icon
                  }
                  onChange={e =>
                    updateCard(

                      item.id,

                      "icon",

                      e.target
                        .value
                    )
                  }
                  className="mb-5 px-4 py-2 rounded-xl border outline-none"
                >

                  <option>
                    Settings2
                  </option>

                  <option>
                    Waves
                  </option>

                  <option>
                    LifeBuoy
                  </option>

                </select>

                {/* TITLE */}
                <textarea
                  value={
                    item.title
                  }
                  onChange={e =>
                    updateCard(

                      item.id,

                      "title",

                      e.target
                        .value
                    )
                  }
                  className="w-full text-center text-[17px] font-semibold uppercase outline-none resize-none text-[#0b1b2b]"
                />

                {/* DESC */}
                <textarea
                  value={
                    item.description
                  }
                  onChange={e =>
                    updateCard(

                      item.id,

                      "description",

                      e.target
                        .value
                    )
                  }
                  rows={5}
                  className="mt-3 w-full text-center text-[12px] text-[#7b8794] outline-none resize-none"
                />

              </motion.div>
            )
          )}

        </div>

        {/* SAVE */}
        <div className="flex justify-center mt-12">

          <button
            onClick={
              handleSave
            }
            disabled={
              saving
            }
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-cyan-500 text-white hover:scale-[1.02] transition duration-300 shadow-lg"
          >

            <Save
              size={18}
            />

            {saving

              ? "Saving..."

              : "Save Changes"}

          </button>

        </div>

      </div>

    </section>
  );
}