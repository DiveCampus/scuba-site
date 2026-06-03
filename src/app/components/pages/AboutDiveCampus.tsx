"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { IslamProfileModal } from "../IslamProfileModal";
import { SnehaProfileModal } from "../SnehaProfileModal";
import { JustinProfileModal } from "../JustinProfileModal";
import { KhushiProfileModal } from "../KhushiProfileModal";
import { BriceProfileModal } from "./BriceProfileModal";
import { AyeProfileModal } from "./AyeProfileModal";
import { AbdullahProfileModal } from "../AbdullahProfileModal";
import { SurieProfileModal } from "../SurieProfileModal";

const team = [
  { role: "Founder", name: "ISLAM" },
  { role: "Co-Founder", name: "SNEHA" },
  { role: "Lead Instructor", name: "Justin" },
  { role: "IDC Staff Instructor", name: "KHUSHI" },
  { role: "Dive Master", name: "BRICE" },
  { role: "Dive Operations", name: "ABDULLAH" },
  { role: "Customer Service", name: "AYE" },
  { role: "Dive Operation", name: "Sorie" }
];

export function AboutDiveCampus() {
  // ✅ MODAL STATE
  const [selectedMember, setSelectedMember] =
    useState<string | null>(null);

  // ✅ ESC CLOSE
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      <section
        className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-br from-[#18476D] via-[#123a5a] to-[#0b2c45] text-white isolate flex items-center justify-center py-24"
        style={{
          fontFamily: "Harabara, sans-serif",
        }}
      >

        {/* BACKGROUND GLOW */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-400/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[140px]" />

        {/* TEAM GRID */}
        <div className="relative z-10 w-full max-w-[1100px] px-6 flex flex-wrap items-center justify-center gap-6 md:gap-8">

          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.04,
                y: -4,
              }}
              onClick={() => {
                if (
                  member.name === "ISLAM" ||
                  member.name === "SNEHA" ||
                  member.name === "Justin" ||
                  member.name === "KHUSHI" ||
                  member.name === "BRICE" ||
                  member.name === "AYE" ||
                  member.name === "ABDULLAH" ||
                  member.name === "Sorie"
                ) {
                  setSelectedMember(member.name);
                }
              }}
              className="w-[120px] h-[170px] sm:w-[140px] sm:h-[190px] md:w-[160px] md:h-[220px] lg:w-[180px] lg:h-[240px] rounded-[24px] md:rounded-[32px] bg-white/10 backdrop-blur-md border border-white/15 flex flex-col items-center justify-center cursor-pointer overflow-hidden group transform-gpu will-change-transform shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            >
              {/* CARD GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-400/10 to-blue-500/10" />

              {/* IMAGE */}
              <div
                className="relative z-10 w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] lg:w-[88px] lg:h-[88px] rounded-full overflow-hidden border border-cyan-300/30 shadow-[0_0_30px_rgba(34,211,238,0.18)] mb-4 md:mb-5"
              >
                <img
                  src={
                    member.name === "ISLAM"
                      ? "/Islam.webp"
                      : member.name === "SNEHA"
                        ? "/Sneha.webp"
                        : member.name === "Justin"
                          ? "/Justin.webp"
                          : member.name === "KHUSHI"
                            ? "/Khushi.webp"
                            : member.name === "BRICE"
                              ? "/Brice.webp"
                              : member.name === "AYE"
                                ? "/Aye.webp"
                                : member.name === "ABDULLAH"
                                  ? "/Abdullah.webp"
                                  : member.name === "Sorie"
                                    ? "/Surie.webp"
                                    : "/placeholder.webp"
                  }
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* IMAGE GLOW */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent" />
              </div>

              {/* NAME */}
              <h3
                className="relative z-10 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] tracking-[2px] md:tracking-[3px] font-semibold uppercase leading-[1.4] text-center"
              >
                {member.name}
              </h3>

              {/* ROLE */}
              <p
                className="relative z-10 text-cyan-300 text-[8px] sm:text-[9px] md:text-[10px] tracking-[2px] md:tracking-[3px] uppercase mt-2 md:mt-3 text-center leading-relaxed px-2"
              >
                {member.role}
              </p>
            </motion.div>
          ))}

        </div>

      </section>

      {/* PROFILE MODALS — mounted OUTSIDE the section so their z-[999] escapes the
          section's `isolate` stacking context and renders above the fixed navbar (z-50) */}

        {/* ISLAM MODAL */}
        <IslamProfileModal
          open={selectedMember === "ISLAM"}
          onClose={() =>
            setSelectedMember(null)
          }
        />

        {/* SNEHA MODAL */}
        <SnehaProfileModal
          open={selectedMember === "SNEHA"}
          onClose={() =>
            setSelectedMember(null)
          }
        />

        {/* JUSTIN MODAL */}
        <JustinProfileModal
          open={selectedMember === "Justin"}
          onClose={() =>
            setSelectedMember(null)
          }
        />
        {/* KHUSHI MODAL */}
        <KhushiProfileModal
          open={selectedMember === "KHUSHI"}
          onClose={() =>
            setSelectedMember(null)
          }
        />

        <BriceProfileModal
          open={selectedMember === "BRICE"}
          onClose={() =>
            setSelectedMember(null)
          }
        />
        {/* AYE MODAL */}
        <AyeProfileModal
          open={selectedMember === "AYE"}
          onClose={() =>
            setSelectedMember(null)
          }
        />
        {/* ABDULLAH MODAL */}
        <AbdullahProfileModal
          open={selectedMember === "ABDULLAH"}
          onClose={() =>
            setSelectedMember(null)
          }
        />
        {/* SORIE MODAL */}
        <SurieProfileModal
          open={selectedMember === "Sorie"}
          onClose={() =>
            setSelectedMember(null)
          }
        />

      {/* GLOBAL STYLES */}
      <style>{`
        html,
        body {
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
}
