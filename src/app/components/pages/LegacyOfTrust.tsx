"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { getLegacyOfTrust } from "@/services/LegacyOfTrustService";

// Maps a DB icon name -> lucide element. Falls back to ShieldCheck.
const iconMap: any = {
  ShieldCheck: <ShieldCheck size={22} className="text-cyan-400" />,
};

// Fallback content — keeps the section pixel-identical when the DB is empty.
const DEFAULT_SECTION = {
  badge: "THE DIVECAMPUS STANDARD",
  title: "LEGACY OF",
  highlight_word: "TRUST",
  description:
    "Since 2014, we have set the benchmark for Scuba Diving in the UAE, training over 25,000 divers to belong in the water.",
  paragraph:
    "Every session takes place in our Private Resort Environment, ensuring calm waters and zero stress. For the ultimate personal experience, you can upgrade to a Private 1-on-1 Instructor. This ensures absolute focused attention, allowing you to dive comfortably at your own rhythm.",
  icon_name: "ShieldCheck",
};

export function LegacyOfTrust() {
  const [section, setSection] = useState<any>(DEFAULT_SECTION);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { section } = await getLegacyOfTrust();

    if (section) setSection(section);
  };

  return (
    <>
      <section
        className="relative py-16 md:py-24 overflow-hidden bg-[#071c2d]"
        style={{ fontFamily: "Harabara, sans-serif" }}
      >

        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0">

          <div className="absolute top-0 left-0 w-[40%] h-[400px] bg-cyan-500/10 blur-[120px]" />

          <div className="absolute bottom-0 right-0 w-[30%] h-[300px] bg-blue-500/10 blur-[100px]" />

        </div>

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-[570px] mx-auto px-6"
        >

          <div className="relative rounded-3xl border border-cyan-400/30 bg-cyan-500/[0.03] backdrop-blur-xl px-10 py-14 shadow-[0_10px_50px_rgba(0,200,255,0.08)]">

            {/* TOP ICON */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">

              <div className="w-12 h-12 rounded-2xl border border-cyan-400/40 bg-[#071c2d] flex items-center justify-center shadow-lg">

                {iconMap[section.icon_name] ?? iconMap.ShieldCheck}

              </div>

            </div>

            {/* TOP LINES */}
            <div className="absolute top-0 left-0 w-full flex items-center justify-center gap-3">

              <div className="h-px w-20 bg-cyan-400/20" />

              <div className="h-px w-20 bg-cyan-400/20" />

            </div>

            {/* BADGE */}
            <p className="text-center text-[12px] font-semibold tracking-[3px] uppercase text-cyan-400 mt-2">

              {section.badge}

            </p>

            {/* TITLE */}
            <h2 className="mt-3 text-center text-[36px] md:text-[52px] leading-[1.1] tracking-[1px] font-semibold text-white">

              {section.title}{" "}
              <span className="text-white font-bold">
                {section.highlight_word}
              </span>

            </h2>

            {/* DESC */}
            <p className="mt-5 text-center text-[15px] md:text-[16px] font-normal leading-[1.7] text-white/55">

              {section.description}

            </p>

            {/* PARAGRAPH */}
            <p className="mt-8 text-center text-[14px] leading-relaxed text-white/50 max-w-[460px] mx-auto">

              {section.paragraph}

            </p>

          </div>

        </motion.div>

      </section>

      {/* FONT */}
      <style jsx global>{`
        @font-face {
          font-family: 'Harabara';
          src: url('/fonts/Harabara.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }
      `}</style>
    </>
  );
}
