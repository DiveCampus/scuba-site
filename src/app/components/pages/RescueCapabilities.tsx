// =========================================
// RescueCapabilities.tsx
// DYNAMIC FRONTEND UI
// =========================================

"use client";

import {

  useEffect,

  useState,

} from "react";

import {

  Shield,

  HeartPulse,

  Activity,

  Monitor,

  Settings,

} from "lucide-react";

import {

  motion,

} from "framer-motion";

import {

  getRescueCapabilities,

} from "@/services/RescueCapabilitiesService";

/* =========================================
   ICON MAP
========================================= */

const iconMap: any = {

  Shield: <Shield />,

  HeartPulse: <HeartPulse />,

  Activity: <Activity />,

  Monitor: <Monitor />,

  Settings: <Settings />,

};

export function RescueCapabilities() {

  const [section, setSection] =
    useState<any>(null);

  const [cards, setCards] =
    useState<any[]>([]);

  /* =========================================
     LOAD DATA
  ========================================= */

  useEffect(() => {

    const load =
      async () => {

        const {

          section,

          cards,

        } =
          await getRescueCapabilities();

        console.log(
          "SECTION =>",
          section
        );

        console.log(
          "CARDS =>",
          cards
        );

        setSection(section);

        setCards(cards || []);

      };

    load();

  }, []);

  if (!section)
    return null;

  return (

    <>

      <section
        className="
          py-32
          bg-[#f4f7fb]
          relative
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
          top-20
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

        {/* HEADER */}
        <div className="
          text-center
          mb-20
          px-6
          relative
          z-10
        ">

          {/* TITLE */}
          <h2 className="
            text-3xl
            md:text-5xl
            font-semibold
            leading-[1.18]
            tracking-[1px]
            text-[#0a0e27]
          ">

            {section.title}

            <br />

            <span className="
              text-cyan-500
            ">

              {section.highlighted_title}

            </span>

          </h2>

          {/* DESCRIPTION */}
          <p className="
            mt-8
            max-w-3xl
            mx-auto
            text-[15px]
            md:text-[16px]
            text-gray-500
            leading-[2]
            tracking-[0.45px]
          ">

            {section.description}

          </p>

        </div>

        {/* GRID */}
        <div className="
          max-w-6xl
          mx-auto
          grid
          md:grid-cols-3
          gap-7
          px-6
          relative
          z-10
        ">

          {/* CARDS */}
          {cards.map(

            (
              item,
              i
            ) => (

              <motion.div

                key={item.id}

                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}

                transition={{
                  duration: 0.25,
                }}

                className="
                  relative
                  bg-white/80
                  backdrop-blur-md
                  border
                  border-gray-200
                  rounded-3xl
                  p-7
                  shadow-sm
                  hover:shadow-xl
                  transition
                  overflow-hidden
                "

              >

                {/* GLOW */}
                <div className="
                  absolute
                  inset-0
                  opacity-0
                  hover:opacity-100
                  transition
                  duration-300
                  bg-gradient-to-r
                  from-cyan-400/10
                  to-blue-500/10
                " />

                {/* TAG */}
                <span className="
                  absolute
                  top-5
                  right-5
                  text-[10px]
                  px-3
                  py-1.5
                  bg-cyan-100
                  text-cyan-600
                  rounded-full
                  tracking-[1px]
                ">

                  {item.tag}

                </span>

                {/* ICON */}
                <div className="
                  w-14
                  h-14
                  flex
                  items-center
                  justify-center
                  rounded-2xl
                  bg-cyan-100
                  text-cyan-500
                  mb-6
                ">

                  {
                    iconMap[
                      item.icon
                    ]
                  }

                </div>

                {/* TITLE */}
                <h3 className="
                  font-semibold
                  text-[#0a0e27]
                  text-[18px]
                  tracking-[0.6px]
                  leading-[1.5]
                  mb-4
                ">

                  {item.title}

                </h3>

                {/* DESC */}
                <p className="
                  text-[14px]
                  text-gray-500
                  leading-[2]
                  tracking-[0.35px]
                ">

                  {item.description}

                </p>

              </motion.div>

            )

          )}

          {/* PREMIUM CARD */}
          <motion.div

            whileHover={{
              scale: 1.03,
            }}

            transition={{
              duration: 0.25,
            }}

            className="
              relative
              bg-[#02131d]
              text-white
              rounded-3xl
              p-8
              shadow-[0_20px_80px_rgba(0,0,0,0.5)]
              flex
              flex-col
              justify-between
              overflow-hidden
            "

          >

            {/* GLOW */}
            <div className="
              absolute
              -top-10
              -right-10
              w-40
              h-40
              bg-cyan-400/20
              blur-[100px]
              rounded-full
            " />

            <div>

              {/* BADGE */}
              <span className="
                text-[10px]
                px-3
                py-1.5
                bg-cyan-500/20
                text-cyan-400
                rounded-full
                tracking-[1px]
              ">

                {section.premium_badge}

              </span>

              {/* TITLE */}
              <h3 className="
                mt-6
                font-semibold
                text-2xl
                tracking-[0.8px]
                leading-[1.45]
              ">

                {section.premium_title}

              </h3>

              {/* DESC */}
              <p className="
                text-white/60
                text-[14px]
                mt-5
                leading-[2]
                tracking-[0.35px]
              ">

                {
                  section.premium_description
                }

              </p>

              {/* PRICE */}
              <h2 className="
                text-4xl
                font-semibold
                text-cyan-400
                mt-8
                tracking-[0.8px]
              ">

                {
                  section.premium_price
                }

              </h2>

            </div>

            {/* BUTTON */}
            <a

              href={
                section.whatsapp_link
              }

              target="_blank"

              className="
                mt-8
                relative
                overflow-hidden
                rounded-2xl
                py-3.5
                font-semibold
                tracking-[1px]
                group
              "

            >

              {/* GLOW */}
              <div className="
                absolute
                inset-0
                bg-gradient-to-r
                from-cyan-400
                to-blue-500
                blur-xl
                opacity-70
                group-hover:opacity-100
                transition
                duration-300
              " />

              {/* CONTENT */}
              <div className="
                relative
                z-10
                bg-gradient-to-r
                from-cyan-400
                to-blue-500
                text-white
                py-3.5
                rounded-2xl
                flex
                items-center
                justify-center
                gap-2
                text-[13px]
              ">

                {
                  section.premium_button
                }

              </div>

            </a>

          </motion.div>

        </div>

      </section>

    </>

  );

}