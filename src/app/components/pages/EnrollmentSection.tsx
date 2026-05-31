"use client";

import { Shield, Clock, Monitor, Users, Globe } from "lucide-react";
import WhatsAppButton from "../WhatsAppButton";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function EnrollmentSection() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "All Pro-Grade Gear Included",
      tag: "ZERO FEES",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "1 Free Fun Dive in Fujairah",
      tag: "AED 200 VALUE",
    },
    {
      icon: <Monitor className="w-5 h-5" />,
      title: "Official PADI e-Learning Access",
      tag: "INSTANT",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Small Ratios (3 Ocean / 4 Pool)",
      tag: "BEST IN UAE",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "PADI License Valid Worldwide",
      tag: "LIFETIME VALIDITY",
    },
  ];

  return (
    <>
      <section
        className="py-24 bg-[#f8fafc] relative"
        style={{ fontFamily: "Harabara, sans-serif" }}
      >

        {/* HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-16 px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0a0e27] tracking-tight">
            Enroll Now &{" "}
            <span className="text-cyan-500">Complete within 1 YEAR</span>
          </h2>

          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm">
            You aren't just buying a course; you are securing a lifetime credential.
          </p>
        </div>

        {/* GRID */}
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 px-6 items-start">

          {/* LEFT */}
          <div className="space-y-4">
            {features.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between px-5 py-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 text-[#0a0e27]">
                  <div className="text-cyan-500">{item.icon}</div>
                  <span className="text-sm font-medium">
                    {item.title}
                  </span>
                </div>

                <span className="text-cyan-500 text-[10px] font-semibold whitespace-nowrap">
                  {item.tag}
                </span>
              </motion.div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="space-y-5">

            {/* VIDEO */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe
                className="w-full h-[260px] md:h-[300px]"
                src="https://www.youtube.com/embed/fWDuCdYZwg4"
                allowFullScreen
              />
            </div>

            {/* RATINGS */}
            <div className="flex gap-3">
              <div className="flex-1 bg-white rounded-full px-4 py-3 text-center shadow border border-gray-200">
                <p className="text-sm font-semibold text-[#0a0e27]">
                  4.9 ⭐⭐⭐⭐⭐
                </p>
                <p className="text-[11px] text-gray-500">
                  1,054+ Reviews
                </p>
              </div>

              <div className="flex-1 bg-white rounded-full px-4 py-3 text-center shadow border border-gray-200">
                <p className="text-sm font-semibold text-[#0a0e27]">
                  5.0 ⭐⭐⭐⭐⭐
                </p>
                <p className="text-[11px] text-gray-500">
                  654+ Reviews
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 🔥 FLOATING CTA (PILL STYLE) */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">

          <div className="flex items-center bg-[#1f2a33] p-1.5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.6)]">

            {/* MAIN BUTTON */}
            <button
              onClick={() => navigate("/booking?course=padi-open-water")}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-semibold text-sm hover:scale-105 transition shadow-[0_5px_20px_rgba(0,200,255,0.4)]"
            >
              ENROLL NOW →
            </button>

            {/* WHATSAPP */}
            <WhatsAppButton
              href="https://wa.me/971XXXXXXXXX"
              variant="floating"
              className="ml-2"
            />

          </div>

        </div>

      </section>

      {/* FONT */}
      <style jsx global>{`
        @font-face {
          font-family: 'Harabara';
          src: url('/fonts/Harabara.woff') format('woff');
        }
      `}</style>
    </>
  );
}
