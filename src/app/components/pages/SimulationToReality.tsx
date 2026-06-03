// =========================================
// SimulationToReality.tsx
// DYNAMIC FRONTEND
// =========================================

"use client";

import {

  useEffect,

  useState,

} from "react";

import {

  Check,

} from "lucide-react";

import {

  motion,

} from "framer-motion";

import {

  getSimulationReality,

} from "@/services/SimulationRealityService";

export function SimulationToReality() {

  const [section, setSection] =
    useState<any>(null);

  const [features, setFeatures] =
    useState<any[]>([]);

  /* =========================================
     LOAD DATA
  ========================================= */

  useEffect(() => {

    const load =
      async () => {

        const { section, features } = await getSimulationReality();

        console.log(
          "SECTION =>",
          section
        );

        console.log(
          "FEATURES =>",
          features
        );

        setSection(section);

        setFeatures(
          features || []
        );

      };

    load();

  }, []);

  if (!section)
    return null;

  return (

    <>
      <section
        className="py-16 md:py-24 bg-[#f4f7fb] relative overflow-hidden"
        style={{
          fontFamily:
            "Harabara, sans-serif",
        }}
      >

        {/* BACKGROUND GLOW */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-400/10 blur-[100px] rounded-full" />

        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />

        <div className="max-w-[980px] mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center px-6 relative z-10">

          {/* IMAGE */}
          <motion.div

            initial={{
              opacity: 0,
              x: -30,
            }}

            whileInView={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              duration: 0.5,
            }}

            className="flex justify-center"

          >

            <div className="relative">

              {/* IMAGE */}
              <img

                src={
                  section.image_url
                }

                className="w-[280px] md:w-[360px] h-[360px] object-cover rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]"

              />

              {/* GLOW */}
              <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-cyan-400/20 blur-[70px] rounded-full" />

            </div>

          </motion.div>

          {/* CONTENT */}
          <motion.div

            initial={{
              opacity: 0,
              x: 30,
            }}

            whileInView={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              duration: 0.5,
            }}

          >

            {/* TOP LABEL */}
            <p className="text-[12px] font-semibold uppercase tracking-[3px] text-cyan-500 mb-3">

              {
                section.top_label
              }

            </p>

            {/* TITLE */}
            <h2 className="text-[36px] md:text-[52px] font-semibold leading-[1.1] tracking-[1px] text-[#0a0e27]">

              {
                section.title
              }

              <br />

              <span className="text-cyan-500">

                {
                  section.highlighted_title
                }

              </span>

            </h2>

            {/* DESCRIPTION */}
            <p className="mt-5 text-[15px] md:text-[16px] font-normal text-gray-500 leading-[1.7] tracking-[0.45px] max-w-[500px]">

              {
                section.description
              }

            </p>

            {/* LIST */}
            <div className="mt-8 md:mt-12 space-y-7">

              {features.map(

                (
                  item,
                  i
                ) => (

                  <motion.div

                    key={item.id}

                    whileHover={{
                      x: 4,
                    }}

                    transition={{
                      duration: 0.2,
                    }}

                    className="border-b border-gray-200 pb-6"

                  >

                    <div className="flex items-start gap-4">

                      {/* ICON */}
                      <div className="w-7 h-7 flex items-center justify-center rounded-full bg-cyan-100 text-cyan-500 mt-1 shrink-0">

                        <Check className="w-3.5 h-3.5" />

                      </div>

                      {/* TEXT */}
                      <div>

                        {/* FEATURE TITLE */}
                        <h4 className="text-[#0a0e27] text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2]">

                          {
                            item.title
                          }

                        </h4>

                        {/* FEATURE DESCRIPTION */}
                        <p className="text-[14px] text-gray-500 mt-3 leading-relaxed tracking-[0.35px] max-w-[420px]">

                          {
                            item.description
                          }

                        </p>

                      </div>

                    </div>

                  </motion.div>

                )

              )}

            </div>

          </motion.div>

        </div>

      </section>
    </>

  );

}