"use client";

import { motion } from "framer-motion";

export function AdventureGallery() {
  const images = [
  "/A59I9631.webp",
  "/dubai.webp",
  "/Khorfakkan.webp",
  "/img1.webp",
  "/img2.webp",
  "/img3.webp",
  "/img4.webp",
  "/img5.webp",
  "/Brice.webp",
  "/Islam.webp",
  // "/Justin.webp",
  // "/Khushi.webp",
  // "/Sneha.webp",
  // "/Surie.webp",
  // "/Aye.webp",
  // "/Abdullah.webp",

  ];

  // Descriptive alt text for crawlable image SEO — no UI change.
  const alts = [
    "PADI divemaster guiding a scuba diving expedition with UAE Dive",
    "Scuba diving in Dubai with UAE Dive divers",
    "Reef scuba diving at Khor Fakkan on the UAE East Coast",
    "Scuba divers exploring the Arabian Gulf with UAE Dive",
    "Underwater scuba diving experience in the UAE",
    "Discover Scuba Diving try dive session in Dubai",
    "PADI course divers training underwater in Dubai",
    "Marine life encounter during a UAE Dive scuba trip",
    "UAE Dive scuba instructor leading a guided dive",
    "UAE Dive community member on a Fujairah dive trip",
  ];

  return (
    <>
      <section
        className="py-16 md:py-24 bg-[#f5f8fb]"
        style={{ fontFamily: "Harabara, sans-serif" }}
      >

        {/* HEADER */}
        <div className="text-center px-6">

          <h2 className="text-[36px] md:text-[52px] leading-[1.1] tracking-[1px] font-semibold text-[#0b1c2e]">

            BUILT ON PASSION. <br />

            <span className="text-cyan-500">
              BOUND BY ADVENTURE.
            </span>

          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-[15px] md:text-[16px] font-normal leading-[1.7] text-[#7f8b99]">

            Join a global family of explorers. From weekend dives in Fujairah
            to international expeditions in the Maldives — we don’t just dive
            together, we travel, laugh, and discover the world together.

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
                src={images[0]}
                alt={alts[0]}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 overflow-hidden rounded-[4px]"
            >
              <img
                src={images[1]}
                alt={alts[1]}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 overflow-hidden rounded-[4px]"
            >
              <img
                src={images[2]}
                alt={alts[2]}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 overflow-hidden rounded-[4px]"
            >
              <img
                src={images[3]}
                alt={alts[3]}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 overflow-hidden rounded-[4px]"
            >
              <img
                src={images[4]}
                alt={alts[4]}
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
                src={images[5]}
                alt={alts[5]}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden rounded-[4px]"
            >
              <img
                src={images[6]}
                alt={alts[6]}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 overflow-hidden rounded-[4px]"
            >
              <img
                src={images[7]}
                alt={alts[7]}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden rounded-[4px]"
            >
              <img
                src={images[8]}
                alt={alts[8]}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden rounded-[4px]"
            >
              <img
                src={images[9]}
                alt={alts[9]}
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