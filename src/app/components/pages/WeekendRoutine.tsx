"use client";

import { motion } from "framer-motion";

export function WeekendRoutine() {
    const images = [
        "/1.avif",
        "/2.avif",
        "/3.avif",
        "/4.avif",
        "/5.avif",
        "/6.avif",
        "/7.avif",
        "/8.avif",
    ];

    return (
        <>
            <section
                className="relative overflow-hidden py-24 bg-[#071c2d]"
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

                        <h2 className="text-3xl md:text-5xl font-semibold tracking-[-1px] text-white leading-[1.1]">
                            YOUR NEW FAVORITE{" "}
                            <span className="text-cyan-400">
                                WEEKEND ROUTINE
                            </span>
                        </h2>

                        <p className="mt-5 text-white/45 text-sm max-w-2xl mx-auto leading-[1.7]">
                            Trade the mall for the ocean. Grab a friend, hop on the boat,
                            and let's make some memories. Sun, sea, and a whole lot of laughs.
                        </p>

                    </div>

                    {/* IMAGE STRIP */}
                    {/* IMAGE STRIP */}
                    <div className="relative mt-16 overflow-hidden">

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
                                            src={img}
                                            alt="Dive Experience"
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
                        className="mt-20 max-w-[470px] mx-auto px-6"
                    >

                        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

                            {/* ICON */}
                            <div className="text-3xl mb-5">
                                🎁
                            </div>

                            {/* TITLE */}
                            <h3 className="text-white text-[22px] font-semibold tracking-[-0.5px] leading-[1.3]">
                                THE PERFECT GIFT FOR BIRTHDAYS & ANNIVERSARIES
                            </h3>

                            {/* DESC */}
                            <p className="mt-4 text-white/50 text-sm leading-[1.7] max-w-md mx-auto">
                                Want to surprise someone? A scuba diving experience is a gift
                                they will never forget. We will plan an underwater surprise.
                            </p>

                            {/* NOTICE */}
                            <div className="mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-lime-400/30 bg-lime-400/10 text-lime-300 text-[11px] tracking-[1px] font-semibold">

                                ⚠ MUST BOOK 7 DAYS IN ADVANCE FOR SPECIAL OCCASIONS

                            </div>

                        </div>

                    </motion.div>

                    {/* CTA */}
                    <div className="flex justify-center mt-14">

                        <button className="group relative overflow-hidden rounded-xl">

                            {/* GLOW */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 blur-2xl opacity-60 group-hover:opacity-100 transition duration-300" />

                            {/* BUTTON */}
                            <div className="relative z-10 px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-[#02131d] font-semibold tracking-[1px] text-sm shadow-[0_10px_40px_rgba(0,200,255,0.35)]">

                                BOOK YOUR EXPERIENCE

                            </div>

                        </button>

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