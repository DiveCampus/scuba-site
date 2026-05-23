"use client";

import { useEffect, useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Plus,
  Save,
} from "lucide-react";

import {

  getGlobalPassportSection,

  updateGlobalPassportSection,

  getGlobalPassportReviews,

  updateGlobalPassportReview,

  getGlobalPassportFaqs,

  updateGlobalPassportFaq,

} from "@/services/GlobalPassportService";

/* =========================================
   COMPONENT
========================================= */

export default function GlobalPassportAdmin() {

  const [active, setActive] =
    useState<number | null>(null);

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

      const { data: sectionData } = await getGlobalPassportSection();

      const { data: reviewsData } = await getGlobalPassportReviews();

      const { data: faqData } = await getGlobalPassportFaqs();

      setSection(sectionData);

      setReviews(reviewsData || []);

      setFaqs(faqData || []);

      setLoading(false);

    };

    fetchData();

  }, []);

  /* =========================================
     SAVE SECTION
  ========================================= */

  const handleSave = async () => {

    if (!section?.id) return;

    setSaving(true);

    await updateGlobalPassportSection(
      section.id,
      section
    );

    setSaving(false);

  };

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa] text-black">

        Loading...

      </div>

    );

  }

  return (

    <section
      className="py-32 bg-[#f5f7fa]"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center justify-between flex-wrap gap-5 mb-16">

          <div>

            <p className="text-[10px] tracking-[4px] text-cyan-500 mb-3">
              ADMIN PANEL
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-[#0a0e27]">
              Global Passport
            </h2>

          </div>

          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            onClick={handleSave}
            className="h-[56px] px-7 rounded-2xl bg-cyan-500 text-white font-semibold flex items-center gap-3"
          >

            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save"}

          </motion.button>

        </div>

        {/* SECTION FORM */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm mb-16 space-y-6">

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="text-xs tracking-[2px] uppercase text-gray-400">
                Title
              </label>

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
                className="mt-3 w-full h-[56px] rounded-2xl border border-gray-200 px-5 text-black outline-none"
              />

            </div>

            <div>

              <label className="text-xs tracking-[2px] uppercase text-gray-400">
                Highlighted Title
              </label>

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
                className="mt-3 w-full h-[56px] rounded-2xl border border-gray-200 px-5 text-black outline-none"
              />

            </div>

          </div>

          <div>

            <label className="text-xs tracking-[2px] uppercase text-gray-400">
              Description
            </label>

            <textarea
              rows={5}
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
              className="mt-3 w-full rounded-2xl border border-gray-200 p-5 text-black outline-none resize-none"
            />

          </div>

        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT */}
          <div>

            {/* TESTIMONIAL CARD */}
            <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-sm">

              <input
                value={
                  section?.testimonial_title || ""
                }
                onChange={(e) =>
                  setSection({
                    ...section,
                    testimonial_title:
                      e.target.value,
                  })
                }
                className="w-full h-[56px] rounded-2xl border border-gray-200 px-5 text-black outline-none mb-5"
              />

              <input
                value={
                  section?.testimonial_highlight || ""
                }
                onChange={(e) =>
                  setSection({
                    ...section,
                    testimonial_highlight:
                      e.target.value,
                  })
                }
                className="w-full h-[56px] rounded-2xl border border-gray-200 px-5 text-black outline-none mb-5"
              />

              <textarea
                rows={4}
                value={
                  section?.testimonial_description || ""
                }
                onChange={(e) =>
                  setSection({
                    ...section,
                    testimonial_description:
                      e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-gray-200 p-5 text-black outline-none resize-none"
              />

            </div>

            {/* REVIEWS */}
            <div className="grid grid-cols-2 gap-5 mt-10">

              {reviews.map(
                (review, i) => (

                  <div
                    key={review.id}
                    className="bg-white border rounded-2xl p-5 shadow-sm"
                  >

                    <input
                      value={
                        review.reviewer_name
                      }
                      onChange={(
                        e
                      ) => {

                        const updated =
                          [...reviews];

                        updated[
                          i
                        ].reviewer_name =
                          e.target.value;

                        setReviews(
                          updated
                        );

                        updateGlobalPassportReview(
                          review.id,
                          updated[i]
                        );

                      }}
                      className="w-full h-[48px] rounded-xl border border-gray-200 px-4 text-black outline-none mb-4"
                    />

                    <textarea
                      rows={4}
                      value={
                        review.review_text
                      }
                      onChange={(
                        e
                      ) => {

                        const updated =
                          [...reviews];

                        updated[
                          i
                        ].review_text =
                          e.target.value;

                        setReviews(
                          updated
                        );

                        updateGlobalPassportReview(
                          review.id,
                          updated[i]
                        );

                      }}
                      className="w-full rounded-2xl border border-gray-200 p-4 text-black outline-none resize-none"
                    />

                  </div>

                )
              )}

            </div>

          </div>

          {/* RIGHT */}
          <div>

            {/* FAQ TITLE */}
            <input
              value={
                section?.faq_title || ""
              }
              onChange={(e) =>
                setSection({
                  ...section,
                  faq_title:
                    e.target.value,
                })
              }
              className="w-full h-[58px] rounded-2xl border border-gray-200 px-5 text-black outline-none mb-8 bg-white"
            />

            {/* FAQS */}
            <div className="space-y-5">

              {faqs.map(
                (faq, i) => (

                  <div
                    key={faq.id}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
                  >

                    {/* QUESTION */}
                    <button
                      onClick={() =>
                        setActive(
                          active === i
                            ? null
                            : i
                        )
                      }
                      className="w-full flex justify-between items-center px-6 py-5"
                    >

                      <input
                        value={
                          faq.question
                        }
                        onChange={(
                          e
                        ) => {

                          const updated =
                            [...faqs];

                          updated[
                            i
                          ].question =
                            e.target.value;

                          setFaqs(
                            updated
                          );

                          updateGlobalPassportFaq(
                            faq.id,
                            updated[i]
                          );

                        }}
                        className="flex-1 bg-transparent text-[14px] text-black outline-none"
                      />

                      <Plus
                        size={18}
                        className="text-cyan-500"
                      />

                    </button>

                    {/* ANSWER */}
                    <AnimatePresence>

                      {active === i && (

                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.3,
                          }}
                          className="px-6 pb-6"
                        >

                          <textarea
                            rows={4}
                            value={
                              faq.answer
                            }
                            onChange={(
                              e
                            ) => {

                              const updated =
                                [...faqs];

                              updated[
                                i
                              ].answer =
                                e.target.value;

                              setFaqs(
                                updated
                              );

                              updateGlobalPassportFaq(
                                faq.id,
                                updated[i]
                              );

                            }}
                            className="w-full rounded-2xl border border-gray-200 p-4 text-black outline-none resize-none"
                          />

                        </motion.div>

                      )}

                    </AnimatePresence>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}