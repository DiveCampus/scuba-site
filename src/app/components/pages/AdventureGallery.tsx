"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAdventureGallery } from "@/services/AdventureGalleryService";

// Fallback content — keeps the section pixel-identical when the DB is empty.
const DEFAULT_SECTION = {
  title: "BUILT ON PASSION.",
  highlight_title: "BOUND BY ADVENTURE.",
  description:
    "Join a global family of explorers. From weekend dives in Fujairah to international expeditions in the Maldives — we don’t just dive together, we travel, laugh, and discover the world together.",
};

const DEFAULT_IMAGES = [
  { image_url: "/A59I9631.webp", image_alt: "PADI divemaster guiding a scuba diving expedition with UAE Dive" },
  { image_url: "/dubai.webp", image_alt: "Scuba diving in Dubai with UAE Dive divers" },
  { image_url: "/Khorfakkan.webp", image_alt: "Reef scuba diving at Khor Fakkan on the UAE East Coast" },
  { image_url: "/img1.webp", image_alt: "Scuba divers exploring the Arabian Gulf with UAE Dive" },
  { image_url: "/img2.webp", image_alt: "Underwater scuba diving experience in the UAE" },
  { image_url: "/img3.webp", image_alt: "Discover Scuba Diving try dive session in Dubai" },
  { image_url: "/img4.webp", image_alt: "PADI course divers training underwater in Dubai" },
  { image_url: "/img5.webp", image_alt: "Marine life encounter during a UAE Dive scuba trip" },
  { image_url: "/Brice.webp", image_alt: "UAE Dive scuba instructor leading a guided dive" },
  { image_url: "/Islam.webp", image_alt: "UAE Dive community member on a Fujairah dive trip" },
];

export function AdventureGallery() {
  const [section, setSection] = useState<any>(DEFAULT_SECTION);
  const [images, setImages] = useState<any[]>(DEFAULT_IMAGES);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { section, images } = await getAdventureGallery();

    if (section) setSection(section);

    if (images && images.length) setImages(images);
  };

  // Per-slot guard so the fixed 2x5 grid never renders a broken image.
  const img = (i: number) => images[i] ?? DEFAULT_IMAGES[i];

  return (
    <>
      <section
        className="py-16 md:py-24 bg-[#f5f8fb]"
        style={{ fontFamily: "Harabara, sans-serif" }}
      >

        {/* HEADER */}
        <div className="text-center px-6">

          <h2 className="text-[36px] md:text-[52px] leading-[1.1] tracking-[1px] font-semibold text-[#0b1c2e]">

            {section.title} <br />

            <span className="text-cyan-500">
              {section.highlight_title}
            </span>

          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-[15px] md:text-[16px] font-normal leading-[1.7] text-[#7f8b99]">

            {section.description}

          </p>

        </div>

        {/* GALLERY */}
        <div className="max-w-[1150px] mx-auto mt-8 md:mt-12 px-6">

          {/* ROW 1 */}
          <div className="grid grid-cols-5 gap-3 mb-3">

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 overflow-hidden rounded-[4px]"
            >
              <img
                src={img(0).image_url}
                alt={img(0).image_alt}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 overflow-hidden rounded-[4px]"
            >
              <img
                src={img(1).image_url}
                alt={img(1).image_alt}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 overflow-hidden rounded-[4px]"
            >
              <img
                src={img(2).image_url}
                alt={img(2).image_alt}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 overflow-hidden rounded-[4px]"
            >
              <img
                src={img(3).image_url}
                alt={img(3).image_alt}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 overflow-hidden rounded-[4px]"
            >
              <img
                src={img(4).image_url}
                alt={img(4).image_alt}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-5 gap-3 mb-3">

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden rounded-[4px]"
            >
              <img
                src={img(5).image_url}
                alt={img(5).image_alt}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden rounded-[4px]"
            >
              <img
                src={img(6).image_url}
                alt={img(6).image_alt}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 overflow-hidden rounded-[4px]"
            >
              <img
                src={img(7).image_url}
                alt={img(7).image_alt}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden rounded-[4px]"
            >
              <img
                src={img(8).image_url}
                alt={img(8).image_alt}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden rounded-[4px]"
            >
              <img
                src={img(9).image_url}
                alt={img(9).image_alt}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

          </div>


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
