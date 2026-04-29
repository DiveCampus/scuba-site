"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { OpenDiverBooking } from "./OpenDiverBooking";
import { Navbar } from "../Navbar";

export function PadIDivemasterHero() {
    const [open, setOpen] = useState(false);

    return (
        <>
        <Navbar />
            <section className="relative min-h-screen w-full overflow-hidden font-habara text-white">

                {/* BACKGROUND */}
                <div className="absolute inset-0">
                    <img
                        src="/1.avif"
                        alt="scuba"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#02182b]/60" />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">

                    {/* BADGE */}
                    <div className="relative overflow-hidden mb-6 px-5 py-2 text-xs tracking-widest border border-cyan-300/40 rounded-full text-cyan-200">
                        <span className="relative z-10">
                            LEVEL 4 - PADI DIVEMASTER COURSE
                        </span>

                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "200%" }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 3,
                                ease: "easeInOut",
                            }}
                            className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent blur-md opacity-80"
                        />
                    </div>

                    {/* SUB TEXT */}
                    <p className="text-xs tracking-[3px] text-white/60 mb-4">
                        PROFESSIONAL LEVEL | LEAD & ASSIST DIVERS
                    </p>

                    {/* HEADING */}
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
                        BECOME A{" "}
                        <span className="text-cyan-400">
                            PROFESSIONAL DIVEMASTER
                        </span>
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="mt-4 text-white/70 max-w-2xl">
                        Start your professional diving journey. Learn to guide divers,
                        assist instructors, and lead real underwater experiences.
                    </p>

                    {/* PRICE CARD */}
                    <div className="mt-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-8 py-6 shadow-xl">
                        <p className="text-sm text-white/50 line-through mb-1">
                            AED 4,999
                        </p>

                        <p className="text-4xl font-bold">
                            3,499 <span className="text-cyan-400 text-lg">AED</span>
                        </p>

                        <p className="text-xs text-white/60 mt-2">
                            Includes Training + Internship + Certification
                        </p>
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-8 flex gap-4 flex-wrap justify-center">

                        <button
                            onClick={() => setOpen(true)}
                            className="px-8 py-3 bg-cyan-400 text-black font-semibold rounded-lg hover:scale-105 transition"
                        >
                            ENROLL NOW →
                        </button>

                        <a
                            href="https://wa.me/971XXXXXXXXX?text=Hi%20I%20want%20to%20book%20Divemaster%20course"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 border border-white/30 rounded-lg text-white flex items-center gap-2 hover:bg-white/10 transition"
                        >
                            <FaWhatsapp className="text-green-400" />
                            BOOK VIA WHATSAPP
                        </a>

                    </div>

                    {/* FEATURES */}
                    <div className="mt-12 flex gap-10 text-white/60 text-xs flex-wrap justify-center">
                        <span>✔ Leadership Training</span>
                        <span>✔ Real Dive Experience</span>
                        <span>✔ Internship Included</span>
                        <span>✔ Career Opportunities</span>
                    </div>

                </div>
            </section>

            {/* FLOATING CTA */}
            {/* FLOATING CTA - PILL STYLE */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">

                <div className="flex items-center bg-[#1f2a33] p-1.5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.6)]">

                    {/* MAIN BUTTON */}
                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-semibold text-sm tracking-wide hover:scale-105 transition"
                    >
                        START DIVEMASTER →
                    </button>

                    {/* WHATSAPP BUTTON */}
                    <a
                        href="https://wa.me/971XXXXXXXXX"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-md hover:scale-110 transition"
                    >
                        <FaWhatsapp className="text-lg" />
                    </a>

                </div>

            </div>
            {/* MODAL */}
            <OpenDiverBooking
                isOpen={open}
                onClose={() => setOpen(false)}
            />

            {/* FONT */}
            <style jsx global>{`
        @font-face {
          font-family: 'Harabara';
          src: url('/fonts/Harabara.woff') format('woff');
        }
      `}</style>
        </>
    );
}