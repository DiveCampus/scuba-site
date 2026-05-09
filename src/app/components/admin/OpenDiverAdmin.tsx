"use client";

import { useEffect, useState } from "react";

import { Save } from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import {

  getOpenDiverCourse,

  updateOpenDiverCourse,

} from "@/services/OpenDiverService";

export default function OpenDiverAdmin() {

  const [course, setCourse] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    const fetchCourse = async () => {

      const { data } =
        await getOpenDiverCourse();

      setCourse(data);

      setLoading(false);

    };

    fetchCourse();

  }, []);

  const handleSave = async () => {

    if (!course?.id) return;

    setSaving(true);

    await updateOpenDiverCourse(
      course.id,
      course
    );

    setSaving(false);

  };

  if (loading) return null;

  return (

    <section className="
      relative
      min-h-screen
      overflow-hidden
      font-habara
      text-white
    ">

      {/* BG */}
      <div className="
        absolute
        inset-0
      ">

        <img
          src={
            course?.background_image
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
          bg-[#02182b]/85
          backdrop-blur-sm
        " />

      </div>

      {/* CONTENT */}
      <div className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-6
        py-24
      ">

        {/* HEADER */}
        <div className="
          flex
          items-center
          justify-between
          mb-16
          flex-wrap
          gap-5
        ">

          <div>

            <p className="
              text-[10px]
              tracking-[4px]
              text-cyan-300
              mb-3
            ">
              ADMIN PANEL
            </p>

            <h2 className="
              text-4xl
              font-bold
            ">
              Open Diver Course
            </h2>

          </div>

          <button
            onClick={handleSave}
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
            "
          >

            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save"}

          </button>

        </div>

        {/* HERO PREVIEW */}
        <div className="
          text-center
          max-w-5xl
          mx-auto
        ">

          {/* BADGE */}
          <input
            value={
              course?.badge || ""
            }
            onChange={(e) =>
              setCourse({
                ...course,
                badge:
                  e.target.value,
              })
            }
            className="
              mb-8
              px-6
              py-3
              rounded-full
              bg-white/10
              border
              border-cyan-300/30
              text-cyan-200
              text-center
              outline-none
              w-full
              max-w-md
            "
          />

          {/* TITLES */}
          <div className="
            grid
            md:grid-cols-2
            gap-5
            mb-6
          ">

            <input
              value={
                course?.title || ""
              }
              onChange={(e) =>
                setCourse({
                  ...course,
                  title:
                    e.target.value,
                })
              }
              className="
                h-[64px]
                rounded-2xl
                bg-white/10
                border
                border-white/10
                px-6
                text-white
                text-2xl
                outline-none
              "
            />

            <input
              value={
                course?.highlighted_title || ""
              }
              onChange={(e) =>
                setCourse({
                  ...course,
                  highlighted_title:
                    e.target.value,
                })
              }
              className="
                h-[64px]
                rounded-2xl
                bg-cyan-400/10
                border
                border-cyan-400/20
                px-6
                text-cyan-300
                text-2xl
                outline-none
              "
            />

          </div>

          {/* DESCRIPTION */}
          <textarea
            rows={5}
            value={
              course?.description || ""
            }
            onChange={(e) =>
              setCourse({
                ...course,
                description:
                  e.target.value,
              })
            }
            className="
              w-full
              rounded-3xl
              bg-white/10
              border
              border-white/10
              p-6
              text-white
              outline-none
              resize-none
              mb-12
            "
          />

          {/* PRICE CARD */}
          <div className="
            max-w-md
            mx-auto
            bg-white/10
            backdrop-blur-xl
            border
            border-white/20
            rounded-3xl
            p-8
            mb-12
          ">

            <input
              value={
                course?.old_price || ""
              }
              onChange={(e) =>
                setCourse({
                  ...course,
                  old_price:
                    e.target.value,
                })
              }
              className="
                w-full
                h-[50px]
                rounded-xl
                bg-white/5
                border
                border-white/10
                px-5
                text-center
                text-white/50
                line-through
                outline-none
                mb-4
              "
            />

            <input
              value={
                course?.price || ""
              }
              onChange={(e) =>
                setCourse({
                  ...course,
                  price:
                    e.target.value,
                })
              }
              className="
                w-full
                h-[72px]
                rounded-2xl
                bg-cyan-400/10
                border
                border-cyan-400/20
                px-5
                text-center
                text-cyan-300
                text-4xl
                font-bold
                outline-none
                mb-4
              "
            />

            <textarea
              rows={3}
              value={
                course?.price_subtext || ""
              }
              onChange={(e) =>
                setCourse({
                  ...course,
                  price_subtext:
                    e.target.value,
                })
              }
              className="
                w-full
                rounded-2xl
                bg-white/5
                border
                border-white/10
                p-4
                text-white/70
                text-center
                outline-none
                resize-none
              "
            />

          </div>

          {/* BUTTONS */}
          <div className="
            flex
            flex-col
            items-center
            gap-5
            mb-14
          ">

            <input
              value={
                course?.button_text || ""
              }
              onChange={(e) =>
                setCourse({
                  ...course,
                  button_text:
                    e.target.value,
                })
              }
              className="
                h-[58px]
                rounded-xl
                bg-cyan-400
                px-8
                text-black
                font-semibold
                text-center
                outline-none
                w-full
                max-w-md
              "
            />

            <div className="
              flex
              items-center
              gap-3
              w-full
              max-w-md
            ">

              <FaWhatsapp className="
                text-green-400
                text-xl
              " />

              <input
                value={
                  course?.whatsapp_text || ""
                }
                onChange={(e) =>
                  setCourse({
                    ...course,
                    whatsapp_text:
                      e.target.value,
                  })
                }
                className="
                  flex-1
                  h-[58px]
                  rounded-xl
                  bg-white/10
                  border
                  border-white/10
                  px-5
                  text-white
                  outline-none
                "
              />

            </div>

          </div>

          {/* FEATURES */}
          <div className="
            grid
            md:grid-cols-2
            gap-5
          ">

            {[
              "feature_1",
              "feature_2",
              "feature_3",
              "feature_4",
            ].map((item) => (

              <input
                key={item}
                value={
                  course?.[item] || ""
                }
                onChange={(e) =>
                  setCourse({
                    ...course,
                    [item]:
                      e.target.value,
                  })
                }
                className="
                  h-[56px]
                  rounded-2xl
                  bg-white/10
                  border
                  border-white/10
                  px-5
                  text-white
                  outline-none
                "
              />

            ))}

          </div>

        </div>

      </div>

    </section>

  );

}