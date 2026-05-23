"use client";

import {

  useEffect,

  useState,

} from "react";

import {

  Save,

} from "lucide-react";

import {

  getCommandOceanSection,

  updateCommandOceanSection,

  getCommandOceanItems,

  updateCommandOceanItem,

} from "@/services/CommandOceanService";

/* =========================================
   ADMIN
========================================= */

export default function CommandOceanAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [items, setItems] =
    useState<any[]>([]);

  const [saving, setSaving] =
    useState(false);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const fetchData =
      async () => {

        const sectionResponse = await getCommandOceanSection();

        const itemsResponse = await getCommandOceanItems();

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
     SAVE
  ========================================= */

  const handleSave =
    async () => {

      if (!section?.id)
        return;

      setSaving(true);

      await updateCommandOceanSection(
        section.id,
        section
      );

      setSaving(false);

    };

  if (!section)
    return null;

  return (

    <section
      className="py-28 bg-[#f4f7fb]"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      <div className="max-w-7xl mx-auto px-6">

        {/* TOP */}
        <div className="flex items-center justify-between mb-16 flex-wrap gap-5">

          <div>

            <p className="text-[10px] tracking-[4px] text-cyan-500 mb-3">

              ADMIN PANEL

            </p>

            <h2 className="text-4xl font-bold text-[#0a0e27]">

              Command Ocean Section

            </h2>

          </div>

          <button
            onClick={handleSave}
            className="h-[56px] px-8 rounded-2xl bg-cyan-500 text-white font-semibold flex items-center gap-3"
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
        <div className="grid md:grid-cols-3 gap-6 mb-16">

          <textarea
            rows={2}
            value={
              section.top_text
            }
            onChange={(e) =>
              setSection({
                ...section,
                top_text:
                  e.target.value,
              })
            }
            className="rounded-3xl bg-white border border-gray-200 p-5 outline-none resize-none text-gray-700"
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
            className="rounded-3xl bg-white border border-gray-200 p-5 outline-none resize-none text-cyan-500 font-semibold"
          />

          <textarea
            rows={4}
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
            className="rounded-3xl bg-white border border-gray-200 p-5 outline-none resize-none text-gray-600"
          />

        </div>

        {/* ITEMS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {items.map((item, i) => (

            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-3xl p-6"
            >

              {/* ICON */}
              <input
                value={
                  item.icon_name
                }
                onChange={async (e) => {

                  const updated =
                    [...items];

                  updated[
                    i
                  ].icon_name =
                    e.target.value;

                  setItems(updated);

                  await updateCommandOceanItem(
                    item.id,
                    updated[i]
                  );

                }}
                className="w-full h-[52px] rounded-2xl border border-gray-200 px-4 outline-none mb-5"
              />

              {/* TITLE */}
              <textarea
                rows={2}
                value={
                  item.title
                }
                onChange={async (e) => {

                  const updated =
                    [...items];

                  updated[
                    i
                  ].title =
                    e.target.value;

                  setItems(updated);

                  await updateCommandOceanItem(
                    item.id,
                    updated[i]
                  );

                }}
                className="w-full rounded-2xl border border-gray-200 p-4 outline-none resize-none mb-5 font-semibold text-[#0a0e27]"
              />

              {/* DESC */}
              <textarea
                rows={5}
                value={
                  item.description
                }
                onChange={async (e) => {

                  const updated =
                    [...items];

                  updated[
                    i
                  ].description =
                    e.target.value;

                  setItems(updated);

                  await updateCommandOceanItem(
                    item.id,
                    updated[i]
                  );

                }}
                className="w-full rounded-2xl border border-gray-200 p-4 outline-none resize-none text-gray-500 leading-[1.8]"
              />

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}