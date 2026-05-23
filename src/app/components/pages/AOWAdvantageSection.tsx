"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { Check } from "lucide-react";

import {
  getAOWAdvantage,
} from "@/services/AOWAdvantageService";

export function AOWAdvantageSection() {

  const [section, setSection] =
    useState<any>(null);

  const [points, setPoints] =
    useState<any[]>([]);

  useEffect(() => {

    const load = async () => {

      const res = await getAOWAdvantage();

      setSection(res.section);

      setPoints(res.points);

    };

    load();

  }, []);

  if (!section) return null;

  return (

    <section className="py-32 bg-[#03121c] text-white">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 px-6 items-center">

        {/* IMAGE */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          className="rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
        >

          <img
            src={section.image_url}
            className="w-full h-full object-cover"
          />

        </motion.div>

        {/* CONTENT */}
        <div>

          <p className="text-[10px] tracking-[4px] text-cyan-400 mb-5">
            {section.top_label}
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-8">

            {section.title}{" "}

            <span className="text-cyan-400">
              {section.highlighted_title}
            </span>{" "}

            Advantage

          </h2>

          <p className="text-white/60 leading-[1.9] mb-14">
            {section.description}
          </p>

          <div className="space-y-8">

            {points.map((item, i) => (

              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  x: 30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: i * 0.08,
                }}
                className="flex gap-5 border-b border-white/10 pb-7"
              >

                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400 mt-1">

                  <Check size={14} />

                </div>

                <div>

                  <h3 className="font-semibold text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-white/60 leading-[1.9]">
                    {item.description}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}