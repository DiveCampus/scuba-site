// =========================================
// DiveTrainingShowcaseAdmin.tsx
// PREMIUM ADMIN UI
// SAME AS FRONTEND DESIGN
// =========================================

"use client";

import {
  useEffect,
  useState,
} from "react";

import { Save } from "lucide-react";

import { motion } from "framer-motion";

import {

  getDiveTrainingShowcase,

  updateDiveTrainingShowcaseSection,

  updateDiveTrainingTag,

  updateDiveTrainingImage,

} from "@/services/DiveTrainingShowcaseService";

export default function DiveTrainingShowcaseAdmin() {
x``
  const [section, setSection] =
    useState<any>(null);

  const [tags, setTags] =
    useState<any[]>([]);

  const [images, setImages] =
     useState<any[]>([]);

  const [saving, setSaving] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH DATA
  ========================================= */

  useEffect(() => {

    const load =
      async () => {

        const res =
          await getDiveTrainingShowcase();

        console.log(
          "ADMIN DATA =>",
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

  /* =========================================
     SAVE
  ========================================= */

  const handleSave =
    async () => {

      try {

        setSaving(true);

        /* SECTION */
        await updateDiveTrainingShowcaseSection(
          section.id,
          section
        );

        /* TAGS */
        await Promise.all(

          tags.map((tag) =>

            updateDiveTrainingTag(
              tag.id,
              tag
            )
          )

        );

        /* IMAGES */
        await Promise.all(

          images.map((image) =>

            updateDiveTrainingImage(
              image.id,
              image
            )
          )

        );

        alert(
          "Saved Successfully"
        );

      } catch (err) {

        console.log(err);

      } finally {

        setSaving(false);

      }

    };

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

      {/* GLOW */}
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

      {/* SAVE BUTTON */}
      <div className="
        fixed
        top-6
        right-6
        z-50
      ">

        <button
          onClick={handleSave}
          disabled={saving}
          className="
            h-[56px]
            px-7
            rounded-2xl
            bg-cyan-400
            text-black
            font-semibold
            flex
            items-center
            gap-3
            shadow-xl
          "
        >

          <Save size={18} />

          {
            saving
              ? "Saving..."
              : "Save Changes"
          }

        </button>

      </div>

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
            LEFT
        ========================================= */}
        <div>

          {/* BADGE */}
          <input
            value={
              section.badge || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                badge:
                  e.target.value,
              })
            }
            className="
              px-5
              py-2
              text-[10px]
              tracking-[3px]
              border
              border-cyan-400/30
              bg-transparent
              text-cyan-400
              rounded-full
              mb-7
              outline-none
              w-full
            "
          />

          {/* TITLE */}
          <textarea
            rows={2}
            value={
              section.title || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                title:
                  e.target.value,
              })
            }
            className="
              bg-transparent
              text-3xl
              md:text-5xl
              font-semibold
              w-full
              outline-none
              resize-none
            "
          />

          {/* HIGHLIGHT */}
          <textarea
            rows={2}
            value={
              section.highlighted_title || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                highlighted_title:
                  e.target.value,
              })
            }
            className="
              bg-transparent
              text-cyan-400
              text-3xl
              md:text-5xl
              font-semibold
              w-full
              outline-none
              resize-none
              mt-2
            "
          />

          {/* DESCRIPTION */}
          <textarea
            rows={6}
            value={
              section.description || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                description:
                  e.target.value,
              })
            }
            className="
              mt-8
              w-full
              bg-transparent
              text-white/60
              outline-none
              resize-none
              leading-[2]
            "
          />

          {/* CARD */}
          <div className="
            mt-10
            border
            border-yellow-400/30
            rounded-3xl
            p-7
            bg-[#02131d]/90
            backdrop-blur-xl
          ">

            <input
              value={
                section.card_title || ""
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  card_title:
                    e.target.value,
                })
              }
              className="
                bg-transparent
                text-yellow-400
                uppercase
                tracking-[2px]
                w-full
                outline-none
              "
            />

            <textarea
              rows={5}
              value={
                section.card_description || ""
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  card_description:
                    e.target.value,
                })
              }
              className="
                mt-5
                bg-transparent
                text-white/60
                w-full
                outline-none
                resize-none
                leading-[2]
              "
            />

            {/* TAGS */}
            <div className="
              flex
              flex-wrap
              gap-3
              mt-7
            ">

              {tags.map(
                (
                  tag,
                  index
                ) => (

                  <input
                    key={tag.id}
                    value={tag.text}
                    onChange={(e) => {

                      const updated =
                        [...tags];

                      updated[
                        index
                      ].text =
                        e.target.value;

                      setTags(
                        updated
                      );

                    }}
                    className={`
                      px-4
                      py-2
                      rounded-full
                      bg-transparent
                      border
                      outline-none
                      text-[10px]
                      tracking-[1px]
                      ${tag.border_color}
                      ${tag.text_color}
                    `}
                  />

                )
              )}

            </div>

          </div>

        </div>

        {/* =========================================
            RIGHT IMAGES
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

              <motion.div
                key={image.id}
                whileHover={{
                  scale: 1.02,
                }}
              >

                <img
                  src={
                    image.image_url
                  }
                  className={`
                    rounded-2xl
                    w-full
                    object-cover
                    ${
                      index % 2 === 0
                        ? "h-[180px]"
                        : "h-[220px]"
                    }
                  `}
                />

                <input
                  value={
                    image.image_url
                  }
                  onChange={(e) => {

                    const updated =
                      [...images];

                    updated[
                      index
                    ].image_url =
                      e.target.value;

                    setImages(
                      updated
                    );

                  }}
                  className="
                    mt-3
                    w-full
                    bg-white/10
                    border
                    border-white/10
                    rounded-2xl
                    p-4
                    outline-none
                    text-sm
                  "
                />

              </motion.div>

            )
          )}

        </div>

      </div>

    </section>

  );

}