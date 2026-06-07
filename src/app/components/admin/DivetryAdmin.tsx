"use client";

import {

  useEffect,
  useState,

} from "react";

import {

  getDivetry,
  updateDivetrySection,
  updateDivetryCard,

} from "@/services/DivetryService";

export default function DivetryAdmin() {

  const [

    section,
    setSection,

  ] = useState<any>(null);

  const [

    cards,
    setCards,

  ] = useState<any[]>([]);

  const [

    selected,
    setSelected,

  ] = useState<
    "dubai" | "fujairah"
  >("dubai");

  const [

    saving,
    setSaving,

  ] = useState(false);

  const isDubai =
    selected === "dubai";

  useEffect(() => {

    loadData();

  }, []);

  const loadData =
    async () => {

      const { section, cards } = await getDivetry();

      setSection(section);

      setCards(
        cards || []
      );

    };

  const handleSave =
    async () => {

      try {

        setSaving(true);

        /* SECTION */
        await updateDivetrySection(

          section.id,

          section

        );

        /* CARDS */
        for (
          const card
          of cards
        ) {

          await updateDivetryCard(

            card.id,

            card

          );

        }

        alert(
          "Updated Successfully ✅"
        );

      } catch (err) {

        console.error(err);

      } finally {

        setSaving(false);

      }

    };

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

  if (!section)
    return null;

  const dubaiCard =
    cards.find(
      c =>
        c.location_slug ===
        "dubai"
    );

  const fujairahCard =
    cards.find(
      c =>
        c.location_slug ===
        "fujairah"
    );

  return (

    <section
      className="relative min-h-screen text-white bg-cover bg-center overflow-hidden"
      style={{

        backgroundImage:
          `linear-gradient(
            to bottom,
            rgba(0,0,0,0.58),
            rgba(0,0,0,0.82)
          ),
          url('${
            section.background_image
          }')`,

        fontFamily:
          "Harabara, sans-serif",

      }}
    >

      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >

        {/* BACKGROUND IMAGE */}
        <input
          value={
            section.background_image || ""
          }
          onChange={e =>
            setSection({
              ...section,
              background_image:
                e.target.value,
            })
          }
          placeholder="Background Image URL"
          className="bg-white/10 border border-white/20 px-5 py-2 rounded-full text-center text-xs w-full max-w-[700px] mb-3 backdrop-blur outline-none"
        />

        {/* TOP TAG */}
        <input
          value={
            section.top_tag
          }
          onChange={e =>
            setSection({
              ...section,
              top_tag:
                e.target.value,
            })
          }
          className="bg-white/10 border border-white/20 px-5 py-2 rounded-full text-center text-sm w-full max-w-[700px] mb-6 backdrop-blur"
        />

        {/* LABEL */}
        <input
          value={
            section.label
          }
          onChange={e =>
            setSection({
              ...section,
              label:
                e.target.value,
            })
          }
          className="bg-transparent text-cyan-300 text-center uppercase tracking-[5px] outline-none text-sm mb-4"
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
                e.target.value,
            })
          }
          className="bg-transparent text-center text-5xl font-semibold outline-none resize-none w-full max-w-4xl"
        />

        {/* SUBTITLE */}
        <input
          value={
            section.subtitle
          }
          onChange={e =>
            setSection({
              ...section,
              subtitle:
                e.target.value,
            })
          }
          className="bg-transparent text-cyan-300 text-center mt-4 mb-12 outline-none"
        />

        {/* CARDS */}
        <div
          className="flex flex-col md:flex-row gap-8"
        >

          {[

            dubaiCard,

            fujairahCard,

          ].map(
            (
              card: any
            ) => (

              <div
                key={card.id}
                onClick={() =>
                  setSelected(
                    card.location_slug
                  )
                }
                className={`
                relative
                w-[300px]
                rounded-xl
                border
                p-6
                cursor-pointer
                transition-all
                duration-300
                backdrop-blur-md
                ${
                  selected ===
                  card.location_slug
                    ? `
                    bg-cyan-500/20
                    border-cyan-400
                    shadow-lg
                    scale-105
                    `
                    : `
                    bg-white/5
                    border-white/20
                    `
                }
                `}
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

                      e.target.value
                    )
                  }
                  className="bg-transparent text-cyan-300 text-center text-xs tracking-[3px] w-full outline-none mb-3"
                />

                {/* TITLE */}
                <input
                  value={
                    card.title
                  }
                  onChange={e =>
                    updateCard(

                      card.id,

                      "title",

                      e.target.value
                    )
                  }
                  className="bg-transparent text-center text-xl font-semibold outline-none w-full mb-4"
                />

                {/* DESCRIPTION */}
                <textarea
                  value={
                    card.description
                  }
                  onChange={e =>
                    updateCard(

                      card.id,

                      "description",

                      e.target.value
                    )
                  }
                  className="bg-transparent text-center text-sm text-gray-300 resize-none outline-none w-full mb-4"
                />

                {/* PRICE */}
                <input
                  type="number"
                  value={
                    card.price
                  }
                  onChange={e =>
                    updateCard(

                      card.id,

                      "price",

                      Number(
                        e.target
                          .value
                      )
                    )
                  }
                  className="bg-transparent text-center text-2xl font-bold outline-none w-full"
                />

                {/* BUTTON TEXT */}
                <input
                  value={
                    card.button_text || ""
                  }
                  onChange={e =>
                    updateCard(

                      card.id,

                      "button_text",

                      e.target.value
                    )
                  }
                  placeholder="Button Text"
                  className="mt-4 bg-white/10 border border-white/20 rounded-md text-center text-xs px-3 py-2 outline-none w-full"
                />

              </div>
            )
          )}
        </div>

        {/* CTA BUTTON */}
        <button
          className="mt-10 px-8 py-4 rounded-xl bg-cyan-500 text-black font-semibold"
        >

          {selected ===
          "dubai"

            ? dubaiCard
                ?.button_text

            : fujairahCard
                ?.button_text}

        </button>

        {/* SAVE */}
        <button
          onClick={
            handleSave
          }
          disabled={
            saving
          }
          className="mt-10 px-8 py-4 rounded-xl bg-green-500 hover:bg-green-400 font-semibold"
        >

          {saving

            ? "Saving..."

            : "Save Changes"}

        </button>

      </div>

    </section>
  );
}