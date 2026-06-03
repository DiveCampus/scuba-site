"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WhatsAppButton from "../WhatsAppButton";

export default function Divetry() {
  const [selected, setSelected] = useState<"dubai" | "fujairah">("dubai");
  const navigate = useNavigate();

  const isDubai = selected === "dubai";

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden font-habara text-white bg-cover bg-center"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,0.58), rgba(0,0,0,0.82)),
          url('/img3.webp')
        `,
      }}
    >
      {/* 🔥 CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 md:px-6">

        {/* TOP TAG */}
        <div className="mb-6 px-5 py-2 rounded-full bg-white/10 backdrop-blur text-[11px] tracking-[3px] md:tracking-[4px] text-white/90 border border-white/10">
          100% BEGINNER FRIENDLY · NO SWIMMING REQUIRED
        </div>

        {/* HEADING LABEL */}
        <p className="text-[12px] font-semibold tracking-[3px] text-cyan-300 mb-3 uppercase">
          FIRST-TIME SCUBA EXPERIENCE
        </p>

        {/* MAIN HEADING */}
        <h1 className="text-4xl md:text-6xl font-semibold leading-[1.18] md:leading-[1.15] tracking-[1.5px] md:tracking-[2.5px] max-w-5xl">
          FOR COMPLETE BEGINNERS
        </h1>

        {/* SUBTEXT */}
        <p className="text-cyan-300 text-sm md:text-[15px] tracking-[2px] leading-relaxed mt-5 mb-8">
          OPEN TO AGES 10 & ABOVE
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
              BEACH TRY DIVE
            </p>

            <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] mb-4">
              DUBAI
            </h3>

            <p className="text-[14px] md:text-[15px] text-gray-300 leading-relaxed tracking-[1px] mb-6">
              Walk-in Beach Entry <br />
              Palm Jumeirah Beach <br />
              Quick & Convenient
            </p>

            <h2 className="text-2xl font-semibold tracking-[2px] leading-relaxed">
              AED 350
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
              BOAT TRY DIVE
            </p>

            <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] mb-4">
              FUJAIRAH REEFS
            </h3>

            <p className="text-[14px] md:text-[15px] text-gray-300 leading-relaxed tracking-[1px] mb-6">
              Natural Corals <br />
              Scenic Boat Trip <br />
              Exotic Marine Life
            </p>

            <h2 className="text-2xl font-semibold tracking-[2px] leading-relaxed">
              AED 450
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
          {isDubai
            ? "BOOK DUBAI EXPERIENCE"
            : "BOOK FUJAIRAH EXPERIENCE"}
        </button>

        {/* WHATSAPP */}
        <WhatsAppButton variant="outline" className="mt-5">
          QUICK BOOK VIA WHATSAPP
        </WhatsAppButton>

      </div>
    </section>
  );
}
