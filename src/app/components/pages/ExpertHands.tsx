"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { getExpertHands } from "@/services/ExpertHandsService";

// Fallback content — keeps the section pixel-identical when the DB is empty.
const DEFAULT_SECTION = {
  badge: "THE DIVECAMPUS STANDARD",
  title: "EXPERT HANDS. ALWAYS.",
  description_1:
    "Your safety is our Priority. We maintain a strict maximum ratio of 3 students per instructor, ensuring you never feel lost in a crowd.",
  description_2:
    "Want exclusive focus? You can upgrade to a dedicated 1-on-1 Private Instructor during booking for total privacy and personalized attention.",
  image_url: "/1.avif",
};

const DEFAULT_FEATURES = [
  { feature: "MAX 3 STUDENTS PER INSTRUCTOR" },
  { feature: "PRIVATE INSTRUCTORS ON REQUEST" },
  { feature: "FREE PHOTOS & VIDEOS" },
  { feature: "PREMIUM GEARS" },
];

export function ExpertHands() {
  const [section, setSection] = useState<any>(DEFAULT_SECTION);
  const [features, setFeatures] = useState<any[]>(DEFAULT_FEATURES);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { section, features } = await getExpertHands();

    if (section) setSection(section);

    if (features && features.length) setFeatures(features);
  };

  return (
    <>
      <section
        className="py-16 md:py-24 bg-[#f5f8fb]"
        style={{ fontFamily: "Harabara, sans-serif" }}
      >

        {/* CONTAINER */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 md:gap-14 items-center px-6">

          {/* IMAGE SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-fit"
          >

            {/* CORNER ACCENT */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-l-[3px] border-t-[3px] border-cyan-400 rounded-tl-sm" />

            {/* IMAGE */}
            <div className="w-[320px] h-[205px] rounded-md overflow-hidden shadow-lg">

              <img
                src={section.image_url}
                alt="Diver"
                className="w-full h-full object-cover"
              />

            </div>

          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >

            {/* BADGE */}
            <p className="text-[12px] font-semibold tracking-[3px] uppercase text-cyan-500 mb-3">
              {section.badge}
            </p>

            {/* TITLE */}
            <h2 className="text-[36px] md:text-[52px] leading-[1.1] tracking-[1px] font-semibold text-[#0b1623]">

              {section.title}

            </h2>

            {/* DESC */}
            <p className="mt-6 text-[14px] leading-relaxed text-[#7a8795] max-w-md">
              {section.description_1}
            </p>

            <p className="mt-6 text-[14px] leading-relaxed text-[#7a8795] max-w-md">
              {section.description_2}
            </p>

            {/* FEATURES */}
            <div className="mt-10 grid grid-cols-2 gap-y-6 gap-x-8">

              {features.map((item, i) => (
                <div
                  key={item.id ?? i}
                  className="flex items-start gap-3"
                >

                  {/* ICON */}
                  <div className="w-5 h-5 rounded-full border border-cyan-400 flex items-center justify-center shrink-0 mt-[2px]">

                    <Check
                      size={10}
                      className="text-cyan-500"
                    />

                  </div>

                  {/* TEXT */}
                  <p className="text-[12px] font-semibold tracking-[3px] leading-[1.6] text-[#1b2735] uppercase">
                    {item.feature ?? item}
                  </p>

                </div>
              ))}

            </div>

          </motion.div>

        </div>

      </section>

      {/* FONT */}
      <style jsx global>{`
        @font-face {
          font-family: 'Harabara';
          src: url('/fonts/Harabara.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }
      `}</style>
    </>
  );
}
