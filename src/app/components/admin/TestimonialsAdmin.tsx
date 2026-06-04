"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  getTestimonials,
  updateTestimonial,
} from "@/services/testimonialService";

const FALLBACK_TITLE = "TRAINING QUALITY RAISED.";
const FALLBACK_SUBTITLE =
  "DON’T FALL FOR SMALL CLASS SIZE AND UNLIMITED TRAINING CLAIMS. HERE’S HOW WE DELIVER EXCELLENCE THAT TRULY MATTERS.";

export function TrainingQuality() {
  const [data, setData] = useState<any[]>([]);
  const [activeMainTab, setActiveMainTab] = useState("training environment");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Shared section header (single source of truth across all rows)
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionSubtitle, setSectionSubtitle] = useState("");
  // Per-category tab title (single source of truth per category), keyed by
  // lowercase category.
  const [tabTitles, setTabTitles] = useState<Record<string, string>>({});
  const [savingSection, setSavingSection] = useState(false);

  // Unique categories in DB/position order (key = lowercase category).
  const categories = data.reduce(
    (acc: { key: string; category: string }[], item) => {
      const key = item.category?.toLowerCase();
      if (key && !acc.some((c) => c.key === key)) {
        acc.push({ key, category: item.category });
      }
      return acc;
    },
    []
  );

  // ================= LOAD =================
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const response = await getTestimonials();

    if (response?.error) {
      console.error("🚨 FETCH ERROR:", response.error);
      return;
    }

    const rows = response.data || [];
    setData(rows);

    // Prefill section fields from the first row (shared section)
    const sharedSection = rows[0];
    setSectionTitle(sharedSection?.section_title ?? "");
    setSectionSubtitle(sharedSection?.section_subtitle ?? "");

    // Prefill tab titles from the first row of each category.
    const tt: Record<string, string> = {};
    rows.forEach((r: any) => {
      const key = r.category?.toLowerCase();
      if (key && !(key in tt)) tt[key] = r.tab_title ?? "";
    });
    setTabTitles(tt);
  };

  // ================= CHANGE =================
  const handleChange = (id: string, field: string, value: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // ================= SAVE ROW =================
  const handleSave = async (id: string) => {
    const row = data.find((item) => item.id === id);
    if (!row) return;

    const response = await updateTestimonial(id, row);

    if (response?.error) {
      console.error("❌ UPDATE ERROR:", response.error);
    }

    setEditingId(null);
  };

  // ================= SAVE SECTION (ALL ROWS) =================
  const handleSaveSection = async () => {
    if (!data.length) return;

    setSavingSection(true);

    try {
      // section_title/section_subtitle are global; tab_title is applied to
      // every row sharing that row's category (single source of truth).
      await Promise.all(
        data.map((row) =>
          updateTestimonial(row.id, {
            ...row,
            section_title: sectionTitle,
            section_subtitle: sectionSubtitle,
            tab_title: tabTitles[row.category?.toLowerCase() ?? ""] ?? row.tab_title,
          })
        )
      );

      // Keep local state consistent so the values persist in the UI
      setData((prev) =>
        prev.map((row) => ({
          ...row,
          section_title: sectionTitle,
          section_subtitle: sectionSubtitle,
          tab_title: tabTitles[row.category?.toLowerCase()] ?? row.tab_title,
        }))
      );
    } catch (err) {
      console.error("❌ SAVE SECTION ERROR:", err);
    } finally {
      setSavingSection(false);
    }
  };

  // ================= TABLE =================
  const renderTable = (category: string) => {
    const filtered = data.filter(
      (item) =>
        item.category?.toLowerCase() === category.toLowerCase()
    );

    return (
      <div className="w-full overflow-x-auto flex justify-center font-habara">
        <table className="w-full max-w-5xl border border-white/10 rounded-xl overflow-hidden backdrop-blur-md bg-white/5">

          {/* HEADER */}
          <thead className="bg-white/5 text-white/70 text-xs uppercase tracking-[2px]">
            <tr>
              <th className="p-5 text-left">Feature</th>
              <th className="p-5 text-center">Others</th>
              <th className="p-5 text-center text-cyan-300">
                Dive Campus
              </th>
              <th className="p-5 text-center">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="text-white/80 text-sm">
            {filtered.map((item) => {
              const isEditing = editingId === item.id;

              return (
                <tr
                  key={item.id}
                  className={`border-t border-white/10 hover:bg-white/5 ${
                    isEditing ? "bg-white/10" : ""
                  }`}
                >
                  {/* FEATURE */}
                  <td className="p-5">
                    {isEditing ? (
                      <input
                        value={item.feature}
                        onChange={(e) =>
                          handleChange(item.id, "feature", e.target.value)
                        }
                        className="bg-black/40 w-full p-2 rounded border border-cyan-400"
                      />
                    ) : (
                      <span
                        onClick={() => setEditingId(item.id)}
                        className="cursor-pointer"
                      >
                        {item.feature}
                      </span>
                    )}
                  </td>

                  {/* OTHERS */}
                  <td className="p-5 text-center text-red-400">
                    {isEditing ? (
                      <input
                        value={item.others}
                        onChange={(e) =>
                          handleChange(item.id, "others", e.target.value)
                        }
                        className="bg-black/40 w-full p-2 rounded text-center border border-cyan-400"
                      />
                    ) : (
                      <span
                        onClick={() => setEditingId(item.id)}
                        className="cursor-pointer"
                      >
                        ✕ {item.others}
                      </span>
                    )}
                  </td>

                  {/* DIVE CAMPUS */}
                  <td className="p-5 text-center">
                    {isEditing ? (
                      <input
                        value={item.dive_campus}
                        onChange={(e) =>
                          handleChange(item.id, "dive_campus", e.target.value)
                        }
                        className="bg-black/40 w-full p-2 rounded text-center border border-cyan-400"
                      />
                    ) : (
                      <span
                        onClick={() => setEditingId(item.id)}
                        className="inline-block px-4 py-2 border border-cyan-400/30 rounded-lg text-cyan-300 bg-cyan-400/10 cursor-pointer"
                      >
                        ✓ {item.dive_campus}
                      </span>
                    )}
                  </td>

                  {/* ACTION */}
                  <td className="p-5 flex gap-2 justify-center">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => handleSave(item.id)}
                          className="bg-green-400 text-black px-3 py-1 rounded"
                        >
                          Save
                        </button>

                        <button
                          onClick={() => {
                            setEditingId(null);
                            load();
                          }}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditingId(item.id)}
                        className="bg-white/10 px-3 py-1 rounded hover:bg-cyan-400 hover:text-black"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  // ================= UI =================
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#18476D] via-[#123a5a] to-[#0b2c45] text-white">

      <div className="max-w-[1500px] mx-auto px-6">

        {/* HEADING (live preview of editable title) */}
        <h2 className="text-center text-5xl font-semibold mb-8 uppercase">
          {sectionTitle || FALLBACK_TITLE}
        </h2>

        {/* ===== SECTION EDITOR ===== */}
        <div className="max-w-3xl mx-auto mb-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 shadow-[0_0_40px_rgba(34,211,238,0.08)]">
          <h3 className="text-cyan-300 text-xs font-semibold uppercase tracking-[3px] mb-6">
            Section Header
          </h3>

          {/* SECTION TITLE */}
          <label className="block text-xs uppercase tracking-[2px] text-white/50 mb-2">
            Section Title
          </label>
          <input
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            placeholder={FALLBACK_TITLE}
            className="w-full bg-black/40 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-3 outline-none transition mb-5"
          />

          {/* SECTION SUBTITLE */}
          <label className="block text-xs uppercase tracking-[2px] text-white/50 mb-2">
            Section Subtitle
          </label>
          <textarea
            value={sectionSubtitle}
            onChange={(e) => setSectionSubtitle(e.target.value)}
            placeholder={FALLBACK_SUBTITLE}
            rows={3}
            className="w-full bg-black/40 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-3 outline-none transition resize-none leading-relaxed"
          />

          {/* TAB TITLES (one per category — applies to all rows in category) */}
          <label className="block text-xs uppercase tracking-[2px] text-white/50 mt-6 mb-3">
            Tab Titles
          </label>
          <div className="space-y-3">
            {categories.map((c) => (
              <div key={c.key}>
                <span className="block text-[11px] uppercase tracking-[1px] text-white/40 mb-1">
                  {c.category}
                </span>
                <input
                  value={tabTitles[c.key] ?? ""}
                  onChange={(e) =>
                    setTabTitles((prev) => ({
                      ...prev,
                      [c.key]: e.target.value,
                    }))
                  }
                  placeholder={c.category.toUpperCase()}
                  className="w-full bg-black/40 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-3 outline-none transition"
                />
              </div>
            ))}
          </div>

          {/* SAVE */}
          <button
            onClick={handleSaveSection}
            disabled={savingSection || !data.length}
            className="mt-6 w-full md:w-auto bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold rounded-xl px-8 py-3 hover:scale-[1.01] transition disabled:opacity-50"
          >
            {savingSection ? "Saving…" : "Save Section & Tabs"}
          </button>
        </div>

        {/* TABS */}
        <div className="flex justify-center gap-12 mb-16 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.key}
              onMouseEnter={() => setActiveMainTab(c.key)}
              className="relative uppercase text-white/80"
            >
              {tabTitles[c.key]?.trim() || c.category}

              {activeMainTab === c.key && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 -bottom-2 w-full h-[3px] bg-cyan-300"
                />
              )}
            </button>
          ))}
        </div>

        {/* TABLE */}
        {renderTable(activeMainTab)}
      </div>
    </section>
  );
}
