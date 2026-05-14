"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Anchor,
  Compass,
  MapPin,
  Waves,
  Save,
  Plus,
  Trash2,
} from "lucide-react";

import {

  getAdvancedProtocol,

  updateAdvancedProtocolSection,

  updateAdvancedProtocolCard,

  createAdvancedProtocolCard,

  deleteAdvancedProtocolCard,

} from "@/services/AdvancedProtocolService";

/* =========================================
   ICONS
========================================= */

const icons: any = {
  Anchor,
  Compass,
  MapPin,
  Waves,
};

/* =========================================
   COMPONENT
========================================= */

export default function AdvancedProtocolAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [cards, setCards] =
    useState<any[]>([]);

  const [saving, setSaving] =
    useState(false);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const load = async () => {

      const res =
        await getAdvancedProtocol();

      setSection(res.section);

      setCards(res.cards);

    };

    load();

  }, []);

  /* =========================================
     SAVE SECTION
  ========================================= */

  const saveSection =
    async () => {

      setSaving(true);

      await updateAdvancedProtocolSection(
        section.id,
        section
      );

      setSaving(false);
    };

  /* =========================================
     UPDATE CARD
  ========================================= */

  const updateCard =
    async (
      index: number,
      field: string,
      value: any
    ) => {

      const updated = [...cards];

      updated[index][field] =
        value;

      setCards(updated);

      await updateAdvancedProtocolCard(
        updated[index].id,
        updated[index]
      );
    };

  /* =========================================
     ADD CARD
  ========================================= */

  const addCard =
    async () => {

      const payload = {

        section_id:
          section.id,

        tag: "NEW TAG",

        title: "New Card",

        description:
          "Card Description",

        icon: "Anchor",

        highlight: false,

        sort_order:
          cards.length + 1,

      };

      const { data } =
        await createAdvancedProtocolCard(
          payload
        );

      if (data) {

        setCards([
          ...cards,
          data,
        ]);

      }
    };

  /* =========================================
     DELETE CARD
  ========================================= */

  const deleteCard =
    async (
      id: string
    ) => {

      await deleteAdvancedProtocolCard(
        id
      );

      setCards(
        cards.filter(
          (card) =>
            card.id !== id
        )
      );
    };

  if (!section) return null;

  return (

    <section className="
      py-24
      bg-[#f3f6f9]
      min-h-screen
    ">

      <div className="
        max-w-7xl
        mx-auto
        px-6
      ">

        {/* TOP */}
        <div className="
          flex
          items-center
          justify-between
          flex-wrap
          gap-5
          mb-14
        ">

          <div>

            <p className="
              text-[11px]
              tracking-[4px]
              uppercase
              text-cyan-500
              mb-3
            ">
              ADMIN PANEL
            </p>

            <h2 className="
              text-4xl
              md:text-5xl
              font-bold
              text-black
            ">
              Advanced Protocol
            </h2>

          </div>

          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            onClick={
              saveSection
            }
            className="
              px-7
              h-[56px]
              rounded-2xl
              bg-cyan-500
              text-white
              font-semibold
              shadow-lg
              flex
              items-center
              gap-3
            "
          >

            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Changes"}

          </motion.button>

        </div>

        {/* SECTION FORM */}
        <div className="
          grid
          lg:grid-cols-2
          gap-7
          mb-14
        ">

          {/* LEFT */}
          <div className="
            bg-white
            rounded-3xl
            border
            border-gray-200
            p-7
            shadow-sm
            space-y-5
          ">

            {/* TOP LABEL */}
            <input
              value={
                section.top_label || ""
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  top_label:
                    e.target.value,
                })
              }
              placeholder="Top Label"
              className="
                w-full
                h-[56px]
                rounded-2xl
                border
                border-gray-200
                px-5
                outline-none
                text-black
                placeholder:text-gray-400
              "
            />

            {/* TITLE */}
            <input
              value={
                section.title || ""
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  title:
                    e.target.value,
                })
              }
              placeholder="Main Title"
              className="
                w-full
                h-[56px]
                rounded-2xl
                border
                border-gray-200
                px-5
                outline-none
                text-black
              "
            />

            {/* HIGHLIGHT */}
            <input
              value={
                section.highlighted_title || ""
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  highlighted_title:
                    e.target.value,
                })
              }
              placeholder="Highlighted Title"
              className="
                w-full
                h-[56px]
                rounded-2xl
                border
                border-cyan-200
                bg-cyan-50
                px-5
                outline-none
                text-cyan-700
                font-semibold
              "
            />

            {/* DESCRIPTION */}
            <textarea
              rows={5}
              value={
                section.description || ""
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  description:
                    e.target.value,
                })
              }
              placeholder="Description"
              className="
                w-full
                rounded-2xl
                border
                border-gray-200
                p-5
                outline-none
                resize-none
                text-black
              "
            />

          </div>

          {/* RIGHT */}
          <div className="
            bg-white
            rounded-3xl
            border
            border-gray-200
            p-7
            shadow-sm
            space-y-5
          ">

            {/* INFO BOX 1 */}
            <textarea
              rows={3}
              value={
                section.info_box_1 || ""
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  info_box_1:
                    e.target.value,
                })
              }
              placeholder="Info Box 1"
              className="
                w-full
                rounded-2xl
                border
                border-gray-200
                p-5
                outline-none
                resize-none
                text-black
              "
            />

            {/* INFO BOX 2 */}
            <textarea
              rows={3}
              value={
                section.info_box_2 || ""
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  info_box_2:
                    e.target.value,
                })
              }
              placeholder="Info Box 2"
              className="
                w-full
                rounded-2xl
                border
                border-gray-200
                p-5
                outline-none
                resize-none
                text-black
              "
            />

            {/* CTA TITLE */}
            <input
              value={
                section.cta_title || ""
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  cta_title:
                    e.target.value,
                })
              }
              placeholder="CTA Title"
              className="
                w-full
                h-[56px]
                rounded-2xl
                border
                border-gray-200
                px-5
                outline-none
                text-black
              "
            />

            {/* CTA DESCRIPTION */}
            <textarea
              rows={3}
              value={
                section.cta_description || ""
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  cta_description:
                    e.target.value,
                })
              }
              placeholder="CTA Description"
              className="
                w-full
                rounded-2xl
                border
                border-gray-200
                p-5
                outline-none
                resize-none
                text-black
              "
            />

            {/* CTA BUTTON */}
            <input
              value={
                section.cta_button || ""
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  cta_button:
                    e.target.value,
                })
              }
              placeholder="CTA Button"
              className="
                w-full
                h-[56px]
                rounded-2xl
                border
                border-gray-200
                px-5
                outline-none
                text-black
              "
            />

          </div>

        </div>

        {/* CARD HEADER */}
        <div className="
          flex
          items-center
          justify-between
          mb-8
        ">

          <h3 className="
            text-2xl
            font-bold
            text-black
          ">
            Protocol Cards
          </h3>

          <button
            onClick={addCard}
            className="
              px-6
              h-[52px]
              rounded-2xl
              bg-black
              text-white
              flex
              items-center
              gap-2
            "
          >

            <Plus size={18} />

            Add Card

          </button>

        </div>

        {/* CARDS */}
        <div className="
          grid
          md:grid-cols-2
          lg:grid-cols-4
          gap-7
        ">

          {cards.map(
            (
              card,
              i
            ) => {

              const Icon =
                icons[
                  card.icon
                ];

              return (

                <motion.div
                  key={card.id}
                  whileHover={{
                    y: -5,
                  }}
                  className={`
                    rounded-3xl
                    border
                    p-6
                    shadow-sm
                    bg-white
                    space-y-5

                    ${
                      card.highlight
                        ? "border-yellow-400 bg-[#fffdf7]"
                        : "border-gray-200"
                    }
                  `}
                >

                  {/* TOP */}
                  <div className="
                    flex
                    items-center
                    justify-between
                  ">

                    <div className="
                      text-cyan-500
                    ">
                      <Icon
                        size={20}
                      />
                    </div>

                    <button
                      onClick={() =>
                        deleteCard(
                          card.id
                        )
                      }
                      className="
                        w-10
                        h-10
                        rounded-xl
                        bg-red-50
                        flex
                        items-center
                        justify-center
                        text-red-500
                      "
                    >

                      <Trash2
                        size={16}
                      />

                    </button>

                  </div>

                  {/* TAG */}
                  <input
                    value={
                      card.tag
                    }
                    onChange={(e) =>
                      updateCard(
                        i,
                        "tag",
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      h-[48px]
                      rounded-xl
                      border
                      border-gray-200
                      px-4
                      outline-none
                      text-black
                      uppercase
                      tracking-[2px]
                      text-[11px]
                    "
                  />

                  {/* TITLE */}
                  <input
                    value={
                      card.title
                    }
                    onChange={(e) =>
                      updateCard(
                        i,
                        "title",
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      h-[52px]
                      rounded-xl
                      border
                      border-gray-200
                      px-4
                      outline-none
                      text-black
                      font-semibold
                    "
                  />

                  {/* DESCRIPTION */}
                  <textarea
                    rows={5}
                    value={
                      card.description
                    }
                    onChange={(e) =>
                      updateCard(
                        i,
                        "description",
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-gray-200
                      p-4
                      outline-none
                      resize-none
                      text-black
                    "
                  />

                  {/* ICON */}
                  <select
                    value={
                      card.icon
                    }
                    onChange={(e) =>
                      updateCard(
                        i,
                        "icon",
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      h-[50px]
                      rounded-xl
                      border
                      border-gray-200
                      px-4
                      outline-none
                      text-black
                    "
                  >

                    {Object.keys(
                      icons
                    ).map(
                      (icon) => (

                        <option
                          key={icon}
                          value={icon}
                        >

                          {icon}

                        </option>

                      )
                    )}

                  </select>

                  {/* HIGHLIGHT */}
                  <div className="
                    flex
                    items-center
                    justify-between
                  ">

                    <span className="
                      text-sm
                      text-black
                    ">
                      Highlight
                    </span>

                    <input
                      type="checkbox"
                      checked={
                        card.highlight
                      }
                      onChange={(e) =>
                        updateCard(
                          i,
                          "highlight",
                          e.target.checked
                        )
                      }
                      className="
                        w-5
                        h-5
                      "
                    />

                  </div>

                </motion.div>

              );
            }
          )}

        </div>

      </div>

    </section>
  );
}