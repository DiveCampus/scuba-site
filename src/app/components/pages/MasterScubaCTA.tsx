// =========================================
// MasterScubaCTA.tsx
// DYNAMIC FRONTEND
// =========================================

"use client";

import {

  useEffect,

  useState,

} from "react";

import WhatsAppButton from "../WhatsAppButton";

import {

  motion,

} from "framer-motion";

import {

  getMasterScubaCTA,

} from "@/services/MasterScubaCTAService";

export function MasterScubaCTA() {

  const [section, setSection] =
    useState<any>(null);

  /* =========================================
     LOAD DATA
  ========================================= */

  useEffect(() => {

    const load =
      async () => {

        const {

          data,

        } = await getMasterScubaCTA();

        console.log(
          "MASTER SCUBA CTA =>",
          data
        );

        setSection(data);

      };

    load();

  }, []);

  if (!section)
    return null;

  return (

    <section
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-r from-[#081c2c] to-[#0d2f45] text-white"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full" />

      {/* CONTENT */}
      <motion.div

        initial={{
          opacity: 0,
          y: 20,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.5,
        }}

        className="relative z-10 max-w-[760px] mx-auto text-center px-6"

      >

        {/* SMALL TITLE */}
        <p className="text-[12px] font-semibold text-white/55 tracking-[3px] uppercase">

          {
            section.top_text
          }

        </p>

        {/* MAIN TITLE */}
        <h2 className="text-[36px] md:text-[52px] font-semibold mt-3 leading-[1.1] tracking-[1px]">

          {
            section.title
          }

        </h2>

        {/* DESCRIPTION */}
        <p className="text-[15px] md:text-[16px] text-white/60 mt-5 leading-relaxed tracking-[0.45px] max-w-[620px] mx-auto">

          {
            section.description
          }

        </p>

        {/* BUTTONS */}
        <div className="mt-10 md:mt-12 flex items-center justify-center gap-4 flex-wrap">

          {/* PRIMARY BUTTON */}
          <a

            href={
              section.primary_button_link
            }

            className="px-7 py-3.5 text-[12px] tracking-[1px] rounded-2xl bg-white text-[#0a0e27] font-medium hover:scale-[1.03] transition duration-300 shadow-lg"

          >

            {
              section.primary_button_text
            }

          </a>

          {/* WHATSAPP BUTTON */}
          <WhatsAppButton
            message="Hi! I'd like to become a Master Scuba Diver — please share the details."
            variant="outline"
          >
            {section.whatsapp_button_text}
          </WhatsAppButton>

        </div>

      </motion.div>

    </section>

  );

}