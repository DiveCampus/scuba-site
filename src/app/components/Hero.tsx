"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMainHero } from "@/services/kadirheroService";

export function Hero() {
  const navigate = useNavigate();

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);

  const [hero, setHero] = useState<any>(null);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    const { data } = await getMainHero();

    setHero(data);
  };

  // CTA link comes ONLY from the DB. If empty/null the button still renders
  // but performs no navigation/action. "#id" smooth-scrolls; else navigates.
  const goTo = (link?: string) => {
    if (!link) return;
    if (link.startsWith("#")) {
      document
        .getElementById(link.slice(1))
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(link);
    }
  };

  if (!hero) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        {/* SEO-only crawler fallback (invisible to users) */}
        <h1 className="sr-only">PADI Scuba Diving Dubai - Open Water, Rescue Diver & Divemaster Courses UAE</h1>
        <p className="sr-only">
          UAE Dive offers PADI-certified scuba diving courses in Dubai and Fujairah.
          From Try Dive experiences to Open Water, Advanced Open Water, Rescue Diver and Divemaster certification.
          Dive sites in Palm Jumeirah, Khor Fakkan and Dibba.
        </p>
        Loading...
      </div>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden font-habara">

      {/* BACKGROUND */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/A59I0374.webp"
          aria-label="Scuba diving in Dubai - underwater video"
          title="Scuba Diving Dubai"
          className="w-full h-full object-cover scale-105"
        >
          <source src="/vid1.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05263C]/60 via-transparent to-[#18476D]/70" />
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-5xl">

        {/* 🔥 TOP TEXT (NOW DYNAMIC) */}
        <p className="uppercase tracking-[3px] text-cyan-300 text-[12px] font-semibold mb-3">
          {hero?.top_text || "Dive Campus Diving Club"}
        </p>

        {/* 🔥 TITLE */}
        <h1 className="text-white text-4xl md:text-6xl font-semibold leading-[1.1]">
          {hero?.title}{" "}

          <span className="text-[#38BDF8] inline whitespace-nowrap">
            {hero?.subtitle}
          </span>
        </h1>

        {/* 🔥 DESCRIPTION */}
        <p className="mt-5 text-white/85 text-[15px] md:text-[16px] font-normal leading-[1.7] max-w-3xl mx-auto">
          {hero?.description}
        </p>

        {/* 🔥 CTA BUTTONS — primary + secondary, DB-driven with fallbacks.
            "#id" smooth-scrolls; anything else navigates a route. */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => goTo(hero?.primary_cta_link)}
            className="w-full sm:w-auto px-10 py-4 bg-cyan-400 text-black rounded-full"
          >
            {hero?.primary_cta_text || "Get Started"}
          </button>

          <button
            onClick={() => goTo(hero?.secondary_cta_link)}
            className="w-full sm:w-auto px-10 py-4 border border-white/30 text-white rounded-full hover:bg-white/10 hover:border-white/50 transition"
          >
            {hero?.secondary_cta_text || "Explore Courses"}
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