"use client";

import { motion } from "framer-motion";

import { Navbar } from "../Navbar";

import {
  useEffect,
  useState,
} from "react";

import {
  getPadiOpenDiver,
} from "@/services/PadiOpenService";

export function PadiOpenDiver() {

  const [data, setData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchData =
      async () => {

        const {
          data,
        } =
          await getPadiOpenDiver();

        setData(data);

        setLoading(false);
      };

    fetchData();

  }, []);

  if (loading) {
    return (
      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#02182b]
        text-white
      ">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <section className="
        relative
        min-h-screen
        overflow-hidden
        text-white
      ">

        {/* BG */}
        <div className="absolute inset-0">

          <img
            src={
              data?.background_image
            }
            className="
              w-full
              h-full
              object-cover
            "
          />

          <div className="
            absolute
            inset-0
            bg-[#02182b]/70
          " />

        </div>

        {/* GLOW */}
        <div className="
          absolute
          top-0
          right-0
          w-[500px]
          h-[500px]
          bg-cyan-400/20
          blur-[180px]
          rounded-full
        " />

        {/* CONTENT */}
        <div className="
          relative
          z-10
          min-h-screen
          flex
          flex-col
          items-center
          justify-center
          text-center
          px-6
        ">

          {/* BADGE */}
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              px-6
              py-2
              rounded-full
              border
              border-cyan-400/30
              text-cyan-300
              text-xs
              tracking-[4px]
              uppercase
              mb-6
              backdrop-blur-xl
              bg-white/5
            "
          >

            {data?.top_badge}

          </motion.div>

          {/* SUBTEXT */}
          <p className="
            text-white/60
            tracking-[4px]
            text-xs
            uppercase
            mb-4
          ">

            {data?.sub_text}

          </p>

          {/* TITLE */}
          <h1 className="
            text-5xl
            md:text-7xl
            font-bold
            max-w-5xl
            leading-tight
          ">

            {data?.title}{" "}

            <span className="
              bg-gradient-to-r
              from-cyan-300
              to-blue-500
              bg-clip-text
              text-transparent
            ">

              {data?.highlighted_text}

            </span>

          </h1>

          {/* DESCRIPTION */}
          <p className="
            mt-6
            text-white/70
            max-w-2xl
            text-lg
            leading-relaxed
          ">

            {data?.description}

          </p>

          {/* PRICE CARD */}
          <div className="
            mt-10
            px-10
            py-7
            rounded-[30px]
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            shadow-[0_20px_80px_rgba(0,0,0,0.4)]
          ">

            <p className="
              text-white/40
              line-through
              text-sm
            ">

              AED {data?.old_price}

            </p>

            <h2 className="
              mt-1
              text-5xl
              font-bold
            ">

              <span className="
                text-cyan-400
                text-xl
              ">
                AED
              </span>{" "}

              {data?.new_price}

            </h2>

            <p className="
              mt-3
              text-white/60
              text-sm
            ">

              {data?.price_note}

            </p>

          </div>

          {/* BUTTONS */}
          <div className="
            mt-10
            flex
            gap-5
            flex-wrap
            justify-center
          ">

            <button className="
              px-8
              py-4
              rounded-2xl
              bg-cyan-400
              text-black
              font-bold
              hover:scale-105
              transition
            ">

              {data?.primary_button}

            </button>

            <button className="
              px-8
              py-4
              rounded-2xl
              border
              border-white/20
              bg-white/5
              hover:bg-white/10
              transition
            ">

              {data?.secondary_button}

            </button>

          </div>

          {/* FEATURES */}
          <div className="
            mt-14
            grid
            md:grid-cols-4
            gap-4
            max-w-6xl
            w-full
          ">

            {[
              data?.feature_1,
              data?.feature_2,
              data?.feature_3,
              data?.feature_4,
            ].map(
              (
                item,
                i
              ) => (
                <div
                  key={i}
                  className="
                    px-6
                    py-5
                    rounded-2xl
                    bg-white/5
                    border
                    border-white/10
                    backdrop-blur-xl
                    text-white/80
                  "
                >

                  {item}

                </div>
              )
            )}

          </div>

        </div>

      </section>
    </>
  );
}