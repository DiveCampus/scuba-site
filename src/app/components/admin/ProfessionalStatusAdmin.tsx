"use client";

import {

  useEffect,

  useState,

} from "react";

import {

  Save,

} from "lucide-react";

import {

  getProfessionalStatusSection,

  updateProfessionalStatusSection,

  getProfessionalStatusItems,

  updateProfessionalStatusItem,

} from "@/services/ProfessionalStatusService";

/* =========================================
   ADMIN PANEL
========================================= */

export default function ProfessionalStatusAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [items, setItems] =
    useState<any[]>([]);

  const [saving, setSaving] =
    useState(false);

  /* =========================================
     FETCH DATA
  ========================================= */

  useEffect(() => {

    const fetchData =
      async () => {

        const sectionResponse =
          await getProfessionalStatusSection();

        const itemsResponse =
          await getProfessionalStatusItems();

        setSection(
          sectionResponse.data
        );

        setItems(
          itemsResponse.data || []
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

      await updateProfessionalStatusSection(
        section.id,
        section
      );

      setSaving(false);

    };

  if (!section)
    return null;

  return (

    <section
      className="
        py-28
        bg-[#f4f7fb]
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

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
          mb-16
        ">

          <div>

            <p className="
              text-[10px]
              tracking-[4px]
              text-cyan-500
              mb-3
            ">

              ADMIN PANEL

            </p>

            <h2 className="
              text-4xl
              font-bold
              text-[#0a0e27]
            ">

              Professional Status

            </h2>

          </div>

          <button
            onClick={handleSave}
            className="
              h-[56px]
              px-8
              rounded-2xl
              bg-cyan-500
              text-white
              font-semibold
              flex
              items-center
              gap-3
            "
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
        <div className="
          grid
          md:grid-cols-2
          gap-6
          mb-16
        ">

          <textarea
            rows={2}
            value={
              section.top_label
            }
            onChange={(e) =>
              setSection({
                ...section,
                top_label:
                  e.target.value,
              })
            }
            className="
              rounded-3xl
              border
              border-gray-200
              bg-white
              p-5
              outline-none
              resize-none
              text-gray-600
            "
          />

          <textarea
            rows={2}
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
              rounded-3xl
              border
              border-gray-200
              bg-white
              p-5
              outline-none
              resize-none
              text-[#0a0e27]
              font-semibold
            "
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
            className="
              rounded-3xl
              border
              border-gray-200
              bg-white
              p-5
              outline-none
              resize-none
              text-gray-500
              md:col-span-2
            "
          />

          <input
            type="text"
            value={
              section.image_url
            }
            onChange={(e) =>
              setSection({
                ...section,
                image_url:
                  e.target.value,
              })
            }
            placeholder="/divemaster.webp"
            className="
              h-[58px]
              rounded-3xl
              border
              border-gray-200
              bg-white
              px-5
              outline-none
              md:col-span-2
            "
          />

        </div>

        {/* IMAGE */}
        <div className="mb-14">

          <img
            src={section.image_url}
            className="
              w-full
              h-[340px]
              object-cover
              rounded-3xl
            "
          />

        </div>

        {/* ITEMS */}
        <div className="
          grid
          md:grid-cols-2
          gap-7
        ">

          {items.map((item, i) => (

            <div
              key={item.id}
              className="
                bg-white
                rounded-3xl
                p-7
                border
                border-gray-100
              "
            >

              {/* TITLE */}
              <textarea
                rows={2}
                value={
                  item.title
                }
                onChange={async (e) => {

                  const updated =
                    [...items];

                  updated[i].title =
                    e.target.value;

                  setItems(updated);

                  await updateProfessionalStatusItem(
                    item.id,
                    updated[i]
                  );

                }}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-200
                  p-4
                  outline-none
                  resize-none
                  mb-5
                  font-semibold
                  text-[#0a0e27]
                "
              />

              {/* DESC */}
              <textarea
                rows={6}
                value={
                  item.descriptions?.join(
                    "\n"
                  )
                }
                onChange={async (e) => {

                  const updated =
                    [...items];

                  updated[
                    i
                  ].descriptions =
                    e.target.value
                      .split("\n");

                  setItems(updated);

                  await updateProfessionalStatusItem(
                    item.id,
                    updated[i]
                  );

                }}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-200
                  p-4
                  outline-none
                  resize-none
                  mb-5
                  text-gray-500
                "
              />

              {/* HIGHLIGHT */}
              <textarea
                rows={3}
                value={
                  item.highlight || ""
                }
                onChange={async (e) => {

                  const updated =
                    [...items];

                  updated[
                    i
                  ].highlight =
                    e.target.value;

                  setItems(updated);

                  await updateProfessionalStatusItem(
                    item.id,
                    updated[i]
                  );

                }}
                placeholder="Optional highlight text"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-cyan-200
                  bg-cyan-50
                  p-4
                  outline-none
                  resize-none
                  text-cyan-600
                "
              />

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}