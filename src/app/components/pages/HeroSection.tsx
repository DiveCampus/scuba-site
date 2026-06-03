"use client";

import { getMainHero, type HeroOpen } from "@/services/heroServiceOpen";
import { PricingCard } from "../PricingCard";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();
  const [hero, setHero] = useState<HeroOpen | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchHero = async () => {
      const { data } = await getMainHero();

      if (!active) return;

      if (data) setHero(data);
      setLoading(false);
    };

    fetchHero();

    return () => {
      active = false;
    };
  }, []);

  const goTo = (link?: string) => {
    if (!link) return;
    if (/^https?:\/\//.test(link)) {
      window.location.href = link;
      return;
    }
    navigate(link);
  };

  // LOADING
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        {/* SEO-only crawler fallback (invisible to users) */}
        <h1 className="sr-only">PADI Open Water Diver Course Dubai</h1>
        <p className="sr-only">
          Get your PADI Open Water Diver certification in Dubai with UAE Dive.
          eLearning, pool sessions and open-water dives with PADI-certified
          instructors.
        </p>
        Loading...
      </div>
    );
  }

  // NO DATA
  if (!hero) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <h1 className="sr-only">PADI Open Water Diver Course Dubai</h1>
        No Hero Data Found
      </div>
    );
  }

  const hasPricing = Boolean(hero.price || hero.old_price);

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{ fontFamily: "Harabara, sans-serif" }}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="/1.avif"
          alt="PADI Open Water Diver Course Dubai - underwater scuba diving"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#02182b]/70" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">
        {/* TOP TEXT */}
        {hero.top_text && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 px-5 py-2 text-[12px] font-semibold tracking-[3px] uppercase border border-cyan-300/40 rounded-full text-cyan-200"
          >
            {hero.top_text}
          </motion.div>
        )}

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-semibold tracking-[1px] leading-[1.1] max-w-4xl"
        >
          {hero.title}{" "}
          {hero.subtitle && (
            <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              {hero.subtitle}
            </span>
          )}
        </motion.h1>

        {/* DESCRIPTION */}
        {hero.description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 text-[15px] md:text-[16px] font-normal leading-[1.7] text-white/70 max-w-2xl"
          >
            {hero.description}
          </motion.p>
        )}

        {/* PRICE */}
        {hasPricing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8"
          >
            <PricingCard price={hero.price} oldPrice={hero.old_price} />
          </motion.div>
        )}

        {/* CTA */}
        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center gap-4">
          {hero.primary_cta_text && (
            <button
              onClick={() => goTo(hero.primary_cta_link)}
              className="px-8 py-3 bg-cyan-400 text-[#02182b] font-semibold rounded-lg transition hover:bg-cyan-300"
            >
              {hero.primary_cta_text}
            </button>
          )}

          {hero.secondary_cta_text && (
            <button
              onClick={() => goTo(hero.secondary_cta_link)}
              className="px-8 py-3 border border-white/30 text-white font-semibold rounded-lg transition hover:bg-white/10"
            >
              {hero.secondary_cta_text}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
