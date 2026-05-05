"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Star, Award } from "lucide-react";
import { getGoldStandard } from "@/services/goldStandardService";

/* ICON MAP */
const iconMap: any = {
  Star: <Star size={14} />,
  Award: <Award size={14} />,
  Shield: <Shield size={14} />,
};

export function GoldStandardSectionDive() {
  const [section, setSection] = useState<any>(null);
  const [tags, setTags] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      console.log("🚀 Loading Gold Standard UI...");

      const { section, tags, images } = await getGoldStandard();

      console.log("📦 SECTION:", section);
      console.log("📦 TAGS:", tags);
      console.log("📦 IMAGES:", images);

      setSection(section);
      setTags(tags || []);
      setImages(images || []);
    };

    load();
  }, []);

  if (!section) return null;

  /* GET IMAGE BY POSITION */
  const getImage = (pos: string) =>
    images.find((img) => img.position === pos);

  return (
    <section className="py-32 bg-gradient-to-b from-[#f5f7fa] to-[#eef2f6] overflow-hidden">

      {/* GLOW */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-400/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-400/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 px-6 items-center relative z-10">

        {/* LEFT */}
        <div>

          {/* BADGE */}
          <div className="inline-block px-4 py-2 text-[11px] tracking-[3px] rounded-full border border-cyan-400/30 text-cyan-500 mb-6">
            {section.badge}
          </div>

          {/* TITLE */}
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a0e27] mb-6 leading-tight">
            {section.title}{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {section.highlight}
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-500 max-w-xl mb-10 text-sm md:text-base leading-relaxed">
            {section.description}
          </p>

          {/* CARD */}
          <motion.div
            whileHover={{ y: -6 }}
            className="relative p-6 rounded-2xl border border-yellow-300/40 bg-gradient-to-br from-[#fffdf7] to-[#fff7d6] shadow-md"
          >

            {/* ICON */}
            <div className="absolute -top-5 left-6 bg-white p-2.5 rounded-full border border-yellow-300 shadow-lg">
              <Shield className="text-yellow-500 w-5 h-5" />
            </div>

            {/* CARD TITLE */}
            <h3 className="text-lg font-semibold text-[#0a0e27] mb-3 mt-3">
              {section.card_title}
            </h3>

            {/* CARD DESC */}
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {section.card_description}
            </p>

            {/* TAGS */}
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-4 py-2 text-xs rounded-lg flex items-center gap-2 border border-yellow-400/50 bg-yellow-50 text-yellow-600"
                >
                  {iconMap[tag.icon]}
                  {tag.text}
                </span>
              ))}
            </div>

          </motion.div>

        </div>

        {/* RIGHT IMAGES */}
        <div className="grid grid-cols-2 gap-6">

          {/* BIG */}
          <motion.div className="row-span-2 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={getImage("big")?.image_url}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* SMALL 1 */}
          <motion.div className="rounded-2xl overflow-hidden">
            <img
              src={getImage("small1")?.image_url}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* SMALL 2 */}
          <motion.div className="rounded-2xl overflow-hidden">
            <img
              src={getImage("small2")?.image_url}
              className="w-full h-full object-cover"
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
}