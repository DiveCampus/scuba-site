"use client";

import { useState, useEffect } from "react";

import { OpenDiverBooking } from "./OpenDiverBooking";

import { FaWhatsapp } from "react-icons/fa";

import { Navbar } from "../Navbar";

import {

  getOpenDiverCourse,

} from "@/services/OpenDiverService";

export function OpenDiver() {

  const [open, setOpen] =
    useState(false);

  const [course, setCourse] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH
  ========================================= */

useEffect(() => {

  const fetchCourse = async () => {

    const response =
      await getOpenDiverCourse();

    console.log(
      "FULL RESPONSE =>",
      response
    );

    console.log(
      "DATA =>",
      response.data
    );

    console.log(
      "ERROR =>",
      response.error
    );

    console.log(
      "COURSE TITLE =>",
      response.data?.title
    );

    console.log(
      "SUPABASE URL =>",
      import.meta.env
        .VITE_SUPABASE_URL
    );

    console.log(
      "SUPABASE KEY =>",
      import.meta.env
        .VITE_SUPABASE_ANON_KEY
    );

    setCourse(response.data);

    setLoading(false);

  };

  fetchCourse();

}, []);
  /* =========================================
     LOADING
  ========================================= */

  if (loading) {

    return (

      <div className="
        h-screen
        flex
        items-center
        justify-center
        bg-black
        text-white
        font-habara
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
        w-full
        overflow-hidden
        font-habara
        text-white
        pt-[100px]
      ">

        {/* BACKGROUND */}
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
              scale-[1.02]
            "
          />

          <div className="
            absolute
            inset-0
            bg-[#02182b]/70
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
            py-2.5
            text-[11px]
            tracking-[2.8px]
            border
            border-cyan-300/40
            rounded-full
            text-cyan-200
            backdrop-blur-md
          ">

            {course?.badge}

          </div>

          {/* TITLE */}
          <h1 className="
            text-4xl
            md:text-6xl
            font-bold
            leading-[1.18]
            tracking-[1px]
            max-w-5xl
          ">

            {course?.title}{" "}

            <span className="
              text-cyan-400
            ">

              {course?.highlighted_title}

            </span>

          </h1>

          {/* DESCRIPTION */}
          <p className="
            mt-7
            text-white/72
            max-w-2xl
            text-[15px]
            md:text-[16px]
            leading-[1.95]
            tracking-[0.5px]
          ">

            {course?.description}

          </p>

          {/* PRICE CARD */}
          <div className="
            mt-14
            bg-white/10
            backdrop-blur-xl
            border
            border-white/20
            rounded-2xl
            px-12
            py-8
            shadow-xl
          ">

            <p className="
              text-xs
              text-white/40
              line-through
              mb-2
              tracking-[2px]
            ">

              AED {course?.old_price}

            </p>

            <h2 className="
              text-5xl
              font-bold
              tracking-[1px]
              leading-none
            ">

              <span className="
                text-cyan-400
                text-lg
                tracking-[2px]
                mr-2
              ">

                AED

              </span>

              {course?.price}

            </h2>

            <p className="
              text-xs
              text-white/55
              mt-4
              tracking-[1px]
              leading-[1.8]
            ">

              {course?.price_subtext}

            </p>

          </div>

          {/* BUTTONS */}
          <div className="
            mt-11
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
                rounded-xl
                bg-cyan-400
                px-8
                py-3.5
                text-black
                font-semibold
                tracking-[1px]
                hover:scale-105
                transition
                duration-300
                shadow-lg
              "
            >

              {course?.button_text}

            </button>

            <a
              href={
                course?.whatsapp_link
              }
              target="_blank"
              rel="noopener noreferrer"
              className="
                border
                border-white/25
                px-8
                py-3.5
                rounded-xl
                flex
                items-center
                gap-3
                tracking-[1px]
                backdrop-blur-md
                hover:bg-white/10
                transition
                duration-300
              "
            >

              <FaWhatsapp className="
                text-green-400
                text-lg
              " />

              {course?.whatsapp_text}

            </a>

            <p className="
              text-[11px]
              text-white/40
              tracking-[1px]
            ">

              {course?.small_text}

            </p>

          </div>

          {/* FEATURES */}
          <div className="
            mt-14
            flex
            gap-10
            text-white/55
            text-[11px]
            tracking-[1.3px]
            flex-wrap
            justify-center
          ">

            <span>
              {course?.feature_1}
            </span>

            <span>
              {course?.feature_2}
            </span>

            <span>
              {course?.feature_3}
            </span>

            <span>
              {course?.feature_4}
            </span>

          </div>

        </div>

      </section>

      {/* FLOATING CTA */}
      <div className="
        fixed
        bottom-6
        left-1/2
        -translate-x-1/2
        z-50
      ">

        <div className="
          flex
          items-center
          bg-[#1f2a33]/90
          backdrop-blur-xl
          p-1.5
          rounded-full
          shadow-[0_10px_40px_rgba(0,0,0,0.6)]
        ">

          <button
            onClick={() =>
              setOpen(true)
            }
            className="
              bg-gradient-to-r
              from-cyan-400
              to-cyan-500
              px-7
              py-3
              rounded-full
              text-black
              font-semibold
              tracking-[1px]
              hover:scale-105
              transition
              duration-300
            "
          >

            {
              course?.floating_button_text
            }

          </button>

          <a
            href={
              course?.whatsapp_link
            }
            target="_blank"
            rel="noopener noreferrer"
            className="
              ml-2
              w-11
              h-11
              rounded-full
              bg-green-500
              flex
              items-center
              justify-center
              text-white
              shadow-md
              hover:scale-110
              transition
              duration-300
            "
          >

            <FaWhatsapp className="
              text-lg
            " />

          </a>

        </div>

      </div>

      <OpenDiverBooking
        isOpen={open}
        onClose={() =>
          setOpen(false)
        }
      />
    </>

  );

}