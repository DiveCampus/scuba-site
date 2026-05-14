"use client";

import { getMainHero } from "@/services/kadirheroService";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function HeroSection() {
  const [hero, setHero] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const { data, error } =
          await getMainHero();

        if (error) {
          console.error(error);
          return;
        }

        if (data) {
          setHero(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  // LOADING
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  // NO DATA
  if (!hero) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        No Hero Data Found
      </div>
    );
  }

  return (
    <section
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        text-white
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="/1.avif"
          className="
            w-full
            h-full
            object-cover
          "
        />

        <div className="absolute inset-0 bg-[#02182b]/70" />
      </div>

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          justify-center
          text-center
          min-h-screen
          px-6
        "
      >

        {/* TOP TEXT */}
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
            mb-6
            px-5
            py-2
            text-xs
            tracking-widest
            border
            border-cyan-300/40
            rounded-full
            text-cyan-200
          "
        >
          {hero.top_text}
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            text-4xl
            md:text-6xl
            font-bold
            leading-tight
            max-w-4xl
          "
        >
          {hero.title}{" "}

          <span
            className="
              bg-gradient-to-r
              from-cyan-300
              to-blue-400
              bg-clip-text
              text-transparent
            "
          >
            {hero.subtitle}
          </span>
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            mt-4
            text-white/70
            max-w-2xl
          "
        >
          {hero.description}
        </motion.p>

        {/* PRICE */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="
            mt-8
            bg-white/10
            backdrop-blur-xl
            border
            border-white/20
            rounded-2xl
            px-8
            py-6
          "
        >
          <p className="text-sm text-white/50 line-through">
            AED {hero.old_price}
          </p>

          <p className="text-4xl font-bold">
            <span className="text-cyan-400 text-lg mr-2">
              AED
            </span>

            {hero.price}
          </p>
        </motion.div>

        {/* CTA */}
        <button
          className="
            mt-8
            px-8
            py-3
            bg-cyan-400
            text-black
            font-semibold
            rounded-lg
          "
        >
          {hero.cta_text}
        </button>

      </div>
    </section>
  );
}