// =========================================
// Rescue.tsx
// DYNAMIC FRONTEND UI
// =========================================

"use client";

import {

  useEffect,

  useState,

} from "react";

import {

  motion,

} from "framer-motion";

import {

  FaWhatsapp,

} from "react-icons/fa";

import {

  OpenDiverBooking,

} from "./OpenDiverBooking";

import {

  getRescueHero,

} from "@/services/RescueHeroService";

export function Rescue() {

  const [open, setOpen] =
    useState(false);

  const [section, setSection] =
    useState<any>(null);

  /* =========================================
     LOAD DATA
  ========================================= */

  useEffect(() => {

    const load =
      async () => {

        const {

          data,

        } =
          await getRescueHero();

        console.log(
          "RESCUE DATA =>",
          data
        );

        setSection(data);

      };

    load();

  }, []);

  if (!section)
    return null;

  return (

    <>

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
        <div className="
          absolute
          inset-0
        ">

          <img

            src={
              section.background_image
            }

            className="
              w-full
              h-full
              object-cover
              scale-110
            "

          />

          <div className="
            absolute
            inset-0
            bg-[#02131d]/80
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
            relative
            overflow-hidden
            mb-8
            px-6
            py-2.5
            text-[11px]
            tracking-[2.5px]
            border
            border-cyan-400/30
            rounded-full
            text-cyan-300
            backdrop-blur-md
          ">

            {section.badge}

            <motion.div

              initial={{
                x: "-100%",
              }}

              animate={{
                x: "200%",
              }}

              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
              }}

              className="
                absolute
                top-0
                left-0
                w-[40%]
                h-full
                bg-gradient-to-r
                from-transparent
                via-cyan-400/60
                to-transparent
                blur-md
              "

            />

          </div>

          {/* SUBTEXT */}
          <p className="
            text-[11px]
            tracking-[4px]
            text-white/50
            mb-5
            uppercase
          ">

            {section.sub_text}

          </p>

          {/* TITLE */}
          <h1 className="
            text-4xl
            md:text-6xl
            font-semibold
            tracking-[1px]
            leading-[1.18]
            max-w-4xl
          ">

            {section.title}{" "}

            <span className="
              text-cyan-400
            ">

              {section.highlighted_title}

            </span>

          </h1>

          {/* DESCRIPTION */}
          <p className="
            mt-7
            text-white/70
            max-w-2xl
            text-[15px]
            md:text-[16px]
            leading-[1.95]
            tracking-[0.6px]
          ">

            {section.description}

          </p>

          {/* PRICE CARD */}
          <div className="
            mt-14
            backdrop-blur-xl
            bg-white/10
            border
            border-white/20
            rounded-2xl
            px-12
            py-9
            shadow-xl
          ">

            {/* OLD PRICE */}
            <p className="
              text-xs
              text-white/40
              line-through
              mb-2
              tracking-[2px]
            ">

              AED {section.old_price}

            </p>

            {/* NEW PRICE */}
            <h2 className="
              text-5xl
              font-semibold
              tracking-[1px]
              leading-none
            ">

              <span className="
                text-cyan-400
                text-lg
                font-medium
                tracking-[2px]
                mr-2
              ">

                AED

              </span>

              {section.new_price}

            </h2>

            {/* TAGS */}
            <div className="
              flex
              justify-center
              gap-3
              mt-6
              flex-wrap
              text-[11px]
              text-white/60
              tracking-[1px]
            ">

              {[

                section.tag_1,

                section.tag_2,

                section.tag_3,

              ].map(

                (
                  tag,
                  i
                ) => (

                  <span

                    key={i}

                    className="
                      px-4
                      py-1.5
                      border
                      border-white/20
                      rounded-full
                    "

                  >

                    {tag}

                  </span>

                )

              )}

            </div>

          </div>

          {/* CTA */}
          <div className="
            mt-10
            flex
            flex-col
            items-center
            gap-5
          ">

            <button

              onClick={() =>
                setOpen(true)
              }

              className="
                px-10
                py-3.5
                rounded-xl
                bg-gradient-to-r
                from-cyan-400
                to-blue-500
                font-semibold
                tracking-[1.2px]
                shadow-lg
                hover:scale-105
                transition
                duration-300
              "

            >

              {section.primary_button}

            </button>

            <p className="
              text-[11px]
              text-white/40
              tracking-[1px]
            ">

              {section.payment_note}

            </p>

          </div>

        </div>

        {/* BOTTOM INFO */}
        <div className="
          absolute
          bottom-0
          w-full
          border-t
          border-white/10
          bg-black/40
          backdrop-blur-md
        ">

          <div className="
            max-w-5xl
            mx-auto
            grid
            grid-cols-2
            md:grid-cols-4
            gap-6
            text-center
            py-6
            px-6
          ">

            {[

              {
                label:
                  section.prerequisite_label,

                value:
                  section.prerequisite_value,
              },

              {
                label:
                  section.certification_label,

                value:
                  section.certification_value,
              },

              {
                label:
                  section.training_label,

                value:
                  section.training_value,
              },

              {
                label:
                  section.location_label,

                value:
                  section.location_value,
              },

            ].map(

              (
                item,
                i
              ) => (

                <div
                  key={i}
                  className="
                    space-y-2
                  "
                >

                  <p className="
                    text-[10px]
                    tracking-[2.5px]
                    text-white/30
                  ">

                    {item.label}

                  </p>

                  <p className="
                    text-[13px]
                    tracking-[0.8px]
                    text-white/80
                    font-medium
                  ">

                    {item.value}

                  </p>

                </div>

              )

            )}

          </div>

        </div>

      </section>

      {/* FLOATING CTA */}
      <div className="
        fixed
        bottom-6
        left-1/2
        -translate-x-1/2
        flex
        items-center
        gap-4
        z-50
      ">

        <button

          onClick={() =>
            setOpen(true)
          }

          className="
            px-8
            py-3.5
            rounded-full
            bg-gradient-to-r
            from-cyan-400
            to-cyan-500
            text-white
            font-semibold
            tracking-[1px]
            shadow-xl
            hover:scale-105
            transition
            duration-300
          "

        >

          {section.primary_button}

        </button>

        <a

          href={
            section.whatsapp_link
          }

          target="_blank"

          className="
            w-12
            h-12
            rounded-full
            bg-green-500
            flex
            items-center
            justify-center
            text-white
            shadow-xl
            hover:scale-110
            transition
            duration-300
          "

        >

          <FaWhatsapp />

        </a>

      </div>

      {/* MODAL */}
      <OpenDiverBooking

        isOpen={open}

        onClose={() =>
          setOpen(false)
        }

      />

    </>

  );

}