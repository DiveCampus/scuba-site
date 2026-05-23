"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Check,
  Save,
} from "lucide-react";

import {

  getAOWAdvantage,

  updateAOWAdvantageSection,

  updateAOWAdvantagePoint,

} from "@/services/AOWAdvantageService";

export default function AOWAdvantageAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [points, setPoints] =
    useState<any[]>([]);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    const load = async () => {

      const res = await getAOWAdvantage();

      setSection(res.section);

      setPoints(res.points);

    };

    load();

  }, []);

  /* SAVE SECTION */
  const handleSave =
    async () => {

      setSaving(true);

      await updateAOWAdvantageSection(
        section.id,
        section
      );

      setSaving(false);

    };

  /* UPDATE POINT */
  const updatePoint =
    async (
      i: number,
      field: string,
      value: string
    ) => {

      const updated =
        [...points];

      updated[i][field] =
        value;

      setPoints(updated);

      await updateAOWAdvantagePoint(
        updated[i].id,
        updated[i]
      );

    };

  if (!section) return null;

  return (

    <section className="py-20 bg-[#f4f7fb] min-h-screen">

      <div className="max-w-7xl mx-auto px-6">

        {/* TOP */}
        <div className="flex justify-between items-center mb-10">

          <h2 className="text-4xl font-bold text-black">
            AOW Advantage
          </h2>

          <button
            onClick={handleSave}
            className="h-[54px] px-7 rounded-2xl bg-cyan-400 text-black font-semibold flex items-center gap-2"
          >

            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save"}

          </button>

        </div>

        {/* SECTION */}
        <div className="bg-white border border-gray-200 rounded-3xl p-7 mb-12 grid md:grid-cols-2 gap-5">

          <input
            value={section.top_label || ""}
            onChange={(e) =>
              setSection({
                ...section,
                top_label:
                  e.target.value,
              })
            }
            placeholder="Top Label"
            className="h-[56px] rounded-2xl border border-gray-200 px-5 text-black outline-none"
          />

          <input
            value={section.image_url || ""}
            onChange={(e) =>
              setSection({
                ...section,
                image_url:
                  e.target.value,
              })
            }
            placeholder="Image URL"
            className="h-[56px] rounded-2xl border border-gray-200 px-5 text-black outline-none"
          />

          <input
            value={section.title || ""}
            onChange={(e) =>
              setSection({
                ...section,
                title:
                  e.target.value,
              })
            }
            placeholder="Title"
            className="h-[56px] rounded-2xl border border-gray-200 px-5 text-black outline-none"
          />

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
            className="h-[56px] rounded-2xl border border-gray-200 px-5 text-black outline-none"
          />

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
            className="md:col-span-2 rounded-2xl border border-gray-200 p-5 text-black outline-none resize-none"
          />

        </div>

        {/* POINTS */}
        <div className="space-y-6">

          {points.map(
            (item, i) => (

              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="bg-white border border-gray-200 rounded-3xl p-6 flex gap-5"
              >

                {/* ICON */}
                <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-500 flex items-center justify-center mt-1">

                  <Check size={16} />

                </div>

                {/* CONTENT */}
                <div className="flex-1 space-y-4">

                  <input
                    value={item.title}
                    onChange={(e) =>
                      updatePoint(
                        i,
                        "title",
                        e.target.value
                      )
                    }
                    className="w-full h-[54px] rounded-2xl border border-gray-200 px-5 text-black outline-none font-semibold"
                  />

                  <textarea
                    rows={4}
                    value={
                      item.description
                    }
                    onChange={(e) =>
                      updatePoint(
                        i,
                        "description",
                        e.target.value
                      )
                    }
                    className="w-full rounded-2xl border border-gray-200 p-5 text-black outline-none resize-none"
                  />

                </div>

              </motion.div>

            )
          )}

        </div>

      </div>

    </section>
  );
}