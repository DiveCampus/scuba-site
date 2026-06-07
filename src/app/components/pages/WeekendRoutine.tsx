"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getWeekendRoutine } from "@/services/WeekendRoutineService";

// Fallback content — keeps the section pixel-identical when the DB is empty.
const DEFAULT_SECTION = {
  title: "YOUR NEW FAVORITE",
  highlighted_title: "WEEKEND ROUTINE",
  description:
    "Trade the mall for the ocean. Grab a friend, hop on the boat, and let's make some memories. Sun, sea, and a whole lot of laughs.",
  cta_button: "BOOK YOUR EXPERIENCE",
  cta_link: "",
};

const DEFAULT_IMAGES = [
  "/A59I0374.webp",
  "/A59I0450.webp",
  "/A59I0656.webp",
  "/A59I9512.webp",
  "/A59I9544.webp",
  "/A59I9590.webp",
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
  "/Justin.webp",
  "/Khushi.webp",
  "/Sneha.webp",
  "/Surie.webp",
  "/Aye.webp",
  "/Abdullah.webp",
  "/img2.webp",
].map((image_url) => ({ image_url, image_alt: "Dive Experience" }));

const DEFAULT_GIFT = {
  emoji: "🎁",
  title: "THE PERFECT GIFT FOR BIRTHDAYS & ANNIVERSARIES",
  description:
    "Want to surprise someone? A scuba diving experience is a gift they will never forget. We will plan an underwater surprise.",
  notice: "⚠ MUST BOOK 7 DAYS IN ADVANCE FOR SPECIAL OCCASIONS",
  button_text: "",
  button_link: "",
};

export function WeekendRoutine() {
    const [section, setSection] = useState<any>(DEFAULT_SECTION);
    const [images, setImages] = useState<any[]>(DEFAULT_IMAGES);
    const [giftCard, setGiftCard] = useState<any>(DEFAULT_GIFT);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const { section, images, giftCard } = await getWeekendRoutine();

        if (section) setSection(section);

        // Only render active images with a real URL. `is_active !== false`
        // keeps things working even if the column is absent (undefined).
        const visible = (images || []).filter(
            (img: any) => img.is_active !== false && img.image_url
        );

        if (visible.length) setImages(visible);

        if (giftCard) setGiftCard(giftCard);
    };

    return (
        <>
            <section
                className="relative overflow-hidden py-16 md:py-24 bg-[#071c2d]"
                style={{ fontFamily: "Harabara, sans-serif" }}
            >

                {/* BACKGROUND GLOW */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-[40%] h-[500px] bg-cyan-500/10 blur-[140px]" />
                    <div className="absolute bottom-0 right-0 w-[30%] h-[400px] bg-blue-500/10 blur-[120px]" />
                </div>

                <div className="relative z-10">

                    {/* HEADER */}
                    <div className="text-center px-6">

                        <h2 className="text-[36px] md:text-[52px] font-semibold tracking-[1px] text-white leading-[1.1]">
                            {section.title}{" "}
                            <span className="text-cyan-400">
                                {section.highlighted_title}
                            </span>
                        </h2>

                        <p className="mt-5 text-white/45 text-[15px] md:text-[16px] font-normal max-w-2xl mx-auto leading-[1.7]">
                            {section.description}
                        </p>

                    </div>

                    {/* IMAGE STRIP */}
                    {/* IMAGE STRIP */}
                    <div className="relative mt-8 md:mt-12 overflow-hidden">

                        {/* LEFT FADE */}
                        <div className="absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-[#071c2d] to-transparent" />

                        {/* RIGHT FADE */}
                        <div className="absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-[#071c2d] to-transparent" />

                        <motion.div
                            initial={{ x: 0 }}
                            animate={{ x: "-50%" }}
                            transition={{
                                duration: 35,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="flex gap-5 w-max"
                        >

                            {/* DUPLICATE FOR INFINITE LOOP */}
                            {[...images, ...images].map((img, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{
                                        y: -8,
                                        scale: 1.02,
                                    }}
                                    className="relative shrink-0"
                                >

                                    <div className="w-[215px] h-[270px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.35)]">

                                        <img
                                            src={img.image_url}
                                            alt={img.image_alt || "Dive Experience"}
                                            className="w-full h-full object-cover hover:scale-110 transition duration-700"
                                        />

                                        {/* OVERLAY */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                    </div>

                                </motion.div>
                            ))}

                        </motion.div>

                    </div>

                    {/* GIFT CARD */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mt-12 md:mt-16 max-w-[470px] mx-auto px-6"
                    >

                        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

                            {/* ICON */}
                            <div className="text-3xl mb-5">
                                {giftCard.emoji}
                            </div>

                            {/* TITLE */}
                            <h3 className="text-white text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2]">
                                {giftCard.title}
                            </h3>

                            {/* DESC */}
                            <p className="mt-4 text-white/50 text-[14px] md:text-[15px] leading-relaxed max-w-md mx-auto">
                                {giftCard.description}
                            </p>

                            {/* NOTICE */}
                            <div className="mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-lime-400/30 bg-lime-400/10 text-lime-300 text-[11px] tracking-[1px] font-semibold">

                                {giftCard.notice}

                            </div>

                            {/* OPTIONAL GIFT BUTTON — only renders when configured,
                                so the existing card stays visually identical when empty. */}
                            {giftCard.button_text ? (
                                <div className="mt-7">
                                    <a
                                        href={giftCard.button_link || "#"}
                                        className="inline-block px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-[#02131d] font-semibold tracking-[1px] text-sm shadow-[0_10px_40px_rgba(0,200,255,0.35)] hover:opacity-90 transition"
                                    >
                                        {giftCard.button_text}
                                    </a>
                                </div>
                            ) : null}

                        </div>

                    </motion.div>

                    {/* CTA */}
                    <div className="flex justify-center mt-10 md:mt-12">

                        {section.cta_link ? (
                            <a
                                href={section.cta_link}
                                className="group relative overflow-hidden rounded-xl"
                            >

                                {/* GLOW */}
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 blur-2xl opacity-60 group-hover:opacity-100 transition duration-300" />

                                {/* BUTTON */}
                                <div className="relative z-10 px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-[#02131d] font-semibold tracking-[1px] text-sm shadow-[0_10px_40px_rgba(0,200,255,0.35)]">

                                    {section.cta_button}

                                </div>

                            </a>
                        ) : (
                            <button className="group relative overflow-hidden rounded-xl">

                                {/* GLOW */}
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 blur-2xl opacity-60 group-hover:opacity-100 transition duration-300" />

                                {/* BUTTON */}
                                <div className="relative z-10 px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-[#02131d] font-semibold tracking-[1px] text-sm shadow-[0_10px_40px_rgba(0,200,255,0.35)]">

                                    {section.cta_button}

                                </div>

                            </button>
                        )}

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

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </>
    );
}
