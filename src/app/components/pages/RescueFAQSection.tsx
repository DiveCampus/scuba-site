"use client";

import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import { getRescueFAQ } from "@/services/RescueFAQService";

export function RescueFAQSection() {

  const [active, setActive] =
    useState<number>(0);

  const [section, setSection] =
    useState<any>(null);

  const [reviews, setReviews] =
    useState<any[]>([]);

  const [faqs, setFaqs] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH DATA
  ========================================= */

  useEffect(() => {

    const load =
      async () => {

        try {

          const res =
            await getRescueFAQ();

          console.log(
            "RESCUE FAQ =>",
            res
          );

          setSection(
            res.section
          );

          setReviews(
            res.reviews || []
          );

          setFaqs(
            res.faqs || []
          );

        } catch (err) {

          console.error(
            "FETCH ERROR =>",
            err
          );

        } finally {

          setLoading(false);

        }

      };

    load();

  }, []);

  /* =========================================
     LOADING
  ========================================= */

  if (loading || !section)
    return null;

  return (

    <section
      className="
        relative
        py-28
        bg-[#f4f7fb]
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

      {/* TOP HEADER */}
      <div className="
        relative
        text-center
        max-w-[760px]
        mx-auto
        px-4
      ">

        {/* LABEL */}
        <p className="
          text-[10px]
          tracking-[3px]
          uppercase
          text-cyan-500
          mb-5
        ">

          {
            section.top_text
          }

        </p>

        {/* TITLE */}
        <h2 className="
          text-3xl
          md:text-5xl
          font-semibold
          text-[#0a0e27]
          leading-[1.18]
          tracking-[1px]
        ">

          {
            section.title
          }{" "}

          <span className="
            text-cyan-500
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
          text-gray-500
          mt-8
          leading-[2]
          tracking-[0.45px]
          max-w-[700px]
          mx-auto
        ">

          {
            section.description
          }

        </p>

      </div>

      {/* MAIN GRID */}
      <div className="
        relative
        max-w-[980px]
        mx-auto
        grid
        md:grid-cols-2
        gap-12
        mt-16
        px-4
      ">

        {/* LEFT CARD */}
        <motion.div

          initial={{
            opacity: 0,
            y: 20,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.4,
          }}

          className="
            bg-white
            rounded-3xl
            p-8
            shadow-sm
            border
            border-gray-100
            text-center
          "

        >

          {/* TITLE */}
          <h3 className="
            text-[22px]
            font-medium
            tracking-[0.7px]
            leading-[1.5]
            text-[#0a0e27]
          ">

            {
              section.review_title
            }

          </h3>

          {/* DESCRIPTION */}
          <p className="
            text-[13px]
            text-gray-500
            mt-5
            leading-[1.95]
            tracking-[0.35px]
            max-w-[340px]
            mx-auto
          ">

            {
              section.review_subtitle
            }

          </p>

          {/* REVIEW BADGE */}
          <div className="
            mt-8
            inline-flex
            items-center
            gap-3
            bg-[#f4f7fb]
            px-5
            py-3
            rounded-full
            shadow-sm
          ">

            <span className="
              text-[12px]
              tracking-[0.4px]
              font-medium
              text-[#0a0e27]
            ">

              Excellent

            </span>

            <span className="
              text-yellow-400
              text-xs
              tracking-[2px]
            ">

              ★★★★★

            </span>

          </div>

          {/* REVIEW CARDS */}
          <div className="
            mt-8
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-4
          ">

            {reviews.map(
              (item) => (

              <div
                key={item.id}
                className="
                  bg-[#f9fbfd]
                  p-4
                  rounded-2xl
                  text-left
                  text-[11px]
                  text-gray-500
                  leading-[1.85]
                  tracking-[0.3px]
                "
              >

                "
                {
                  item.review_text
                }
                "

              </div>

            ))}

          </div>

        </motion.div>

        {/* RIGHT FAQ */}
        <motion.div

          initial={{
            opacity: 0,
            y: 20,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.5,
          }}

        >

          {/* FAQ TITLE */}
          <h3 className="
            text-[13px]
            font-semibold
            tracking-[2px]
            uppercase
            text-[#0a0e27]
            mb-6
          ">

            {
              section.faq_title
            }

          </h3>

          {/* FAQ LIST */}
          <div className="
            space-y-4
          ">

            {faqs.map(
              (item, i) => (

              <div

                key={item.id}

                className={`
                  rounded-2xl
                  border
                  px-5
                  py-5
                  cursor-pointer
                  transition
                  duration-300
                  ${
                    active === i
                      ? "border-cyan-400 bg-white shadow-sm"
                      : "border-gray-200 bg-white"
                  }
                `}

                onClick={() =>
                  setActive(
                    active === i
                      ? -1
                      : i
                  )
                }

              >

                {/* QUESTION */}
                <div className="
                  flex
                  justify-between
                  items-center
                  gap-4
                ">

                  <p className="
                    text-[14px]
                    font-medium
                    tracking-[0.4px]
                    leading-[1.8]
                    text-[#0a0e27]
                  ">

                    {
                      item.question
                    }

                  </p>

                  {active === i ? (

                    <X className="
                      w-4
                      h-4
                      text-cyan-500
                      shrink-0
                    " />

                  ) : (

                    <Plus className="
                      w-4
                      h-4
                      text-gray-400
                      shrink-0
                    " />

                  )}

                </div>

                {/* ANSWER */}
                {active === i && (

                  <p className="
                    text-[13px]
                    text-gray-500
                    mt-5
                    leading-[2]
                    tracking-[0.35px]
                    pr-6
                  ">

                    {
                      item.answer
                    }

                  </p>

                )}

              </div>

            ))}

          </div>

        </motion.div>

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