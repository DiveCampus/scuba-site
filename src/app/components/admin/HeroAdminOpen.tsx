// src/app/components/admin/HeroAdminOpen.tsx

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  getMainHero,
  updateMainHero,
  type HeroOpen,
} from "@/services/heroServiceOpen";

type SaveStatus = "idle" | "saving" | "saved" | "error";

const EMPTY_HERO: HeroOpen = {
  top_text: "",
  title: "",
  subtitle: "",
  description: "",
  primary_cta_text: "",
  primary_cta_link: "",
  secondary_cta_text: "",
  secondary_cta_link: "",
  price: "",
  old_price: "",
};

const inputClass =
  "w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/30 outline-none transition focus:border-cyan-400 focus:bg-white/[0.14]";

const labelClass =
  "text-cyan-300 text-[12px] font-semibold tracking-[3px] uppercase mb-3 block";

export default function HeroAdminOpen() {
  const [hero, setHero] = useState<HeroOpen | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<SaveStatus>("idle");

  useEffect(() => {
    let active = true;

    const load = async () => {
      const { data } = await getMainHero();

      if (!active) return;

      setHero(data ?? { ...EMPTY_HERO });
      setLoading(false);
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  const setField = <K extends keyof HeroOpen>(key: K, value: HeroOpen[K]) => {
    setHero((prev) => (prev ? { ...prev, [key]: value } : prev));
    setStatus("idle");
  };

  const handleSave = async () => {
    if (!hero) return;

    setStatus("saving");

    const { data, error } = await updateMainHero(hero);

    if (error || !data) {
      setStatus("error");
      return;
    }

    setHero(data);
    setStatus("saved");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02182b] text-white/70">
        Loading Hero...
      </div>
    );
  }

  if (!hero) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02182b] text-white/70">
        Failed to load Hero data.
      </div>
    );
  }

  const saving = status === "saving";

  return (
    <section className="relative min-h-screen overflow-hidden text-white bg-[#02182b]">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="/1.avif"
          alt="bg"
          className="w-full h-full object-cover scale-110 opacity-30"
        />
        <div className="absolute inset-0 bg-[#02182b]/80" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-6 py-16 md:py-20">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-[1px]">
            Hero Admin
          </h1>
          <p className="text-white/60 mt-3">Edit Hero Content &amp; Pricing</p>
        </div>

        {/* MAIN CARD */}
        <div className="rounded-[32px] md:rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-12 shadow-[0_0_80px_rgba(0,0,0,0.35)]">
          {/* TOP TEXT */}
          <div className="mb-8">
            <label className={labelClass}>Top Text</label>
            <input
              value={hero.top_text}
              onChange={(e) => setField("top_text", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* TITLE + SUBTITLE */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className={labelClass}>Title</label>
              <input
                value={hero.title}
                onChange={(e) => setField("title", e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Subtitle</label>
              <input
                value={hero.subtitle}
                onChange={(e) => setField("subtitle", e.target.value)}
                className={`${inputClass} text-cyan-300`}
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-8">
            <label className={labelClass}>Description</label>
            <textarea
              rows={5}
              value={hero.description}
              onChange={(e) => setField("description", e.target.value)}
              className={`${inputClass} rounded-3xl resize-none`}
            />
          </div>

          {/* CTA SECTION */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* PRIMARY CTA */}
            <div className="rounded-[28px] md:rounded-[30px] border border-cyan-400/20 bg-cyan-400/10 p-6">
              <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[0.5px] mb-5 text-cyan-300">
                Primary CTA
              </h3>
              <input
                placeholder="Button Text"
                value={hero.primary_cta_text}
                onChange={(e) => setField("primary_cta_text", e.target.value)}
                className={`${inputClass} mb-4`}
              />
              <input
                placeholder="Button Link"
                value={hero.primary_cta_link}
                onChange={(e) => setField("primary_cta_link", e.target.value)}
                className={inputClass}
              />
            </div>

            {/* SECONDARY CTA */}
            <div className="rounded-[28px] md:rounded-[30px] border border-white/10 bg-white/5 p-6">
              <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[0.5px] mb-5 text-white">
                Secondary CTA
              </h3>
              <input
                placeholder="Button Text"
                value={hero.secondary_cta_text}
                onChange={(e) => setField("secondary_cta_text", e.target.value)}
                className={`${inputClass} mb-4`}
              />
              <input
                placeholder="Button Link"
                value={hero.secondary_cta_link}
                onChange={(e) => setField("secondary_cta_link", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* PRICE SECTION */}
          <div className="mb-10">
            <h2 className="text-[24px] md:text-[28px] font-semibold tracking-[0.5px] mb-6">
              Pricing
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Price</label>
                <input
                  value={hero.price}
                  onChange={(e) => setField("price", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Old Price</label>
                <input
                  value={hero.old_price}
                  onChange={(e) => setField("old_price", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* SAVE */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleSave}
              disabled={saving}
              className="w-full md:w-auto px-10 py-4 rounded-2xl bg-cyan-400 text-[#02182b] font-semibold text-lg transition disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </motion.button>

            {status === "saved" && (
              <span className="text-emerald-400 text-sm">
                ✓ Changes saved
              </span>
            )}
            {status === "error" && (
              <span className="text-red-400 text-sm">
                Something went wrong. Try again.
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
