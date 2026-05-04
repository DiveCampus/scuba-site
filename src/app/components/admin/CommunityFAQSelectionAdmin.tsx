"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getFAQ,
  updateFAQSection,
  updateFAQItem,
  createFAQItem,
} from "@/services/CommunityFAQService";

export default function CommunityFAQSelectionAdmin() {
  const [section, setSection] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // ================= LOAD =================
  const load = async () => {
    console.log("🚀 Loading FAQ CMS...");

    const { section, items, error } = await getFAQ();

    console.log("📦 SECTION FROM DB:", section);
    console.log("📦 ITEMS FROM DB:", items);
    console.log("❌ FETCH ERROR:", error);

    setSection(section);
    setItems(items || []);
  };

  useEffect(() => {
    load();
  }, []);

  // ================= SAVE =================
  const handleSave = async () => {
    console.log("💾 Saving started...");
    console.log("👉 Section sending:", section);
    console.log("👉 Items sending:", items);

    setSaving(true);

    try {
      // SECTION UPDATE
      const sectionRes = await updateFAQSection(section);
      console.log("🧠 Section update result:", sectionRes);

      // ITEMS UPDATE
      const itemResults = await Promise.all(
        items.map(async (item) => {
          console.log("📌 Updating item ID:", item.id);

          const res = await updateFAQItem(item);

          console.log("📌 Item update result:", item.id, res);

          return res;
        })
      );

      console.log("📦 All item updates:", itemResults);

      console.log("✅ Save finished");
    } catch (err) {
      console.error("🔥 SAVE ERROR:", err);
    }

    setSaving(false);

    // 🔥 REFETCH DATA (VERY IMPORTANT)
    await load();
  };

  // ================= ADD =================
  const addFAQ = async () => {
    console.log("➕ Adding new FAQ...");

    const { data, error } = await createFAQItem({
      question: "New Question",
      answer: "New Answer",
    });

    console.log("📦 New FAQ response:", data);
    console.log("❌ Add error:", error);

    if (data?.[0]) {
      setItems((prev) => [...prev, data[0]]);
    }
  };

  if (!section) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#020617] text-white">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#020617] text-white px-4 py-12">

      {/* ================= HEADER ================= */}
      <div className="max-w-3xl mx-auto text-center mb-14 space-y-4">

        {/* TITLE */}
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
            {section.title}
          </h2>
        )}

        {/* HIGHLIGHT */}
        {editing === "highlight" ? (
          <input
            value={section.highlight}
            onChange={(e) =>
              setSection({ ...section, highlight: e.target.value })
            }
            onBlur={() => setEditing(null)}
            className="text-xl md:text-2xl text-cyan-400 text-center bg-transparent outline-none w-full"
          />
        ) : (
          <p
            onClick={() => setEditing("highlight")}
            className="text-xl md:text-2xl text-cyan-400 cursor-pointer"
          >
            {section.highlight}
          </p>
        )}

        {/* SUBTITLE */}
        {editing === "subtitle" ? (
          <textarea
            value={section.subtitle}
            onChange={(e) =>
              setSection({ ...section, subtitle: e.target.value })
            }
            onBlur={() => setEditing(null)}
            className="text-center w-full bg-transparent outline-none text-white/60"
          />
        ) : (
          <p
            onClick={() => setEditing("subtitle")}
            className="text-white/60 cursor-pointer"
          >
            {section.subtitle}
          </p>
        )}
      </div>

      {/* ================= FAQ LIST ================= */}
      <div className="max-w-3xl mx-auto space-y-4">

        {items.map((item, i) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.01 }}
            className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-3"
          >
            {/* QUESTION */}
            {editing === `q-${i}` ? (
              <input
                value={item.question}
                onChange={(e) => {
                  const updated = [...items];
                  updated[i].question = e.target.value;
                  setItems(updated);
                }}
                onBlur={() => setEditing(null)}
                autoFocus
                className="w-full bg-transparent outline-none font-semibold"
              />
            ) : (
              <h4
                onClick={() => setEditing(`q-${i}`)}
                className="font-semibold cursor-pointer"
              >
                {item.question}
              </h4>
            )}

            {/* ANSWER */}
            {editing === `a-${i}` ? (
              <textarea
                value={item.answer}
                onChange={(e) => {
                  const updated = [...items];
                  updated[i].answer = e.target.value;
                  setItems(updated);
                }}
                onBlur={() => setEditing(null)}
                className="w-full bg-transparent outline-none text-white/70 text-sm"
              />
            ) : (
              <p
                onClick={() => setEditing(`a-${i}`)}
                className="text-white/70 text-sm cursor-pointer"
              >
                {item.answer}
              </p>
            )}
          </motion.div>
        ))}

      </div>

      {/* ================= ACTIONS ================= */}
      <div className="text-center mt-10 space-x-4">

        {/* <button
          onClick={addFAQ}
          className="px-6 py-2 bg-white/10 border border-white/20 rounded-lg"
        >
          + Add FAQ
        </button> */}

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="px-8 py-3 bg-cyan-400 text-black rounded-xl font-semibold"
        >
          {saving ? "Saving..." : "Save Changes"}
        </motion.button>

      </div>

    </section>
  );
}