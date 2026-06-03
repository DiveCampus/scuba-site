"use client";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar";
import WhatsAppButton from "../WhatsAppButton";
import { getOpenDiverCourse } from "@/services/OpenDiverService";
import { PricingCard } from "../PricingCard";

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
      const { data } = await getOpenDiverCourse();

      setCourse(data);
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white font-habara">
        {/* SEO-only crawler fallback (invisible to users) */}
        <h1 className="sr-only">
          {bookingCourse === "advanced-open-water"
            ? "PADI Advanced Open Water Diver Course Dubai"
            : "PADI Open Water Diver Course Dubai"}
        </h1>
        <p className="sr-only">
          {bookingCourse === "advanced-open-water"
            ? "Level up with the PADI Advanced Open Water Diver certification in Dubai. Five adventure dives including deep dive and underwater navigation."
            : "Start your scuba journey with PADI Open Water certification in Dubai with UAE Dive."}
        </p>
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
            alt={
              bookingCourse === "advanced-open-water"
                ? "PADI Advanced Open Water Diver Course Dubai - underwater scuba"
                : "PADI Open Water Diver Course Dubai - underwater scuba"
            }
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover scale-[1.02]"
          />
          <div className="absolute inset-0 bg-[#02182b]/70" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          {/* BADGE */}
          <div className="mb-8 rounded-full border border-cyan-300/40 px-6 py-2.5 text-[12px] font-semibold tracking-[3px] text-cyan-200 backdrop-blur-md uppercase">
            {course?.badge}
          </div>

          {/* TITLE */}
          <h1 className="max-w-5xl text-4xl font-semibold leading-[1.1] tracking-[1px] md:text-6xl">
            {course?.title}{" "}
            <span className="text-cyan-400">
              {
                course?.highlighted_title
              }
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed tracking-[0.5px] text-white/72 md:text-[16px]">
            {course?.description}
          </p>

          {/* PRICE CARD */}
          <PricingCard
            className="mt-14"
            price={course?.price}
            oldPrice={course?.old_price}
          >
            {course?.price_subtext && (
              <p className="text-xs leading-relaxed tracking-[1px] text-white/55">
                {course.price_subtext}
              </p>
            )}
          </PricingCard>

          {/* BUTTONS */}
          <div className="mt-10 md:mt-12 flex flex-col items-center gap-5">
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

            <WhatsAppButton
              href={course?.whatsapp_link}
              variant="outline"
            >
              {course?.whatsapp_text}
            </WhatsAppButton>

            <p className="text-[11px] tracking-[1px] text-white/40">
              {course?.small_text}
            </p>
          </div>

          {/* FEATURES */}
          <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-10 text-[11px] tracking-[1.3px] text-white/55">
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

          <WhatsAppButton
            href={course?.whatsapp_link}
            variant="floating"
            className="ml-2"
          />
        </div>
      </div>
    </>
  );
}
