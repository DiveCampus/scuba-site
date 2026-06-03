"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar";
import WhatsAppButton from "../WhatsAppButton";
import {
  getDivemasterHero,
} from "@/services/DivemasterHeroService";
import { PricingCard } from "../PricingCard";

export function PadiDivemasterHero() {

  const navigate = useNavigate();

  const [data, setData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchData =
      async () => {

        const response = await getDivemasterHero();

        console.log(
          "🚀 DIVEMASTER RESPONSE:",
          response
        );

        console.log(
          "📦 HERO DATA:",
          response?.data
        );

        console.log(
          "💰 PRICE:",
          response?.data?.price
        );

        console.log(
          "💰 OLD PRICE:",
          response?.data?.old_price
        );

        setData(response.data);

        setLoading(false);

      };

    fetchData();

  }, []);

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02182b] text-white">
        {/* SEO-only crawler fallback (invisible to users) */}
        <h1 className="sr-only">PADI Divemaster Course Dubai</h1>
        <p className="sr-only">
          Become a PADI Divemaster in Dubai with UAE Dive. Professional-level scuba dive training, leadership skills and career path support.
        </p>
        Loading...
      </div>
    );

  }

  if (!data) {

    return (
      <div className="text-red-500">
        No data found
      </div>
    );

  }

  return (

    <>
      <Navbar />

      <section
        className="relative min-h-screen w-full overflow-hidden font-habara text-white"
      >

        {/* BG */}
        <div className="absolute inset-0">

          <img
            src={
              data.background_image
            }
            alt="PADI Divemaster Course Dubai - professional scuba training"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-[#02182b]/60" />

        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">

          {/* BADGE */}
          <div className="mb-8 px-6 py-2 rounded-full border border-cyan-400/30 text-cyan-300">

            {data.badge}

          </div>

          {/* SUBTITLE */}
          <p className="text-white/60 uppercase tracking-[3px] font-semibold text-[12px] mb-3">

            {data.subtitle}

          </p>

          {/* TITLE */}
          <h1 className="text-4xl md:text-6xl font-semibold tracking-[1px] leading-[1.1] max-w-5xl">

            {data.title}{" "}

            <span className="text-cyan-400">

              {
                data.highlighted_title
              }

            </span>

          </h1>

          {/* DESCRIPTION */}
          <p className="mt-5 text-[14px] md:text-[15px] text-white/70 leading-relaxed max-w-2xl">

            {data.description}

          </p>

          {/* PRICE */}
          <PricingCard
            className="mt-12"
            price={data.price}
            oldPrice={data.old_price}
          />

          {/* BUTTONS */}
          <div className="mt-10 flex gap-4">

            <button
              onClick={() =>
                navigate("/booking?course=padi-divemaster")
              }
              className="px-8 py-3 bg-cyan-400 text-black rounded-2xl font-semibold"
            >

              {data.button_text}

            </button>

            <WhatsAppButton
              href="https://wa.me/971000000000"
              variant="outline"
            >
              WhatsApp
            </WhatsAppButton>

          </div>

        </div>

      </section>

    </>

  );

}
