"use client";

import { useEffect, useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import {
  getLocations,
  updateLocation,
} from "@/services/locationService";

export default function LocationAdmin() {
  const [locations, setLocations] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  /* ================= LOAD ================= */
  useEffect(() => {
    const load = async () => {
      console.log("🚀 Loading locations...");
      const { data } = await getLocations();
      console.log("📦 Locations:", data);
      setLocations(data || []);
    };

    load();
  }, []);

  /* ================= CHANGE ================= */
  const handleChange = (index: number, key: string, value: any) => {
    const updated = [...locations];
    updated[index][key] = value;
    setLocations(updated);
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    setSaving(true);

    console.log("💾 Saving locations:", locations);

    await Promise.all(locations.map(updateLocation));

    setSaving(false);

    console.log("✅ Saved successfully");
  };

  if (!locations.length) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <section className="py-28 bg-gradient-to-b from-[#f8fafc] to-[#eef2f6]">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">

        {locations.map((loc, i) => (
          <motion.div
            key={loc.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
          >

            {/* HEADER */}
            <div className="text-center mb-6">

              {/* TITLE */}
              {editing === `title-${i}` ? (
                <input
                  value={loc.title}
                  onChange={(e) =>
                    handleChange(i, "title", e.target.value)
                  }
                  onBlur={() => setEditing(null)}
                  autoFocus
                  className="text-sm tracking-widest text-gray-400 text-center w-full outline-none"
                />
              ) : (
                <h3
                  onClick={() => setEditing(`title-${i}`)}
                  className="text-sm tracking-widest text-gray-400 cursor-pointer"
                >
                  {loc.title}
                </h3>
              )}

              {/* RATING */}
              <div className="flex justify-center gap-2 mt-2">

                {editing === `rating-${i}` ? (
                  <input
                    value={loc.rating}
                    onChange={(e) =>
                      handleChange(i, "rating", e.target.value)
                    }
                    onBlur={() => setEditing(null)}
                    className="text-sm text-center outline-none"
                  />
                ) : (
                  <p
                    onClick={() => setEditing(`rating-${i}`)}
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    {loc.rating} ⭐⭐⭐⭐⭐
                  </p>
                )}

                {editing === `reviews-${i}` ? (
                  <input
                    value={loc.reviews}
                    onChange={(e) =>
                      handleChange(i, "reviews", e.target.value)
                    }
                    onBlur={() => setEditing(null)}
                    className="text-xs text-gray-400 outline-none"
                  />
                ) : (
                  <span
                    onClick={() => setEditing(`reviews-${i}`)}
                    className="text-gray-400 text-xs cursor-pointer"
                  >
                    {loc.reviews}
                  </span>
                )}

              </div>
            </div>

            {/* INFO */}
            <div className="space-y-4 text-sm text-gray-600 mb-6">

              {/* ADDRESS */}
              <div className="flex gap-3">
                <MapPin className="text-cyan-500 w-5 h-5 mt-1" />

                {editing === `address-${i}` ? (
                  <textarea
                    value={loc.address}
                    onChange={(e) =>
                      handleChange(i, "address", e.target.value)
                    }
                    onBlur={() => setEditing(null)}
                    className="w-full outline-none"
                  />
                ) : (
                  <span
                    onClick={() => setEditing(`address-${i}`)}
                    className="cursor-pointer"
                  >
                    {loc.address}
                  </span>
                )}
              </div>

              {/* EMAIL */}
              <div className="flex gap-3">
                <Mail className="text-cyan-500 w-5 h-5" />

                {editing === `email-${i}` ? (
                  <input
                    value={loc.email}
                    onChange={(e) =>
                      handleChange(i, "email", e.target.value)
                    }
                    onBlur={() => setEditing(null)}
                    className="w-full outline-none"
                  />
                ) : (
                  <span
                    onClick={() => setEditing(`email-${i}`)}
                    className="cursor-pointer"
                  >
                    {loc.email}
                  </span>
                )}
              </div>

              {/* PHONE */}
              <div className="flex gap-3">
                <Phone className="text-cyan-500 w-5 h-5" />

                {editing === `phone-${i}` ? (
                  <input
                    value={loc.phone}
                    onChange={(e) =>
                      handleChange(i, "phone", e.target.value)
                    }
                    onBlur={() => setEditing(null)}
                    className="w-full outline-none"
                  />
                ) : (
                  <span
                    onClick={() => setEditing(`phone-${i}`)}
                    className="cursor-pointer"
                  >
                    {loc.phone}
                  </span>
                )}
              </div>
            </div>

            {/* MAP */}
            <div className="rounded-xl overflow-hidden border">
              <iframe
                src={loc.map_url}
                className="w-full h-[220px]"
                loading="lazy"
              />
            </div>

            {/* MAP LINK INPUT */}
            <div className="mt-3">
              <input
                value={loc.map_url || ""}
                onChange={(e) =>
                  handleChange(i, "map_url", e.target.value)
                }
                className="w-full text-xs px-3 py-2 border rounded-lg outline-none"
                placeholder="Paste Google Maps embed link..."
              />
            </div>

          </motion.div>
        ))}

      </div>

      {/* SAVE BUTTON */}
      <div className="text-center mt-12">
        <button
          onClick={handleSave}
          className="px-10 py-3 bg-cyan-400 text-black rounded-full font-semibold"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

    </section>
  );
}