"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WhatsAppButton from "../WhatsAppButton";
import { getDivetry } from "@/services/DivetryService";

// Fallback content — keeps the section pixel-identical when the DB is empty.
const DEFAULT_SECTION = {
  background_image: "/img3.webp",
  top_tag: "100% BEGINNER FRIENDLY · NO SWIMMING REQUIRED",
  label: "FIRST-TIME SCUBA EXPERIENCE",
  title: "FOR COMPLETE BEGINNERS",
  subtitle: "OPEN TO AGES 10 & ABOVE",
};

const DEFAULT_DUBAI = {
  location_slug: "dubai",
  badge: "BEACH TRY DIVE",
  title: "DUBAI",
  description: "Walk-in Beach Entry\nPalm Jumeirah Beach\nQuick & Convenient",
  price: 350,
  button_text: "BOOK DUBAI EXPERIENCE",
};

const DEFAULT_FUJAIRAH = {
  location_slug: "fujairah",
  badge: "BOAT TRY DIVE",
  title: "FUJAIRAH REEFS",
  description: "Natural Corals\nScenic Boat Trip\nExotic Marine Life",
  price: 450,
  button_text: "BOOK FUJAIRAH EXPERIENCE",
};

export default function Divetry() {
  const [selected, setSelected] = useState<"dubai" | "fujairah">("dubai");
  const [section, setSection] = useState<any>(DEFAULT_SECTION);
  const [dubai, setDubai] = useState<any>(DEFAULT_DUBAI);
  const [fujairah, setFujairah] = useState<any>(DEFAULT_FUJAIRAH);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { section, cards } = await getDivetry();

    if (section) setSection(section);

    if (cards && cards.length) {
      const d = cards.find((c: any) => c.location_slug === "dubai");
      const f = cards.find((c: any) => c.location_slug === "fujairah");
      if (d) setDubai(d);
      if (f) setFujairah(f);
    }
  };

  const isDubai = selected === "dubai";
  const active = isDubai ? dubai : fujairah;

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden font-habara text-white bg-cover bg-center"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,0.58), rgba(0,0,0,0.82)),
          url('${section.background_image}')
        `,
      }}
    >
      {/* 🔥 CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 md:px-6">

        {/* TOP TAG */}
        <div className="mb-6 px-5 py-2 rounded-full bg-white/10 backdrop-blur text-[11px] tracking-[3px] md:tracking-[4px] text-white/90 border border-white/10">
          {section.top_tag}
        </div>

        {/* HEADING LABEL */}
        <p className="text-[12px] font-semibold tracking-[3px] text-cyan-300 mb-3 uppercase">
          {section.label}
        </p>

        {/* MAIN HEADING */}
        <h1 className="text-4xl md:text-6xl font-semibold leading-[1.18] md:leading-[1.15] tracking-[1.5px] md:tracking-[2.5px] max-w-5xl">
          {section.title}
        </h1>

        {/* SUBTEXT */}
        <p className="text-cyan-300 text-sm md:text-[15px] tracking-[2px] leading-relaxed mt-5 mb-8">
          {section.subtitle}
        </p>

        {/* 🔥 CARDS */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">

          {/* DUBAI */}
          <div
            onClick={() => setSelected("dubai")}
            className={`relative w-[260px] cursor-pointer rounded-xl border transition-all duration-300 p-6 backdrop-blur-md
            ${
              isDubai
                ? "bg-cyan-500/20 border-cyan-400 shadow-lg scale-105"
                : "bg-white/5 border-white/20 hover:scale-105"
            }`}
          >
            <p className="text-[12px] font-semibold tracking-[3px] text-cyan-300 mb-3 uppercase">
              {dubai.badge}
            </p>

            <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] mb-4">
              {dubai.title}
            </h3>

            <p className="text-[14px] md:text-[15px] text-gray-300 leading-relaxed tracking-[1px] mb-6 whitespace-pre-line">
              {dubai.description}
            </p>

            <h2 className="text-2xl font-semibold tracking-[2px] leading-relaxed">
              AED {dubai.price}
            </h2>

            {/* ACTIVE DOT */}
            {isDubai && (
              <div className="absolute top-4 right-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
            )}
          </div>

          {/* FUJAIRAH */}
          <div
            onClick={() => setSelected("fujairah")}
            className={`relative w-[260px] cursor-pointer rounded-xl border transition-all duration-300 p-6 backdrop-blur-md
            ${
              !isDubai
                ? "bg-cyan-500/20 border-cyan-400 shadow-lg scale-105"
                : "bg-white/5 border-white/20 hover:scale-105"
            }`}
          >
            <p className="text-[12px] font-semibold tracking-[3px] text-cyan-300 mb-3 uppercase">
              {fujairah.badge}
            </p>

            <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] mb-4">
              {fujairah.title}
            </h3>

            <p className="text-[14px] md:text-[15px] text-gray-300 leading-relaxed tracking-[1px] mb-6 whitespace-pre-line">
              {fujairah.description}
            </p>

            <h2 className="text-2xl font-semibold tracking-[2px] leading-relaxed">
              AED {fujairah.price}
            </h2>

            {/* ACTIVE DOT */}
            {!isDubai && (
              <div className="absolute top-4 right-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 🔥 CTA */}
        <button
          onClick={() => navigate("/booking?course=try-dive")}
          className="mt-10 px-7 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-md transition tracking-[2px] text-sm leading-relaxed"
        >
          {active.button_text}
        </button>

        {/* WHATSAPP */}
        <WhatsAppButton
          message="Hi! I'd like to book a Try Dive."
          variant="outline"
          className="mt-5"
        >
          QUICK BOOK VIA WHATSAPP
        </WhatsAppButton>

      </div>
    </section>
  );
}
