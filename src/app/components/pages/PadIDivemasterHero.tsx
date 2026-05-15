"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { OpenDiverBooking } from "./OpenDiverBooking";
import { Navbar } from "../Navbar";
import {
  getDivemasterHero,
} from "@/services/DivemasterHeroService";

export function PadiDivemasterHero() {

  const [open, setOpen] =
    useState(false);

  const [data, setData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchData =
      async () => {

        const response =
          await getDivemasterHero();

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
      <div className="text-white">
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
        className="
          relative
          min-h-screen
          w-full
          overflow-hidden
          font-habara
          text-white
        "
      >

        {/* BG */}
        <div className="absolute inset-0">

          <img
            src={
              data.background_image
            }
            alt="diving"
            className="
              w-full
              h-full
              object-cover
            "
          />

          <div className="
            absolute
            inset-0
            bg-[#02182b]/60
          " />

        </div>

        {/* CONTENT */}
        <div className="
          relative
          z-10
          flex
          flex-col
          items-center
          justify-center
          text-center
          min-h-screen
          px-6
        ">

          {/* BADGE */}
          <div className="
            mb-8
            px-6
            py-2
            rounded-full
            border
            border-cyan-400/30
            text-cyan-300
          ">

            {data.badge}

          </div>

          {/* SUBTITLE */}
          <p className="
            text-white/60
            uppercase
            tracking-[4px]
            mb-5
          ">

            {data.subtitle}

          </p>

          {/* TITLE */}
          <h1 className="
            text-4xl
            md:text-6xl
            font-bold
            max-w-5xl
          ">

            {data.title}{" "}

            <span className="
              text-cyan-400
            ">

              {
                data.highlighted_title
              }

            </span>

          </h1>

          {/* DESCRIPTION */}
          <p className="
            mt-6
            text-white/70
            max-w-2xl
          ">

            {data.description}

          </p>

          {/* PRICE */}
          <div className="
            mt-12
            bg-white/10
            border
            border-white/20
            rounded-3xl
            px-10
            py-8
          ">

            <p className="
              text-sm
              text-white/40
              line-through
              mb-3
            ">

              AED {data.old_price}

            </p>

            <h2 className="
              text-5xl
              font-bold
            ">

              <span className="
                text-cyan-400
                text-lg
                mr-2
              ">

                AED

              </span>

              {data.price}
            </h2>

          </div>

          {/* BUTTONS */}
          <div className="
            mt-10
            flex
            gap-4
          ">

            <button
              onClick={() =>
                setOpen(true)
              }
              className="
                px-8
                py-3
                bg-cyan-400
                text-black
                rounded-2xl
                font-semibold
              "
            >

              {data.button_text}

            </button>

            <a
              href="https://wa.me/971000000000"
              target="_blank"
              className="
                px-8
                py-3
                border
                border-white/20
                rounded-2xl
                flex
                items-center
                gap-2
              "
            >

              <FaWhatsapp />

              WhatsApp

            </a>

          </div>

        </div>

      </section>

      <OpenDiverBooking
        isOpen={open}
        onClose={() =>
          setOpen(false)
        }
      />

    </>

  );

}