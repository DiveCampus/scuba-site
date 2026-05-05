"use client";

import { useEffect, useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { getLocations } from "@/services/locationService";

export function LocationSection() {
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      console.log("🚀 Fetching locations UI...");

      const { data, error } = await getLocations();

      console.log("📦 UI Locations:", data);
      console.log("❌ Error:", error);

      setLocations(data || []);
    };

    load();
  }, []);

  if (!locations.length) return null;

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
              <h3 className="text-sm tracking-widest text-gray-400">
                {loc.title}
              </h3>

              <p className="text-sm mt-1 text-gray-600">
                {loc.rating} ⭐⭐⭐⭐⭐{" "}
                <span className="text-gray-400 text-xs">
                  {loc.reviews}
                </span>
              </p>
            </div>

            {/* INFO */}
            <div className="space-y-4 text-sm text-gray-600 mb-6">

              <div className="flex items-start gap-3">
                <MapPin className="text-cyan-500 w-5 h-5 mt-1" />
                <span>{loc.address}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-cyan-500 w-5 h-5" />
                <span>{loc.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-cyan-500 w-5 h-5" />
                <span>{loc.phone}</span>
              </div>
            </div>

            {/* MAP */}
            <div className="rounded-xl overflow-hidden border">
              <iframe
                src={loc.map_url}   // ✅ IMPORTANT FIX
                className="w-full h-[220px]"
                loading="lazy"
              />
            </div>

            {/* BUTTON */}
            <a
              href={loc.map_url}   // ✅ IMPORTANT FIX
              target="_blank"
              className="inline-block mt-4 text-xs text-cyan-600 hover:underline"
            >
              Open in Maps ↗
            </a>

          </motion.div>
        ))}

      </div>
    </section>
  );
}