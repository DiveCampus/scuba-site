"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getGallery } from "@/services/galleryService";

export function Gallery() {
  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [images, setImages] =
    useState<any[]>([]);

  const sliderRef =
    useRef<HTMLDivElement>(null);

  /* ===========================
      LOAD GALLERY FROM DB
  =========================== */

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    const { data, error } = await getGallery();

    if (error) {
      console.error(
        "Gallery Error:",
        error
      );
      return;
    }

    setImages(data || []);
  };

  /* ===========================
      SLIDER
  =========================== */

  const scrollToIndex = (
    index: number
  ) => {
    if (!sliderRef.current) return;

    const container =
      sliderRef.current;

    const child =
      container.children[
        index
      ] as HTMLElement;

    container.scrollTo({
      left:
        child.offsetLeft -
        container.offsetWidth /
          2 +
        child.offsetWidth /
          2,
      behavior: "smooth",
    });

    setCurrentIndex(index);
  };

  const next = () =>
    scrollToIndex(
      (currentIndex + 1) %
        images.length
    );

  const prev = () =>
    scrollToIndex(
      (currentIndex -
        1 +
        images.length) %
        images.length
    );

  /* ===========================
      AUTO CENTER
  =========================== */

  useEffect(() => {
    const container =
      sliderRef.current;

    if (!container) return;

    const handleScroll =
      () => {
        const center =
          container.scrollLeft +
          container.offsetWidth /
            2;

        let closest = 0;
        let minDist =
          Infinity;

        Array.from(
          container.children
        ).forEach(
          (child, i) => {
            const el =
              child as HTMLElement;

            const childCenter =
              el.offsetLeft +
              el.offsetWidth /
                2;

            const dist =
              Math.abs(
                center -
                  childCenter
              );

            if (
              dist <
              minDist
            ) {
              minDist =
                dist;

              closest = i;
            }
          }
        );

        setCurrentIndex(
          closest
        );
      };

    container.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      container.removeEventListener(
        "scroll",
        handleScroll
      );
  }, [images]);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden font-habara">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#18476D] via-[#123a5a] to-[#0b2c45]" />

      <div className="relative max-w-[1400px] mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[36px] md:text-[52px] font-semibold tracking-[1px] leading-[1.1] text-white">
            Underwater{" "}
            <span className="text-cyan-300">
              Gallery
            </span>
          </h2>
        </div>

        {/* SLIDER */}
        <div className="relative">

          {/* LEFT */}
          <motion.button
            onClick={prev}
            whileTap={{
              scale: 0.9,
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white"
          >
            ‹
          </motion.button>

          {/* RIGHT */}
          <motion.button
            onClick={next}
            whileTap={{
              scale: 0.9,
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white"
          >
            ›
          </motion.button>

          {/* IMAGES */}
          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto px-16 snap-x snap-mandatory scroll-smooth no-scrollbar"
          >
            {images.map(
              (
                image,
                index
              ) => {
                const isActive =
                  index ===
                  currentIndex;

                return (
                  <motion.div
                    key={
                      image.id
                    }
                    className="snap-center flex-shrink-0 min-w-[280px] md:min-w-[360px] cursor-pointer"
                    animate={{
                      scale:
                        isActive
                          ? 1
                          : 0.85,

                      opacity:
                        isActive
                          ? 1
                          : 0.5,

                      y:
                        isActive
                          ? 0
                          : 20,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    onClick={() =>
                      setSelectedIndex(
                        index
                      )
                    }
                  >
                    <div className="relative rounded-xl overflow-hidden">

                      <img
                        src={
                          image.image_url
                        }
                        alt={
                          image.title ||
                          "Gallery image"
                        }
                        className="w-full h-[420px] object-cover rounded-xl"
                      />

                      {isActive && (
                        <div className="absolute inset-0 rounded-xl border border-cyan-300/40" />
                      )}
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>

          {/* DOTS */}
          <div className="flex justify-center gap-3 mt-6">
            {images.map(
              (_, i) => (
                <div
                  key={i}
                  onClick={() =>
                    scrollToIndex(
                      i
                    )
                  }
                  className={`cursor-pointer transition-all ${
                    i ===
                    currentIndex
                      ? "w-8 h-2 bg-cyan-300 rounded-full"
                      : "w-2 h-2 bg-white/30 rounded-full"
                  }`}
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedIndex !==
          null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          >
            <img
              src={
                images[
                  selectedIndex
                ]
                  ?.image_url
              }
              className="max-w-[90%] max-h-[80%] rounded-xl"
            />

            <button
              onClick={() =>
                setSelectedIndex(
                  null
                )
              }
              className="absolute top-6 right-6 text-white text-3xl"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}