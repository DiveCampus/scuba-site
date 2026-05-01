"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  getTestimonials,
  updateTestimonial,
} from "@/services/testimonialService";

export function TestimonialsAdmin() {
  const [data, setData] = useState<any[]>([]);
  const [activeMainTab, setActiveMainTab] = useState("training environment");
  const [editingId, setEditingId] = useState<string | null>(null);

  // ================= LOAD =================
  useEffect(() => {
    console.log("🚀 Component Mounted");
    load();
  }, []);

  const load = async () => {
    console.log("📡 Fetching testimonials...");

    const response = await getTestimonials();

    console.log("📦 FULL RESPONSE:", response);
    console.log("📦 DATA:", response?.data);
    console.log("❌ ERROR:", response?.error);

    if (response?.error) {
      console.error("🚨 FETCH ERROR:", response.error);
      return;
    }

    setData(response.data || []);
  };

  // ================= CHANGE =================
  const handleChange = (id: string, field: string, value: string) => {
    console.log(`✏️ Editing ${field}:`, value);

    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // ================= SAVE =================
  const handleSave = async (id: string) => {
    const row = data.find((item) => item.id === id);

    console.log("💾 SAVING ROW:", row);

    const response = await updateTestimonial(id, row);

    console.log("📦 UPDATE RESPONSE:", response);
    console.log("❌ UPDATE ERROR:", response?.error);

    if (!response?.error) {
      console.log("✅ UPDATE SUCCESS");
    }

    setEditingId(null);
  };

  // ================= TABLE =================
  const renderTable = (category: string) => {
    console.log("📊 FILTERING FOR:", category);

    const filtered = data.filter(
      (item) =>
        item.category?.toLowerCase() === category.toLowerCase()
    );

    console.log("📊 FILTERED DATA:", filtered);

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

  // ================= DEBUG =================
  console.log("🎯 CURRENT DATA:", data);
  console.log("🎯 ACTIVE TAB:", activeMainTab);

  // ================= UI =================
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#18476D] via-[#123a5a] to-[#0b2c45] text-white">

      <div className="max-w-[1500px] mx-auto px-6">

        {/* HEADING */}
        <h2 className="text-center text-5xl font-semibold mb-8 uppercase">
          TRAINING QUALITY <span className="text-cyan-300">RAISED.</span>
        </h2>

        {/* TABS */}
        <div className="flex justify-center gap-12 mb-16 flex-wrap">
          {[
            "training environment",
            "instructor quality",
            "inclusions",
          ].map((item, i) => (
            <button
              key={i}
              onMouseEnter={() => {
                console.log("🖱️ TAB SWITCH:", item);
                setActiveMainTab(item);
              }}
              className="relative uppercase text-white/80"
            >
              {item}

              {activeMainTab === item && (
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