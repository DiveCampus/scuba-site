"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getWhyCards } from "@/services/whyService";

export function WhyChooseUs() {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ================= LOAD =================
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    console.log("📡 Fetching WHY cards...");

    const { data, error } = await getWhyCards();

    console.log("📦 DATA:", data);
    console.log("❌ ERROR:", error);

    if (!error) {
      setCards(data || []);
    }

    setLoading(false);
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="text-white text-center py-20">
        Loading...
      </div>
    );
  }

  // ================= UI =================
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#18476D] via-[#123a5a] to-[#0b2c45] overflow-hidden font-habara">

      {/* GLOW */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full" />

      <div className="relative max-w-[1800px] mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[36px] md:text-[52px] font-semibold tracking-[1px] leading-[1.1] text-white mb-4">
            DiveCampus <span className="text-cyan-300">EXCLUSIVES</span>
          </h2>

          <p className="text-white/80 text-[15px] md:text-[16px] font-normal leading-[1.7] mt-5">
            This is not about certification. This is true mastery.
          </p>
        </div>

        {/* CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-6 flex-wrap"
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -12 }}
              className="group relative w-[280px] h-[400px] overflow-hidden cursor-pointer rounded-[24px] backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-cyan-300 hover:bg-white/15"
            >
              {/* IMAGE */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:opacity-0 group-hover:scale-110"
              />

              {/* HOVER BG */}
              <div className="absolute inset-0 bg-[#02131d] opacity-0 group-hover:opacity-100 transition-all duration-500" />

              {/* TITLE */}
              <div className="absolute bottom-6 left-6 z-20 group-hover:opacity-0 transition">
                <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] text-white">
                  {card.title}
                </h3>
              </div>

              {/* CONTENT */}
              <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center px-6 overflow-y-auto">
                <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] text-cyan-300 mb-4">
                  {card.title}
                </h3>

                <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed whitespace-pre-line">
                  {card.description}
                </p>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}