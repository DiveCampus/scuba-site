"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar";
import { getOpenDiverCourse } from "@/services/OpenDiverService";

export function OpenDiver() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingCourse =
    location.pathname === "/advanced-open-water" ? "advanced-open-water" : "open-diver";
  const [course, setCourse] =
    useState<any>(null);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    (async () => {
      const { data } =
        await getOpenDiverCourse();

      setCourse(data);
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white font-habara">
        Loading...
      </div>
    );

  const features = [
    course?.feature_1,
    course?.feature_2,
    course?.feature_3,
    course?.feature_4,
  ];

  return (
    <>
      <Navbar />

      <section className="relative min-h-screen w-full overflow-hidden font-habara text-white pt-[100px]">
        {/* BACKGROUND */}
        <div className="absolute inset-0">
          <img
            src={
              course?.background_image
            }
            className="w-full h-full object-cover scale-[1.02]"
          />
          <div className="absolute inset-0 bg-[#02182b]/70" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          {/* BADGE */}
          <div className="mb-8 rounded-full border border-cyan-300/40 px-6 py-2.5 text-[11px] tracking-[2.8px] text-cyan-200 backdrop-blur-md">
            {course?.badge}
          </div>

          {/* TITLE */}
          <h1 className="max-w-5xl text-4xl font-bold leading-[1.18] tracking-[1px] md:text-6xl">
            {course?.title}{" "}
            <span className="text-cyan-400">
              {
                course?.highlighted_title
              }
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-7 max-w-2xl text-[15px] leading-[1.95] tracking-[0.5px] text-white/72 md:text-[16px]">
            {course?.description}
          </p>

          {/* PRICE CARD */}
          <div className="mt-14 rounded-2xl border border-white/20 bg-white/10 px-12 py-8 shadow-xl backdrop-blur-xl">
            <p className="mb-2 text-xs tracking-[2px] text-white/40 line-through">
              AED {course?.old_price}
            </p>

            <h2 className="text-5xl font-bold leading-none tracking-[1px]">
              <span className="mr-2 text-lg tracking-[2px] text-cyan-400">
                AED
              </span>
              {course?.price}
            </h2>

            <p className="mt-4 text-xs leading-[1.8] tracking-[1px] text-white/55">
              {
                course?.price_subtext
              }
            </p>
          </div>

          {/* BUTTONS */}
          <div className="mt-11 flex flex-col items-center gap-5">
            <button
              onClick={() =>
                navigate(`/booking?course=${bookingCourse}`)
              }
              className="rounded-xl bg-cyan-400 px-8 py-3.5 font-semibold tracking-[1px] text-black shadow-lg transition duration-300 hover:scale-105"
            >
              {
                course?.button_text
              }
            </button>

            <a
              href={
                course?.whatsapp_link
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-white/25 px-8 py-3.5 tracking-[1px] backdrop-blur-md transition duration-300 hover:bg-white/10"
            >
              <FaWhatsapp className="text-lg text-green-400" />
              {
                course?.whatsapp_text
              }
            </a>

            <p className="text-[11px] tracking-[1px] text-white/40">
              {course?.small_text}
            </p>
          </div>

          {/* FEATURES */}
          <div className="mt-14 flex flex-wrap justify-center gap-10 text-[11px] tracking-[1.3px] text-white/55">
            {features.map(
              (feature, i) => (
                <span key={i}>
                  {feature}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* FLOATING CTA */}
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <div className="flex items-center rounded-full bg-[#1f2a33]/90 p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <button
            onClick={() =>
              navigate(`/booking?course=${bookingCourse}`)
            }
            className="rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 px-7 py-3 font-semibold tracking-[1px] text-black transition duration-300 hover:scale-105"
          >
            {
              course?.floating_button_text
            }
          </button>

          <a
            href={
              course?.whatsapp_link
            }
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white shadow-md transition duration-300 hover:scale-110"
          >
            <FaWhatsapp className="text-lg" />
          </a>
        </div>
      </div>
    </>
  );
}
