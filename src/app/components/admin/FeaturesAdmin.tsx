"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  getFeatures,
  updateSection,
  updateFeatureItem,
} from "@/services/featuresService";

export default function FeaturesAdmin() {
  const [section, setSection] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { section, list } = await getFeatures();
      setSection(section);
      setList(list || []);
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);

    await updateSection(section);

    for (let item of list) {
      await updateFeatureItem(item);
    }

    setSaving(false);
  };

  if (!section) return null;

  return (
    <section className="py-24 bg-[#f8fafc] min-h-screen text-black [&_*]:text-black">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-16 px-6">

        {editing === "title" ? (
          <input
            value={section.title}
            onChange={(e) =>
              setSection({ ...section, title: e.target.value })
            }
            onBlur={() => setEditing(null)}
            autoFocus
            className="text-3xl md:text-5xl font-bold text-center bg-transparent outline-none"
          />
        ) : (
          <h2
            onClick={() => setEditing("title")}
            className="text-3xl md:text-5xl font-bold cursor-pointer"
          >
            {section.title}
          </h2>
        )}

        {editing === "subtitle" ? (
          <textarea
            value={section.subtitle}
            onChange={(e) =>
              setSection({ ...section, subtitle: e.target.value })
            }
            onBlur={() => setEditing(null)}
            className="mt-4 text-center w-full bg-transparent outline-none"
          />
        ) : (
          <p
            onClick={() => setEditing("subtitle")}
            className="mt-4 cursor-pointer"
          >
            {section.subtitle}
          </p>
        )}
      </div>

      {/* GRID */}
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 px-6">

        {/* LEFT FEATURES */}
        <div className="space-y-4">
          {list.map((item, i) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="flex justify-between px-5 py-4 rounded-xl border bg-white shadow cursor-pointer"
            >
              {editing === `text-${i}` ? (
                <input
                  value={item.text}
                  onChange={(e) => {
                    const updated = [...list];
                    updated[i].text = e.target.value;
                    setList(updated);
                  }}
                  onBlur={() => setEditing(null)}
                  autoFocus
                  className="bg-transparent outline-none w-full"
                />
              ) : (
                <span onClick={() => setEditing(`text-${i}`)}>
                  {item.text}
                </span>
              )}

              {editing === `tag-${i}` ? (
                <input
                  value={item.tag}
                  onChange={(e) => {
                    const updated = [...list];
                    updated[i].tag = e.target.value;
                    setList(updated);
                  }}
                  onBlur={() => setEditing(null)}
                  className="bg-transparent outline-none w-[120px] text-right"
                />
              ) : (
                <span
                  onClick={() => setEditing(`tag-${i}`)}
                  className="text-sm"
                >
                  {item.tag}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* YOUTUBE LINK */}
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-sm mb-2">
              YouTube Video Link
            </p>

            <input
              value={section.video_url}
              onChange={(e) =>
                setSection({ ...section, video_url: e.target.value })
              }
              placeholder="Paste YouTube link..."
              className="w-full p-3 rounded-lg border outline-none"
            />
          </div>

          {/* RATINGS */}
          <div className="flex gap-3">

            <div className="flex-1 bg-white rounded-full px-4 py-3 text-center shadow">
              <input
                value={section.rating1}
                onChange={(e) =>
                  setSection({ ...section, rating1: e.target.value })
                }
                className="text-center font-bold w-full outline-none"
              />
              <input
                value={section.rating1_count}
                onChange={(e) =>
                  setSection({ ...section, rating1_count: e.target.value })
                }
                className="text-xs text-center w-full outline-none"
              />
            </div>

            <div className="flex-1 bg-white rounded-full px-4 py-3 text-center shadow">
              <input
                value={section.rating2}
                onChange={(e) =>
                  setSection({ ...section, rating2: e.target.value })
                }
                className="text-center font-bold w-full outline-none"
              />
              <input
                value={section.rating2_count}
                onChange={(e) =>
                  setSection({ ...section, rating2_count: e.target.value })
                }
                className="text-xs text-center w-full outline-none"
              />
            </div>

          </div>

        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="text-center mt-12">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-cyan-400 text-black rounded-full font-semibold hover:scale-105 transition"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

    </section>
  );
}