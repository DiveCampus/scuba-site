"use client";

import { useEffect, useState } from "react";
import {
  getWhyCards,
  updateWhyCard,
} from "@/services/whyService";



export function WhyAdmin() {
  const [data, setData] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    console.log("📡 Fetching WHY cards...");

    const { data, error } = await getWhyCards();

    console.log("📦 DATA:", data);
    console.log("❌ ERROR:", error);

    if (error) return;

    setData(data || []);
  };

  const handleChange = (id: string, field: string, value: string) => {
    console.log(`✏️ Editing ${field}:`, value);

    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = async (id: string) => {
    const row = data.find((i) => i.id === id);

    console.log("💾 Saving:", row);

    const { error } = await updateWhyCard(id, row);

    if (error) {
      console.error("❌ UPDATE ERROR:", error);
    } else {
      console.log("✅ SAVED");
    }

    setEditingId(null);
  };

  return (
    <section className="py-20 bg-[#0b2c45] text-white">

      <h2 className="text-center text-3xl mb-10">
        Why Choose Us - Admin
      </h2>

      <div className="flex flex-wrap justify-center gap-6">

        {data.map((card) => {
          const isEditing = editingId === card.id;

          return (
            <div
              key={card.id}
              className={`
                w-[280px] p-4 rounded-xl
                backdrop-blur-xl bg-white/10 border border-white/20
                ${isEditing ? "ring-2 ring-cyan-300" : ""}
              `}
            >

              {/* IMAGE */}
              {isEditing ? (
                <input
                  value={card.image}
                  onChange={(e) =>
                    handleChange(card.id, "image", e.target.value)
                  }
                  className="w-full mb-3 bg-black/40 p-2 rounded"
                  placeholder="Image URL"
                />
              ) : (
                <img
                  src={card.image}
                  className="w-full h-[150px] object-cover rounded mb-3"
                />
              )}

              {/* TITLE */}
              {isEditing ? (
                <input
                  value={card.title}
                  onChange={(e) =>
                    handleChange(card.id, "title", e.target.value)
                  }
                  className="w-full mb-2 bg-black/40 p-2 rounded"
                />
              ) : (
                <h3 className="font-bold text-lg mb-2">
                  {card.title}
                </h3>
              )}

              {/* DESCRIPTION */}
              {isEditing ? (
                <textarea
                  value={card.description}
                  onChange={(e) =>
                    handleChange(card.id, "description", e.target.value)
                  }
                  className="w-full mb-3 bg-black/40 p-2 rounded"
                />
              ) : (
                <p className="text-sm text-white/80 whitespace-pre-line">
                  {card.description}
                </p>
              )}

              {/* ACTION */}
              <div className="flex gap-2 mt-3">

                {isEditing ? (
                  <>
                    <button
                      onClick={() => handleSave(card.id)}
                      className="bg-green-400 text-black px-3 py-1 rounded"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => {
                        setEditingId(null);
                        load();
                      }}
                      className="bg-red-500 px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditingId(card.id)}
                    className="bg-white/20 px-3 py-1 rounded hover:bg-cyan-400 hover:text-black"
                  >
                    Edit
                  </button>
                )}

              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
}