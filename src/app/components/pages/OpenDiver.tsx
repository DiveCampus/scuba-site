"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OpenDiverBooking } from "./OpenDiverBooking";
import { FaWhatsapp } from "react-icons/fa";

// ✅ IMPORT SERVICE
import { getCourses } from "@/services/courseService";
import { Navbar } from "../Navbar";

// ✅ IMPORT NAVBAR

export function OpenDiver() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      const { data } = await getCourses();

      if (data && data.length > 0) {
        setCourse(data[0]);
      }

      setLoading(false);
    };

    fetchCourse();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* 🔥 NAVBAR */}
      <Navbar />

      {/* 🔥 HERO SECTION */}
      <section className="relative min-h-screen w-full overflow-hidden text-white pt-[100px]">

        {/* BACKGROUND */}
        <div className="absolute inset-0">
          <img src="/1.avif" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#02182b]/70" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">

          <div className="mb-6 px-5 py-2 text-[11px] tracking-widest border border-cyan-300/40 rounded-full text-cyan-200">
            LEVEL 2 - ADVANCED OPEN WATER
          </div>

          <h1 className="text-4xl md:text-6xl font-bold">
            {course?.title || (
              <>
                WHY STOP <span className="text-cyan-400">AT 18 METERS?</span>
              </>
            )}
          </h1>

          <p className="mt-4 text-white/70 max-w-2xl">
            {course?.description ||
              "Unlock deeper diving experiences and explore new marine life."}
          </p>

          <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-10 py-6">
            <p className="text-sm text-white/40 line-through">
              AED {course?.old_price || 2199}
            </p>

            <h2 className="text-5xl font-bold">
              {course?.price || 1599}
              <span className="text-cyan-400 text-lg"> AED</span>
            </h2>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="rounded-xl bg-cyan-400 px-6 py-3 text-black font-semibold"
            >
              GET LICENSED FOR 30M →
            </button>

            <a
              href="https://wa.me/971XXXXXXXXX"
              target="_blank"
              className="border px-6 py-3 rounded-xl flex items-center gap-2"
            >
              <FaWhatsapp /> BOOK VIA WHATSAPP
            </a>
          </div>
        </div>
      </section>

      {/* FLOATING CTA */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setOpen(true)}
          className="bg-cyan-400 px-6 py-3 rounded-full text-black font-semibold"
        >
          ENROLL NOW →
        </button>
      </div>

      {/* MODAL */}
      <OpenDiverBooking
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}