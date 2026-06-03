"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {

  Plus,

  Star,

} from "lucide-react";

import {

  getOceanEliteSection,

  getOceanEliteReviews,

  getOceanEliteFaqs,

} from "@/services/OceanEliteService";

/* =========================================
   COMPONENT
========================================= */

export function OceanEliteSection() {

  const [section, setSection] =
    useState<any>(null);

  const [reviews, setReviews] =
    useState<any[]>([]);

  const [faqs, setFaqs] =
    useState<any[]>([]);

  const [openFaq, setOpenFaq] =
    useState<number | null>(0);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const fetchData = async () => {

      const { data: sectionData } = await getOceanEliteSection();

      const { data: reviewData } = await getOceanEliteReviews();

      const { data: faqData } = await getOceanEliteFaqs();

      setSection(sectionData);

      setReviews(reviewData || []);

      setFaqs(faqData || []);

      setLoading(false);

    };

    fetchData();

  }, []);

  if (loading) return null;

  return (

    <section
      className="py-16 md:py-24 bg-[#f5f7fa]"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12">

          <h2 className="text-[36px] md:text-[52px] font-semibold text-[#07142b] leading-[1.1] tracking-[1px] mb-5">

            {section?.title}

            <br />

            <span className="text-cyan-500">

              {
                section?.highlighted_title
              }

            </span>

          </h2>

          <p className="text-[15px] md:text-[16px] font-normal leading-[1.7] text-gray-500 max-w-3xl mx-auto mt-5">

            {section?.description}

          </p>

        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT */}
          <div>

            {/* MAIN CARD */}
            <div className="bg-white rounded-[32px] p-14 shadow-sm border border-gray-200 mb-8">

              <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] text-[#07142b] text-center mb-4">

                Dont Take Our
                <br />
                Word For It.

              </h3>

              <p className="text-center text-gray-500 text-[14px] md:text-[15px] leading-relaxed max-w-md mx-auto mt-4 mb-10 md:mb-12">

                Real stories from divers
                who pushed their limits
                with the DiveCampus Advanced
                Team.

              </p>

              {/* RATING */}
              <div className="flex items-center justify-center">

                <div className="flex items-center gap-5 px-8 py-4 rounded-full bg-[#f8fafc]">

                  <div className="flex items-center gap-1 text-yellow-400">

                    {[1,2,3,4,5].map(
                      (item) => (

                        <Star
                          key={item}
                          size={18}
                          fill="currentColor"
                        />

                      )
                    )}

                  </div>

                  <span className="font-semibold text-[#07142b]">

                    Excellent

                  </span>

                  <span className="text-gray-400 text-sm">

                    1054 Reviews

                  </span>

                </div>

              </div>

            </div>

            {/* REVIEW CARDS */}
            <div className="grid md:grid-cols-2 gap-6">

              {reviews.map((item) => (

                <motion.div
                  key={item.id}
                  whileHover={{
                    y: -5,
                  }}
                  className="bg-white rounded-[28px] p-8 border border-gray-200 shadow-sm"
                >

                  <h4 className="text-[#07142b] font-semibold mb-5">

                    {item.user_name}

                  </h4>

                  <p className="text-gray-500 leading-relaxed text-[14px] md:text-[15px]">

                    {item.review_text}

                  </p>

                </motion.div>

              ))}

            </div>

          </div>

          {/* FAQ */}
          <div>

            <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] text-[#07142b] mb-8 md:mb-12">

              Tactical Briefing

            </h3>

            <div className="space-y-5">

              {faqs.map((faq, i) => (

                <div
                  key={faq.id}
                  className="bg-white rounded-[24px] border border-gray-200 overflow-hidden shadow-sm"
                >

                  {/* QUESTION */}
                  <button
                    onClick={() =>
                      setOpenFaq(
                        openFaq === i
                          ? null
                          : i
                      )
                    }
                    className="w-full px-8 py-7 flex items-center justify-between text-left"
                  >

                    <span className="text-[#07142b] font-semibold">

                      {faq.question}

                    </span>

                    <Plus
                      size={20}
                      className="text-cyan-500"
                    />

                  </button>

                  {/* ANSWER */}
                  {openFaq === i && (

                    <div className="px-8 pb-7">

                      <p className="text-gray-500 leading-relaxed">

                        {faq.answer}

                      </p>

                    </div>

                  )}

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}