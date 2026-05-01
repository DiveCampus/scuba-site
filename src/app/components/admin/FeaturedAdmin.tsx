"use client";

import { getFeatured, updateFeatured } from "@/services/FeatureService";
import { useEffect, useState } from "react";

export function FeaturedAdmin() {
  const [data, setData] = useState<any>(null);
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    console.log("🚀 Component Mounted");
    load();
  }, []);

  const load = async () => {
    console.log("📡 Fetching featured data...");

    const response = await getFeatured();

    console.log("📦 FULL RESPONSE:", response);

    if (response.error) {
      console.error("❌ ERROR:", response.error);
      return;
    }

    setData(response.data);
  };

  const handleChange = (field: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    console.log("💾 Saving:", data);

    const { error } = await updateFeatured(data.id, data);

    if (error) {
      console.error("❌ UPDATE ERROR:", error);
    } else {
      console.log("✅ SAVED");
    }

    setEditing(null);
  };

  if (!data) {
    return (
      <div className="text-white text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <section className="py-32 bg-gradient-to-br from-[#18476D] via-[#123a5a] to-[#0b2c45] text-center px-6">

      {/* SUBTITLE */}
      {editing === "subtitle" ? (
        <div className="flex flex-col items-center gap-3">
          <input
            value={data.subtitle || ""}
            onChange={(e) =>
              handleChange("subtitle", e.target.value)
            }
            className="bg-white/10 text-white p-2 rounded text-center"
          />

          <button
            onClick={handleSave}
            className="bg-green-400 text-black px-4 py-1 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <p
          onClick={() => setEditing("subtitle")}
          className="text-white/80 text-lg mb-4 uppercase cursor-pointer"
        >
          {data.subtitle}
        </p>
      )}

      {/* TITLE */}
      {editing === "title" ? (
        <div className="flex flex-col items-center gap-3">
          <textarea
            value={data.title || ""}
            onChange={(e) =>
              handleChange("title", e.target.value)
            }
            className="bg-white/10 text-white p-3 rounded text-center w-full max-w-3xl"
          />

          <button
            onClick={handleSave}
            className="bg-green-400 text-black px-5 py-2 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <h2
          onClick={() => setEditing("title")}
          className="text-white text-3xl md:text-5xl font-bold uppercase cursor-pointer"
        >
          {data.title}
        </h2>
      )}

    </section>
  );
}