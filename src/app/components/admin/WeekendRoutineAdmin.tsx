"use client";

import {

  useEffect,
  useState,

} from "react";

import { motion } from "framer-motion";

import {

  getWeekendRoutine,
  updateWeekendRoutineSection,
  updateWeekendRoutineImage,
  updateWeekendRoutineGiftCard,

} from "@/services/WeekendRoutineService";

export default function
WeekendRoutineAdmin() {

  const [

    section,
    setSection,

  ] = useState<any>(null);

  const [

    images,
    setImages,

  ] = useState<any[]>([]);

  const [

    giftCard,
    setGiftCard,

  ] = useState<any>(null);

  const [

    saving,
    setSaving,

  ] = useState(false);

  /* =========================
     LOAD
  ========================= */

  useEffect(() => {

    load();

  }, []);

  const load =
    async () => {

      const {

        section,
        images,
        giftCard,

      } =
        await getWeekendRoutine();

      setSection(
        section
      );

      setImages(
        images || []
      );

      setGiftCard(
        giftCard
      );

    };

  /* =========================
     UPDATE IMAGE
  ========================= */

  const updateImage =
    (
      id: string,
      value: string
    ) => {

      setImages(
        prev =>
          prev.map(
            img =>
              img.id ===
              id
                ? {

                    ...img,

                    image_url:
                      value,

                  }
                : img
          )
      );

    };

  /* =========================
     SAVE
  ========================= */

  const handleSave =
    async () => {

      try {

        setSaving(
          true
        );

        /* SECTION */
        await updateWeekendRoutineSection(

          section.id,

          section

        );

        /* IMAGES */
        for (
          const image
          of images
        ) {

          await updateWeekendRoutineImage(

            image.id,

            image

          );

        }

        /* GIFT CARD */
        await updateWeekendRoutineGiftCard(

          giftCard.id,

          giftCard

        );

        alert(
          "Saved Successfully ✅"
        );

      } catch (
        err
      ) {

        console.error(
          err
        );

      } finally {

        setSaving(
          false
        );

      }

    };

  if (
    !section ||
    !giftCard
  )
    return null;

  return (

    <section
      className="
      relative
      overflow-hidden
      py-24
      bg-[#071c2d]
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* BG */}
      <div className="
      absolute
      inset-0
      ">

        <div className="
        absolute
        top-0
        left-0
        w-[40%]
        h-[500px]
        bg-cyan-500/10
        blur-[140px]
        " />

        <div className="
        absolute
        bottom-0
        right-0
        w-[30%]
        h-[400px]
        bg-blue-500/10
        blur-[120px]
        " />

      </div>

      <div className="
      relative
      z-10
      max-w-7xl
      mx-auto
      px-6
      ">

        {/* ======================
            HEADER
        ====================== */}

        <div className="
        text-center
        ">

          {/* TITLE */}
          <textarea
            value={
              section.title
            }
            onChange={e =>
              setSection({

                ...section,

                title:
                  e.target
                    .value,

              })
            }
            rows={2}
            className="
            bg-transparent
            text-center
            text-white
            text-3xl
            md:text-5xl
            font-semibold
            resize-none
            outline-none
            w-full
            "
          />

          {/* HIGHLIGHT */}
          <input
            value={
              section.highlighted_title
            }
            onChange={e =>
              setSection({

                ...section,

                highlighted_title:
                  e.target
                    .value,

              })
            }
            className="
            mt-3
            bg-transparent
            text-cyan-400
            text-center
            text-2xl
            outline-none
            w-full
            "
          />

          {/* DESCRIPTION */}
          <textarea
            value={
              section.description
            }
            onChange={e =>
              setSection({

                ...section,

                description:
                  e.target
                    .value,

              })
            }
            rows={3}
            className="
            mt-5
            bg-transparent
            text-white/50
            text-center
            resize-none
            outline-none
            w-full
            max-w-3xl
            mx-auto
            block
            "
          />

        </div>

        {/* ======================
            IMAGES
        ====================== */}

        <div className="
        mt-16
        grid
        grid-cols-2
        md:grid-cols-4
        gap-5
        ">

          {images.map(
            image => (

              <motion.div
                key={
                  image.id
                }
                whileHover={{
                  y: -5,
                }}
                className="
                rounded-2xl
                overflow-hidden
                border
                border-white/10
                bg-white/5
                p-3
                "
              >

                <img
                  src={
                    image.image_url
                  }
                  className="
                  h-[220px]
                  w-full
                  object-cover
                  rounded-xl
                  mb-3
                  "
                />

                <input
                  value={
                    image.image_url
                  }
                  onChange={e =>
                    updateImage(

                      image.id,

                      e.target
                        .value
                    )
                  }
                  className="
                  w-full
                  bg-white/10
                  border
                  border-white/10
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  "
                />

              </motion.div>
            )
          )}

        </div>

        {/* ======================
            GIFT CARD
        ====================== */}

        <div className="
        mt-20
        max-w-[500px]
        mx-auto
        ">

          <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-10
          text-center
          ">

            <input
              value={
                giftCard.emoji
              }
              onChange={e =>
                setGiftCard({

                  ...giftCard,

                  emoji:
                    e.target
                      .value,

                })
              }
              className="
              bg-transparent
              text-4xl
              text-center
              w-full
              outline-none
              mb-5
              "
            />

            <textarea
              value={
                giftCard.title
              }
              onChange={e =>
                setGiftCard({

                  ...giftCard,

                  title:
                    e.target
                      .value,

                })
              }
              rows={2}
              className="
              bg-transparent
              text-white
              text-[22px]
              font-semibold
              text-center
              resize-none
              outline-none
              w-full
              "
            />

            <textarea
              value={
                giftCard.description
              }
              onChange={e =>
                setGiftCard({

                  ...giftCard,

                  description:
                    e.target
                      .value,

                })
              }
              rows={4}
              className="
              mt-4
              bg-transparent
              text-white/50
              text-center
              resize-none
              outline-none
              w-full
              "
            />

            <textarea
              value={
                giftCard.notice
              }
              onChange={e =>
                setGiftCard({

                  ...giftCard,

                  notice:
                    e.target
                      .value,

                })
              }
              rows={2}
              className="
              mt-7
              bg-lime-400/10
              border
              border-lime-400/30
              rounded-full
              text-lime-300
              text-center
              px-5
              py-3
              resize-none
              outline-none
              w-full
              "
            />

          </div>

        </div>

        {/* SAVE */}
        <div className="
        flex
        justify-center
        mt-14
        ">

          <button
            onClick={
              handleSave
            }
            disabled={
              saving
            }
            className="
            px-10
            py-4
            rounded-xl
            bg-gradient-to-r
            from-cyan-400
            to-blue-500
            text-[#02131d]
            font-semibold
            tracking-[1px]
            "
          >

            {saving

              ? "Saving..."

              : "Save Changes"}

          </button>

        </div>

      </div>

    </section>
  );
}