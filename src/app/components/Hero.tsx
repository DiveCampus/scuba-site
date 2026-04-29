"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { getHero } from "@/services/heroService";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);

  const [hero, setHero] = useState<any>(null);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    const { data, error } = await getHero();

    console.log("🔥 HERO FRONTEND DATA:", data, error);

    setHero(data);
  };

  if (!hero) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden font-habara">

      {/* BACKGROUND */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <video autoPlay muted loop playsInline className="w-full h-full object-cover scale-105">
          <source src="/vid1.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05263C]/60 via-transparent to-[#18476D]/70" />
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-5xl">

        {/* 🔥 TOP TEXT (NOW DYNAMIC) */}
        <p className="uppercase tracking-[6px] text-cyan-300 text-[12px] mb-5">
          {hero?.top_text || "Dive Campus Diving Club"}
        </p>

        {/* 🔥 TITLE */}
        <h1 className="text-white text-4xl md:text-6xl font-semibold leading-tight">
          {hero?.title}{" "}
          <span className="text-[#38BDF8]">
            {hero?.subtitle}
          </span>
        </h1>

        {/* 🔥 DESCRIPTION */}
        <p className="mt-6 text-white/85 max-w-3xl mx-auto">
          {hero?.description}
        </p>

        {/* 🔥 PRICE */}
        <div className="mt-6">
          <p className="text-white/50 line-through">
            AED {hero?.old_price}
          </p>

          <p className="text-3xl font-bold text-cyan-400">
            AED {hero?.price}
          </p>
        </div>

        {/* 🔥 CTA BUTTON (NOW DYNAMIC) */}
        <div className="mt-10">
          <button className="px-10 py-4 bg-cyan-400 text-black rounded-full">
            {hero?.cta_text || "Get Certified →"}
          </button>
        </div>

        {/* LOCATIONS */}
        <div className="mt-10 flex gap-6 justify-center text-white/80">
          <div className="flex items-center gap-2">
            <MapPin size={12} /> Dubai
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={12} /> Khor Fakkan
          </div>
        </div>
      </div>

      {/* SCROLL */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="text-white/60" />
      </motion.div>

    </section>
  );
}