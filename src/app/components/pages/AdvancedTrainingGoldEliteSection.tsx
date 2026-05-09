"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {

  Award,

  Clock,

  Users,

} from "lucide-react";

import {

  getAdvancedTrainingEliteSection,

} from "@/services/AdvancedTrainingEliteService";

/* =========================================
   FRONTEND
========================================= */

export function AdvancedTrainingGoldEliteSection() {

  const [data, setData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const fetchData = async () => {

      const { data } =
        await getAdvancedTrainingEliteSection();

      setData(data);

      setLoading(false);

    };

    fetchData();

  }, []);

  if (loading) return null;

  return (

    <section
      className="
        py-36
        bg-[#f4f7fb]
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
        grid
        lg:grid-cols-2
        gap-20
        items-center
      ">

        {/* ================= LEFT ================= */}
        <div>

          {/* BADGE */}
          <div className="
            inline-flex
            items-center
            px-7
            py-3
            rounded-full
            border
            border-cyan-400/40
            text-cyan-400
            text-[10px]
            tracking-[4px]
            mb-10
          ">

            {data?.badge}

          </div>

          {/* TITLE */}
          <h2 className="
            text-5xl
            md:text-6xl
            font-bold
            text-[#071133]
            leading-[1.08]
            tracking-[-2px]
            mb-10
          ">

            {data?.title}

            <br />

            <span className="
              text-cyan-500
            ">

              {
                data?.highlighted_title
              }

            </span>

          </h2>

          {/* DESCRIPTION */}
          <p className="
            text-[#5f6982]
            text-[17px]
            leading-[2]
            max-w-2xl
            mb-16
          ">

            {data?.description}

          </p>

          {/* CARD */}
          <motion.div
            whileHover={{
              y: -5,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              relative
              bg-[#fffdf8]
              border
              border-yellow-300
              rounded-[34px]
              p-10
              shadow-sm
            "
          >

            {/* ICON */}
            <div className="
              absolute
              -top-5
              left-8
              w-12
              h-12
              rounded-full
              bg-white
              border
              border-yellow-300
              flex
              items-center
              justify-center
            ">

              <Award
                className="
                  text-yellow-500
                "
                size={18}
              />

            </div>

            {/* TITLE */}
            <h3 className="
              text-[36px]
              font-bold
              text-[#071133]
              leading-[1.2]
              mb-8
              mt-4
            ">

              {data?.card_title}

            </h3>

            {/* TEXT */}
            <p className="
              text-[#667085]
              leading-[2]
              text-[15px]
              mb-10
            ">

              {
                data?.card_description
              }

            </p>

            {/* TAGS */}
            <div className="
              flex
              flex-wrap
              gap-4
            ">

              {/* TAG 1 */}
              <div className="
                px-6
                py-3
                rounded-full
                border
                border-yellow-400
                flex
                items-center
                gap-3
                text-yellow-600
                text-[12px]
                tracking-[1px]
              ">

                <Clock size={14} />

                {data?.tag_1}

              </div>

              {/* TAG 2 */}
              <div className="
                px-6
                py-3
                rounded-full
                border
                border-yellow-400
                flex
                items-center
                gap-3
                text-yellow-600
                text-[12px]
                tracking-[1px]
              ">

                <Award size={14} />

                {data?.tag_2}

              </div>

              {/* TAG 3 */}
              <div className="
                px-6
                py-3
                rounded-full
                border
                border-yellow-400
                flex
                items-center
                gap-3
                text-yellow-600
                text-[12px]
                tracking-[1px]
              ">

                <Users size={14} />

                {data?.tag_3}

              </div>

            </div>

          </motion.div>

        </div>

        {/* ================= RIGHT ================= */}
        <div className="
          grid
          grid-cols-2
          gap-6
        ">

          {/* BIG IMAGE */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              row-span-2
              rounded-[34px]
              overflow-hidden
              shadow-md
              min-h-[620px]
            "
          >

            <img
              src={data?.image_1}
              className="
                w-full
                h-full
                object-cover
              "
            />

          </motion.div>

          {/* TOP IMAGE */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              rounded-[34px]
              overflow-hidden
              shadow-md
              h-[300px]
            "
          >

            <img
              src={data?.image_2}
              className="
                w-full
                h-full
                object-cover
              "
            />

          </motion.div>

          {/* BOTTOM IMAGE */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              rounded-[34px]
              overflow-hidden
              shadow-md
              h-[300px]
            "
          >

            <img
              src={data?.image_3}
              className="
                w-full
                h-full
                object-cover
              "
            />

          </motion.div>

        </div>

      </div>

    </section>

  );

}