"use client";

import {

  useEffect,

  useState,

} from "react";

import {

  Check,

  Plus,

  X,

} from "lucide-react";

import { motion } from "framer-motion";

import {

  getCareerPathSection,

  getCareerPathBenefits,

  getCareerPathFaqs,

} from "@/services/CareerPathService";

/* =========================================
   FRONTEND
========================================= */

export function CareerPathSection() {

  const [active, setActive] =
    useState(0);

  const [section, setSection] =
    useState<any>(null);

  const [benefits, setBenefits] =
    useState<any[]>([]);

  const [faqs, setFaqs] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const fetchData =
      async () => {

        const sectionRes = await getCareerPathSection();

        const benefitsRes = await getCareerPathBenefits();

        const faqRes = await getCareerPathFaqs();

        console.log(
          "CAREER SECTION =>",
          sectionRes
        );

        console.log(
          "CAREER BENEFITS =>",
          benefitsRes
        );

        console.log(
          "CAREER FAQS =>",
          faqRes
        );

        setSection(
          sectionRes.data
        );

        setBenefits(
          benefitsRes.data || []
        );

        setFaqs(
          faqRes.data || []
        );

        setLoading(false);

      };

    fetchData();

  }, []);

  if (loading || !section)
    return null;

  return (

    <section
      className="py-16 md:py-24 bg-[#f4f7fb]"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* HEADER */}
      <div className="text-center max-w-[720px] mx-auto px-4">

        {/* TITLE */}
        <h2 className="text-[36px] md:text-[52px] font-semibold text-[#0a0e27] leading-[1.1] tracking-[1px]">

          {section.title}

          <br />

          <span className="text-cyan-500">

            {
              section.highlighted_title
            }

          </span>

        </h2>

        {/* DESCRIPTION */}
        <p className="text-[15px] md:text-[16px] font-normal text-gray-500 mt-5 leading-[1.7] tracking-[0.45px] max-w-2xl mx-auto">

          {
            section.description
          }

        </p>

      </div>

      {/* GRID */}
      <div className="max-w-[950px] mx-auto grid md:grid-cols-2 gap-10 mt-8 md:mt-12 px-4 items-start">

        {/* BENEFITS */}
        <div className="space-y-4">

          {benefits.map(
            (item, i) => (

              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: i * 0.05,
                }}
                className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border border-gray-200 bg-white hover:shadow-sm transition duration-300"
              >

                {/* LEFT */}
                <div className="flex items-center gap-4 min-w-0">

                  {/* ICON */}
                  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-cyan-100 shrink-0">

                    <Check
                      className="w-3.5 h-3.5 text-cyan-500"
                    />

                  </div>

                  {/* TITLE */}
                  <p className="text-[14px] tracking-[0.45px] leading-relaxed text-[#0a0e27] font-medium truncate">

                    {item.title}

                  </p>

                </div>

                {/* TAG */}
                <span className="text-[10px] tracking-[1.2px] text-cyan-500 font-semibold whitespace-nowrap">

                  {item.tag}

                </span>

              </motion.div>

            )
          )}

        </div>

        {/* FAQ */}
        <div className="w-full">

          {/* TITLE */}
          <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] text-[#0a0e27] mb-5">

            {section.faq_title}

          </h3>

          {/* FAQ LIST */}
          <div className="space-y-3">

            {faqs.map(
              (item, i) => (

                <div
                  key={item.id}
                  onClick={() =>
                    setActive(
                      active === i
                        ? -1
                        : i
                    )
                  }
                  className={`
                    rounded-2xl
                    border
                    px-5
                    py-4
                    cursor-pointer
                    transition
                    duration-300
                    ${
                      active === i
                        ? `
                          border-cyan-400
                          bg-white
                          shadow-sm
                        `
                        : `
                          border-gray-200
                          bg-white
                          hover:shadow-sm
                        `
                    }
                  `}
                >

                  {/* QUESTION */}
                  <div className="flex justify-between items-center gap-4">

                    <p className="text-[14px] font-medium tracking-[0.45px] leading-relaxed text-[#0a0e27]">

                      {item.question}

                    </p>

                    {active === i ? (

                      <X className="w-4 h-4 text-cyan-500 shrink-0" />

                    ) : (

                      <Plus className="w-4 h-4 text-gray-400 shrink-0" />

                    )}

                  </div>

                  {/* ANSWER */}
                  {active === i && (

                    <p className="text-[13px] text-gray-500 mt-4 leading-relaxed tracking-[0.35px] pr-5">

                      {item.answer}

                    </p>

                  )}

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </section>

  );

}