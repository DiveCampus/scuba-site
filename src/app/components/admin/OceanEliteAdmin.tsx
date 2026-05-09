"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {

  Save,

  Plus,

} from "lucide-react";

import {

  getOceanEliteSection,

  updateOceanEliteSection,

  getOceanEliteReviews,

  updateOceanEliteReview,

  getOceanEliteFaqs,

  updateOceanEliteFaq,

} from "@/services/OceanEliteService";

/* =========================================
   ADMIN
========================================= */

export default function OceanEliteAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [reviews, setReviews] =
    useState<any[]>([]);

  const [faqs, setFaqs] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const fetchData = async () => {

      const { data: sectionData } =
        await getOceanEliteSection();

      const { data: reviewData } =
        await getOceanEliteReviews();

      const { data: faqData } =
        await getOceanEliteFaqs();

      setSection(sectionData);

      setReviews(reviewData || []);

      setFaqs(faqData || []);

      setLoading(false);

    };

    fetchData();

  }, []);

  /* =========================================
     SAVE
  ========================================= */

  const handleSave = async () => {

    if (!section?.id) return;

    setSaving(true);

    await updateOceanEliteSection(
      section.id,
      section
    );

    setSaving(false);

  };

  if (loading) return null;

  return (

    <section
      className="
        py-32
        bg-[#f5f7fa]
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      <div className="
        max-w-7xl
        mx-auto
        px-6
      ">

        {/* HEADER */}
        <div className="
          flex
          items-center
          justify-between
          mb-20
          flex-wrap
          gap-5
        ">

          <div>

            <p className="
              text-[10px]
              tracking-[4px]
              text-cyan-500
              mb-3
            ">

              ADMIN PANEL

            </p>

            <h2 className="
              text-4xl
              font-bold
              text-[#07142b]
            ">

              Ocean Elite

            </h2>

          </div>

          <button
            onClick={handleSave}
            className="
              h-[56px]
              px-7
              rounded-2xl
              bg-cyan-500
              text-white
              font-semibold
              flex
              items-center
              gap-3
            "
          >

            <Save size={18} />

            {
              saving
                ? "Saving..."
                : "Save"
            }

          </button>

        </div>

        {/* TITLES */}
        <div className="
          text-center
          max-w-4xl
          mx-auto
          mb-24
        ">

          <input
            value={
              section?.title || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                title:
                  e.target.value,
              })
            }
            className="
              w-full
              h-[78px]
              rounded-3xl
              bg-white
              border
              border-gray-200
              text-center
              text-5xl
              font-bold
              text-[#07142b]
              outline-none
              mb-5
            "
          />

          <input
            value={
              section?.highlighted_title || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                highlighted_title:
                  e.target.value,
              })
            }
            className="
              w-full
              h-[78px]
              rounded-3xl
              bg-cyan-50
              border
              border-cyan-200
              text-center
              text-5xl
              font-bold
              text-cyan-500
              outline-none
              mb-8
            "
          />

          <textarea
            rows={4}
            value={
              section?.description || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                description:
                  e.target.value,
              })
            }
            className="
              w-full
              rounded-[32px]
              bg-white
              border
              border-gray-200
              p-8
              text-center
              text-gray-500
              leading-[2]
              outline-none
              resize-none
            "
          />

        </div>

        {/* CONTENT */}
        <div className="
          grid
          lg:grid-cols-2
          gap-16
          items-start
        ">

          {/* REVIEWS */}
          <div>

            {/* TOP CARD */}
            <div className="
              bg-white
              rounded-[32px]
              border
              border-gray-200
              p-12
              shadow-sm
              mb-8
            ">

              <h3 className="
                text-4xl
                font-bold
                text-center
                text-[#07142b]
                mb-8
              ">

                Dont Take Our
                <br />
                Word For It.

              </h3>

              <p className="
                text-center
                text-gray-500
                leading-[2]
              ">

                Real stories from divers
                who pushed their limits
                with the Nemo Advanced
                Team.

              </p>

            </div>

            {/* REVIEW CARDS */}
            <div className="
              grid
              md:grid-cols-2
              gap-6
            ">

              {reviews.map((item, i) => (

                <motion.div
                  key={item.id}
                  whileHover={{
                    y: -4,
                  }}
                  className="
                    bg-white
                    rounded-[28px]
                    p-7
                    border
                    border-gray-200
                    shadow-sm
                  "
                >

                  <input
                    value={
                      item.user_name
                    }
                    onChange={(e) => {

                      const updated =
                        [...reviews];

                      updated[
                        i
                      ].user_name =
                        e.target.value;

                      setReviews(
                        updated
                      );

                      updateOceanEliteReview(
                        item.id,
                        updated[i]
                      );

                    }}
                    className="
                      w-full
                      h-[52px]
                      rounded-2xl
                      bg-[#f8fafc]
                      border
                      border-gray-200
                      px-5
                      text-[#07142b]
                      font-semibold
                      outline-none
                      mb-5
                    "
                  />

                  <textarea
                    rows={5}
                    value={
                      item.review_text
                    }
                    onChange={(e) => {

                      const updated =
                        [...reviews];

                      updated[
                        i
                      ].review_text =
                        e.target.value;

                      setReviews(
                        updated
                      );

                      updateOceanEliteReview(
                        item.id,
                        updated[i]
                      );

                    }}
                    className="
                      w-full
                      rounded-2xl
                      bg-[#f8fafc]
                      border
                      border-gray-200
                      p-5
                      text-gray-500
                      leading-[2]
                      outline-none
                      resize-none
                    "
                  />

                </motion.div>

              ))}

            </div>

          </div>

          {/* FAQ */}
          <div>

            <h3 className="
              text-3xl
              font-bold
              text-[#07142b]
              mb-10
            ">

              Tactical Briefing

            </h3>

            <div className="
              space-y-5
            ">

              {faqs.map((faq, i) => (

                <div
                  key={faq.id}
                  className="
                    bg-white
                    rounded-[24px]
                    border
                    border-gray-200
                    shadow-sm
                    p-6
                  "
                >

                  <div className="
                    flex
                    items-center
                    justify-between
                    mb-5
                  ">

                    <Plus
                      size={18}
                      className="
                        text-cyan-500
                      "
                    />

                  </div>

                  <input
                    value={
                      faq.question
                    }
                    onChange={(e) => {

                      const updated =
                        [...faqs];

                      updated[
                        i
                      ].question =
                        e.target.value;

                      setFaqs(
                        updated
                      );

                      updateOceanEliteFaq(
                        faq.id,
                        updated[i]
                      );

                    }}
                    className="
                      w-full
                      h-[54px]
                      rounded-2xl
                      bg-[#f8fafc]
                      border
                      border-gray-200
                      px-5
                      text-[#07142b]
                      font-semibold
                      outline-none
                      mb-4
                    "
                  />

                  <textarea
                    rows={4}
                    value={
                      faq.answer
                    }
                    onChange={(e) => {

                      const updated =
                        [...faqs];

                      updated[
                        i
                      ].answer =
                        e.target.value;

                      setFaqs(
                        updated
                      );

                      updateOceanEliteFaq(
                        faq.id,
                        updated[i]
                      );

                    }}
                    className="
                      w-full
                      rounded-2xl
                      bg-[#f8fafc]
                      border
                      border-gray-200
                      p-5
                      text-gray-500
                      leading-[2]
                      outline-none
                      resize-none
                    "
                  />

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}