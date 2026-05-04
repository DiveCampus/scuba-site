"use client";

import { useEffect, useState } from "react";
import {
  getCompare,
  updateCompareSection,
  updateCompareItem,
} from "@/services/compareService";

export default function CompareAdmin() {
  const [section, setSection] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      console.log("🚀 Fetching compare data...");
      const { section, items } = await getCompare();

      console.log("📦 Section:", section);
      console.log("📦 Items:", items);

      setSection(section);
      setItems(items || []);
    };

    load();
  }, []);

  const handleSave = async () => {
    console.log("💾 Saving compare data...");

    setSaving(true);

    await updateCompareSection(section);

    for (let item of items) {
      await updateCompareItem(item);
    }

    setSaving(false);

    console.log("✅ Saved successfully");
  };

  if (!section) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#020617] text-white px-6 py-16">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-14">

        {editing === "title" ? (
          <input
            value={section.title}
            onChange={(e) =>
              setSection({ ...section, title: e.target.value })
            }
            onBlur={() => setEditing(null)}
            autoFocus
            className="text-3xl md:text-5xl font-bold text-center bg-transparent outline-none w-full"
          />
        ) : (
          <h2
            onClick={() => setEditing("title")}
            className="text-3xl md:text-5xl font-bold cursor-pointer"
          >
            {section.title}{" "}
            <span className="text-cyan-400">
              {section.highlight}
            </span>
          </h2>
        )}

        {editing === "subtitle" ? (
          <textarea
            value={section.subtitle}
            onChange={(e) =>
              setSection({ ...section, subtitle: e.target.value })
            }
            onBlur={() => setEditing(null)}
            className="mt-4 text-center w-full bg-transparent outline-none text-white/60"
          />
        ) : (
          <p
            onClick={() => setEditing("subtitle")}
            className="mt-4 text-white/60 cursor-pointer"
          >
            {section.subtitle}
          </p>
        )}

      </div>

      {/* TABLE */}
      <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 overflow-hidden bg-white/5">

        {/* HEADER ROW */}
        <div className="grid grid-cols-3 p-4 text-sm text-white/60 border-b border-white/10">
          <span>FEATURE</span>
          <span>OTHERS</span>
          <span className="text-cyan-400">NEMO DIVING</span>
        </div>

        {/* ROWS */}
        {items.map((item, i) => (
          <div
            key={item.id}
            className="grid grid-cols-3 p-4 border-b border-white/10"
          >
            {/* FEATURE */}
            {editing === `feature-${i}` ? (
              <input
                value={item.feature}
                onChange={(e) => {
                  const updated = [...items];
                  updated[i].feature = e.target.value;
                  setItems(updated);
                }}
                onBlur={() => setEditing(null)}
                autoFocus
                className="bg-transparent outline-none"
              />
            ) : (
              <span
                onClick={() => setEditing(`feature-${i}`)}
                className="cursor-pointer"
              >
                {item.feature}
              </span>
            )}

            {/* OTHERS */}
            {editing === `others-${i}` ? (
              <input
                value={item.others}
                onChange={(e) => {
                  const updated = [...items];
                  updated[i].others = e.target.value;
                  setItems(updated);
                }}
                onBlur={() => setEditing(null)}
                className="bg-transparent outline-none text-red-400"
              />
            ) : (
              <span
                onClick={() => setEditing(`others-${i}`)}
                className="text-red-400 cursor-pointer"
              >
                ✖ {item.others}
              </span>
            )}

            {/* NEMO */}
            {editing === `nemo-${i}` ? (
              <input
                value={item.nemo}
                onChange={(e) => {
                  const updated = [...items];
                  updated[i].nemo = e.target.value;
                  setItems(updated);
                }}
                onBlur={() => setEditing(null)}
                className="bg-transparent outline-none text-cyan-400"
              />
            ) : (
              <span
                onClick={() => setEditing(`nemo-${i}`)}
                className="text-cyan-400 cursor-pointer"
              >
                ✔ {item.nemo}
              </span>
            )}
          </div>
        ))}

      </div>

      {/* SAVE */}
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