// =========================================
// DiveTrainingShowcase.tsx
// DYNAMIC FRONTEND UI
// =========================================

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  getDiveTrainingShowcase,
} from "@/services/DiveTrainingShowcaseService";

export function DiveTrainingShowcase() {

  const [section, setSection] =
    useState<any>(null);

  const [tags, setTags] =
    useState<any[]>([]);

  const [images, setImages] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     LOAD DATA
  ========================================= */

  useEffect(() => {

    const load =
      async () => {

        const res =
          await getDiveTrainingShowcase();

        console.log(
          "SHOWCASE DATA =>",
          res
        );

        setSection(
          res.section
        );

        setTags(
          res.tags || []
        );

        setImages(
          res.images || []
        );

        setLoading(false);

      };

    load();

  }, []);

  if (
    loading ||
    !section
  ) return null;

  return (

    <section
      className="
        relative
        py-32
        bg-gradient-to-b
        from-[#031421]
        to-[#02101a]
        text-white
        overflow-hidden
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* BACKGROUND GLOW */}
      <div className="
        absolute
        top-10
        left-10
        w-72
        h-72
        bg-cyan-400/10
        blur-[120px]
        rounded-full
      " />

      <div className="
        absolute
        bottom-10
        right-10
        w-72
        h-72
        bg-blue-500/10
        blur-[120px]
        rounded-full
      " />

      <div className="
        relative
        max-w-[1120px]
        mx-auto
        grid
        md:grid-cols-2
        gap-16
        items-center
        px-6
      ">

        {/* =========================================
            LEFT CONTENT
        ========================================= */}
        <div>

          {/* BADGE */}
          <div className="
            inline-block
            px-5
            py-2
            text-[10px]
            tracking-[3px]
            border
            border-cyan-400/30
            text-cyan-400
            rounded-full
            mb-7
          ">

            {section.badge}

          </div>

          {/* TITLE */}
          <h2 className="
            text-3xl
            md:text-5xl
            font-semibold
            leading-[1.18]
            tracking-[1px]
          ">

            {section.title}

            <br />

            <span className="
              text-cyan-400
            ">

              {
                section.highlighted_title
              }

            </span>

          </h2>

          {/* DESCRIPTION */}
          <p className="
            text-[15px]
            md:text-[16px]
            text-white/60
            mt-8
            max-w-[520px]
            leading-[2]
            tracking-[0.45px]
          ">

            {
              section.description
            }

          </p>

          {/* =========================================
              HIGHLIGHT CARD
          ========================================= */}
          <div className="
            mt-10
            border
            border-yellow-400/30
            rounded-3xl
            p-7
            bg-[#02131d]/90
            backdrop-blur-xl
            shadow-[0_20px_60px_rgba(0,0,0,0.35)]
          ">

            {/* CARD TITLE */}
            <h4 className="
              text-yellow-400
              text-[12px]
              tracking-[2px]
              uppercase
              font-semibold
            ">

              {
                section.card_title
              }

            </h4>

            {/* CARD DESCRIPTION */}
            <p className="
              text-[14px]
              text-white/60
              mt-5
              leading-[2]
              tracking-[0.35px]
              max-w-[500px]
            ">

              {
                section.card_description
              }

            </p>

            {/* TAGS */}
            <div className="
              flex
              flex-wrap
              gap-3
              mt-7
              text-[10px]
              tracking-[1.2px]
            ">

              {tags.map((tag) => (

                <span
                  key={tag.id}
                  className={`
                    px-4
                    py-2
                    border
                    rounded-full
                    ${tag.border_color}
                    ${tag.text_color}
                  `}
                >

                  {tag.text}

                </span>

              ))}

            </div>

          </div>

        </div>

        {/* =========================================
            RIGHT IMAGE GRID
        ========================================= */}
        <div className="
          grid
          grid-cols-2
          gap-4
        ">

          {images.map(
            (
              image,
              index
            ) => (

              <motion.img
                key={image.id}
                src={
                  image.image_url
                }
                alt={`Dive ${
                  index + 1
                }`}
                whileHover={{
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.25,
                }}
                className={`
                  rounded-2xl
                  w-full
                  object-cover
                  shadow-[0_15px_40px_rgba(0,0,0,0.25)]

                  ${
                    index % 2 === 0
                      ? "h-[180px]"
                      : "h-[220px]"
                  }
                `}
              />

            )
          )}

        </div>

      </div>

      {/* FONT */}
      <style jsx global>{`
        @font-face {
          font-family: 'Harabara';
          src: url('/fonts/Harabara.woff')
            format('woff');
        }
      `}</style>

    </section>

  );

}