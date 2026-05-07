"use client";

import { motion } from "framer-motion";

export function AdventureGallery() {
  const images = [
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
    "/gallery/6.jpg",
    "/gallery/7.jpg",
    "/gallery/8.jpg",
    "/gallery/9.jpg",
    "/gallery/10.jpg",
    "/gallery/11.jpg",
  ];

  return (
    <>
      <section
        className="py-24 bg-[#f5f8fb]"
        style={{ fontFamily: "Harabara, sans-serif" }}
      >

        {/* HEADER */}
        <div className="text-center px-6">

          <h2 className="text-[34px] md:text-[52px] leading-[1.05] tracking-[-1.5px] font-semibold text-[#0b1c2e]">

            BUILT ON PASSION. <br />

            <span className="text-cyan-500">
              BOUND BY ADVENTURE.
            </span>

          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-[14px] leading-[1.8] text-[#7f8b99]">

            Join a global family of explorers. From weekend dives in Fujairah
            to international expeditions in the Maldives — we don’t just dive
            together, we travel, laugh, and discover the world together.

          </p>

        </div>

        {/* GALLERY */}
        <div className="max-w-[1150px] mx-auto mt-14 px-6">

          {/* ROW 1 */}
          <div className="grid grid-cols-5 gap-3 mb-3">

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 overflow-hidden rounded-[4px]"
            >
              <img
                src={images[0]}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 overflow-hidden rounded-[4px]"
            >
              <img
                src={images[1]}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 overflow-hidden rounded-[4px]"
            >
              <img
                src={images[2]}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 overflow-hidden rounded-[4px]"
            >
              <img
                src={images[3]}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 overflow-hidden rounded-[4px]"
            >
              <img
                src={images[4]}
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
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden rounded-[4px]"
            >
              <img
                src={images[6]}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 overflow-hidden rounded-[4px]"
            >
              <img
                src={images[7]}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden rounded-[4px]"
            >
              <img
                src={images[8]}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden rounded-[4px]"
            >
              <img
                src={images[9]}
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

          </div>

          {/* ROW 3 */}
          <div className="grid grid-cols-5 gap-3">

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-3 overflow-hidden rounded-[4px]"
            >
              <img
                src="/gallery/12.jpg"
                className="w-full h-[200px] object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-2 overflow-hidden rounded-[4px]"
            >
              <img
                src="/gallery/13.jpg"
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