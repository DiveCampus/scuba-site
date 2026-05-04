"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { getCompare } from "@/services/compareService";

export function ComparisonSection() {
  const [section, setSection] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      console.log("🚀 Fetching compare...");

      const { section, items } = await getCompare();

      console.log("📦 SECTION:", section);
      console.log("📦 ITEMS:", items);

      setSection(section);
      setData(items || []);
    };

    load();
  }, []);

  if (!section) return null;

  return (
    <>
      <section className="relative py-32 bg-[#02131d] text-white overflow-hidden">

        {/* HEADER */}
        <div className="text-center mb-16 px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            {section.title}{" "}
            <span className="text-cyan-400">
              {section.highlight}
            </span>
          </h2>

          <p className="text-white/60 max-w-2xl mx-auto">
            {section.subtitle}
          </p>
        </div>

        {/* TABLE */}
        <div className="max-w-6xl mx-auto px-6">

          <div className="rounded-2xl border border-white/10 overflow-hidden backdrop-blur-xl bg-white/5">

            {/* HEAD */}
            <div className="grid grid-cols-3 text-sm text-white/50 border-b border-white/10">
              <div className="p-5">FEATURE</div>
              <div className="p-5 text-center">OTHERS</div>
              <div className="p-5 text-center text-cyan-400 font-semibold">
                NEMO DIVING
              </div>
            </div>

            {/* DYNAMIC ROWS */}
            {data.map((row, i) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-3 border-b border-white/10 last:border-none"
              >
                {/* FEATURE */}
                <div className="p-5 text-white/80">
                  {row.feature}
                </div>

                {/* OTHERS */}
                <div className="p-5 flex items-center justify-center gap-2 text-red-400">
                  <X size={16} />
                  {row.others}
                </div>

                {/* NEMO */}
                <div className="p-5 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-5 py-2 rounded-lg border border-cyan-400/30 bg-cyan-400/5 text-cyan-300">
                    <Check size={16} />
                    {row.nemo}
                  </div>
                </div>
              </motion.div>
            ))}

          </div>

        </div>
      </section>
    </>
  );
}