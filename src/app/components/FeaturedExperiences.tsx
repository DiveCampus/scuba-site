"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getFeatured } from "@/services/FeatureService";

export function FeaturedExperiences() {
  const [activePopup, setActivePopup] = useState<null | "dubai" | "khor">(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    console.log("📡 Fetching featured text...");
    const { data, error } = await getFeatured();

    console.log("📦 FEATURED DATA:", data);

    if (error) {
      console.error("❌ ERROR:", error);
      return;
    }

    setData(data);
  };

  return (
    <section className="relative w-full h-[650px] overflow-hidden font-habara">

      {/* VIDEO (UNCHANGED) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/vid1.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/45" />

      {/* 🔥 DYNAMIC TEXT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        
        <p className="text-white/80 text-xl mb-4 uppercase">
          {data?.subtitle || "SPECIAL PROJECTS"}
        </p>

        <h2 className="text-white text-4xl md:text-6xl font-bold max-w-5xl uppercase">
          {data?.title || "LET’S MAKE YOUR EVENT OR PROJECT EXTRAORDINARY"}
        </h2>

      </div>

      {/* POPUP (UNCHANGED) */}
      <AnimatePresence>
        {activePopup && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePopup(null)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 40 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[1000px] p-6 rounded-[28px] bg-white/10 backdrop-blur-xl border border-white/20 text-white"
            >
              {/* SAME POPUP CODE */}
              <h3 className="text-xl">Popup Content</h3>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}