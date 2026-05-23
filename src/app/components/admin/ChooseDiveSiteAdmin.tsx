"use client";

import {

  useEffect,
  useState,

} from "react";

import {

  motion,

} from "framer-motion";

import {

  Save,

} from "lucide-react";

import {

  getChooseDiveSite,
  updateChooseDiveSiteSection,
  updateChooseDiveSiteCard,
  updateChooseDiveSiteItem,

} from "@/services/ChooseDiveSiteService";

export default function
ChooseDiveSiteAdmin() {

  const [

    section,
    setSection,

  ] = useState<any>(null);

  const [

    cards,
    setCards,

  ] = useState<any[]>([]);

  const [

    items,
    setItems,

  ] = useState<any[]>([]);

  const [

    saving,
    setSaving,

  ] = useState(false);

  /* =====================================
     LOAD
  ===================================== */

  useEffect(() => {

    load();

  }, []);

  const load =
    async () => {

      const {

        section,
        cards,
        items,

      } = await getChooseDiveSite();

      setSection(
        section
      );

      setCards(
        cards || []
      );

      setItems(
        items || []
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
          prev.map(
            card =>
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
     UPDATE ITEM
  ===================================== */

  const updateItem =
    (
      id: string,
      field: string,
      value: string
    ) => {

      setItems(
        prev =>
          prev.map(
            item =>
              item.id === id
                ? {

                    ...item,

                    [field]:
                      value,

                  }
                : item
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
        await updateChooseDiveSiteSection(

          section.id,

          section

        );

        /* CARDS */
        for (
          const card
          of cards
        ) {

          await updateChooseDiveSiteCard(

            card.id,

            card

          );

        }

        /* ITEMS */
        for (
          const item
          of items
        ) {

          await updateChooseDiveSiteItem(

            item.id,

            item

          );

        }

        alert(
          "Saved Successfully ✅"
        );

      } catch (
        error
      ) {

        console.error(
          error
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
      className="relative overflow-hidden py-28 bg-[#071c2d]"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* BG GLOW */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[40%] h-[500px] bg-cyan-500/10 blur-[120px]" />

        <div className="absolute bottom-0 right-0 w-[30%] h-[400px] bg-blue-500/10 blur-[100px]" />

      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div
          className="text-center"
        >

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
            className="bg-transparent text-center text-4xl md:text-5xl font-semibold text-white resize-none outline-none w-full"
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
            rows={3}
            className="mt-5 bg-transparent text-center text-white/45 text-sm resize-none outline-none w-full max-w-2xl mx-auto block"
          />

        </div>

        {/* CARDS */}
        <div className="mt-20 grid lg:grid-cols-2 gap-8">

          {cards.map(

            (
              card
            ) => {

              const
              cardItems =
                items.filter(
                  item =>
                    item.card_id ===
                    card.id
                );

              return (

                <motion.div
                  key={
                    card.id
                  }
                  whileHover={{
                    y: -6,
                    scale: 1.01,
                  }}
                  className={`
                  relative
                  rounded-3xl
                  border
                  overflow-hidden
                  ${
                    card.highlight

                      ? "border-cyan-400/60 bg-cyan-500/[0.05] shadow-[0_0_40px_rgba(0,200,255,0.12)]"

                      : "border-white/10 bg-white/[0.02]"
                  }
                  `}
                >

                  {/* TOP BAR */}
                  {card.highlight && (

                    <div
                      className="absolute top-0 left-0 h-[3px] w-full bg-cyan-400"
                    />

                  )}

                  <div
                    className="p-8"
                  >

                    {/* BADGE */}
                    <input
                      value={
                        card.badge
                      }
                      onChange={e =>
                        updateCard(

                          card.id,

                          "badge",

                          e.target
                            .value
                        )
                      }
                      className="bg-transparent text-[10px] tracking-[3px] text-cyan-400 uppercase outline-none w-full"
                    />

                    {/* TITLE */}
                    <textarea
                      value={
                        card.title
                      }
                      onChange={e =>
                        updateCard(

                          card.id,

                          "title",

                          e.target
                            .value
                        )
                      }
                      rows={2}
                      className="mt-4 bg-transparent text-[34px] leading-[1.1] font-semibold text-white resize-none outline-none w-full"
                    />

                    {/* HIGHLIGHT */}
                    <label
                      className="mt-5 flex items-center gap-3 text-white/70 text-sm"
                    >

                      <input
                        type="checkbox"
                        checked={
                          card.highlight
                        }
                        onChange={e =>
                          updateCard(

                            card.id,

                            "highlight",

                            e.target
                              .checked
                          )
                        }
                      />

                      Highlight Card

                    </label>

                    {/* ITEMS */}
                    <div
                      className="mt-8 border-t border-white/10"
                    >

                      {cardItems.map(
                        item => (

                          <div
                            key={
                              item.id
                            }
                            className="py-5 border-b border-white/10 space-y-3"
                          >

                            <input
                              value={
                                item.label
                              }
                              onChange={e =>
                                updateItem(

                                  item.id,

                                  "label",

                                  e.target
                                    .value
                                )
                              }
                              className="bg-transparent text-[10px] tracking-[2px] text-white/30 uppercase outline-none w-full"
                            />

                            <textarea
                              value={
                                item.value
                              }
                              onChange={e =>
                                updateItem(

                                  item.id,

                                  "value",

                                  e.target
                                    .value
                                )
                              }
                              rows={2}
                              className={`
                              bg-transparent
                              text-sm
                              md:text-[15px]
                              resize-none
                              outline-none
                              w-full
                              ${
                                card.highlight

                                  ? "text-cyan-300"

                                  : "text-white/85"
                              }
                              `}
                            />

                          </div>
                        )
                      )}

                    </div>

                    {/* FOOTER */}
                    <input
                      value={
                        card.footer || ""
                      }
                      onChange={e =>
                        updateCard(

                          card.id,

                          "footer",

                          e.target
                            .value
                        )
                      }
                      placeholder="
                      Optional Footer
                      "
                      className="mt-8 w-full rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-4 text-cyan-300 text-center text-[10px] tracking-[2px] outline-none"
                    />

                  </div>

                </motion.div>
              );
            }
          )}

        </div>

        {/* SAVE */}
        <div className="flex justify-center mt-16">

          <button
            onClick={
              handleSave
            }
            disabled={
              saving
            }
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-cyan-500 text-white hover:scale-[1.03] transition shadow-lg"
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