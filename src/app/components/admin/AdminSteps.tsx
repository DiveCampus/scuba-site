"use client";

import { useEffect, useState } from "react";
import {
  getSteps,
  updateStepsSection,
  updateStepItem,
} from "@/services/stepsService";

export default function AdminSteps() {
  const [section, setSection] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      console.log("🚀 Fetching steps...");

      const { section, list } = await getSteps();

      console.log("📦 Section:", section);
      console.log("📦 Steps:", list);

      setSection(section);
      setList(list || []);
    };

    load();
  }, []);

  const handleSave = async () => {
    console.log("💾 Saving...");

    setSaving(true);

    await updateStepsSection(section);

    for (let item of list) {
      await updateStepItem(item);
    }

    setSaving(false);

    console.log("✅ Saved");
  };

  if (!section) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <section className="py-24 bg-[#f8fafc] min-h-screen px-4">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-16">

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

        {editing === "highlight" ? (
          <input
            value={section.highlight}
            onChange={(e) =>
              setSection({ ...section, highlight: e.target.value })
            }
            onBlur={() => setEditing(null)}
            className="text-2xl text-cyan-500 mt-2 text-center bg-transparent outline-none"
          />
        ) : (
          <p
            onClick={() => setEditing("highlight")}
            className="text-2xl text-cyan-500 mt-2 cursor-pointer"
          >
            {section.highlight}
          </p>
        )}

        {editing === "subtitle" ? (
          <textarea
            value={section.subtitle}
            onChange={(e) =>
              setSection({ ...section, subtitle: e.target.value })
            }
            onBlur={() => setEditing(null)}
            className="mt-4 text-center w-full bg-transparent outline-none text-gray-500"
          />
        ) : (
          <p
            onClick={() => setEditing("subtitle")}
            className="mt-4 text-gray-500 cursor-pointer"
          >
            {section.subtitle}
          </p>
        )}

      </div>

      {/* STEPS */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {list.map((item, i) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-xl shadow space-y-3 cursor-pointer"
          >
            <p className="text-sm text-gray-400">
              Step {item.step_number}
            </p>

            {editing === `title-${i}` ? (
              <input
                value={item.title}
                onChange={(e) => {
                  const updated = [...list];
                  updated[i].title = e.target.value;
                  setList(updated);
                }}
                onBlur={() => setEditing(null)}
                autoFocus
                className="font-bold w-full outline-none"
              />
            ) : (
              <h3
                onClick={() => setEditing(`title-${i}`)}
                className="font-bold"
              >
                {item.title}
              </h3>
            )}

            {editing === `desc-${i}` ? (
              <textarea
                value={item.description}
                onChange={(e) => {
                  const updated = [...list];
                  updated[i].description = e.target.value;
                  setList(updated);
                }}
                onBlur={() => setEditing(null)}
                className="text-sm text-gray-500 w-full outline-none"
              />
            ) : (
              <p
                onClick={() => setEditing(`desc-${i}`)}
                className="text-sm text-gray-500"
              >
                {item.description}
              </p>
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
                className="text-xs text-cyan-500 w-full outline-none"
              />
            ) : (
              <span
                onClick={() => setEditing(`tag-${i}`)}
                className="text-xs text-cyan-500"
              >
                {item.tag || "Click to add tag"}
              </span>
            )}

          </div>
        ))}

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