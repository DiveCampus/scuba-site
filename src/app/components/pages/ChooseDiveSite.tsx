"use client";

import { motion } from "framer-motion";

export function ChooseDiveSite() {
  const diveSites = [
    {
      badge: "MOST POPULAR CHOICE",
      title: "Fujairah Boat Dive",
      highlight: true,
      items: [
        {
          label: "DIVE SETTING",
          value: "Open Sea Boat Dive",
        },
        {
          label: "THE ECOSYSTEM",
          value: "100% Natural Coral",
        },
        {
          label: "WHAT YOU'LL SEE",
          value: "Turtles, Sharks, Seahorses & More",
        },
        {
          label: "WATER CLARITY",
          value: "High Visibility",
        },
        {
          label: "TRANSPORT OPTION",
          value: "Self-Arrival / Pick up From Dubai",
        },
      ],
      footer: "RECOMMENDED FOR BEGINNERS",
    },

    {
      badge: "CITY CONVENIENCE",
      title: "Dubai (Palm Jumeirah)",
      highlight: false,
      items: [
        {
          label: "DIVE SETTING",
          value: "Walk-in Shore Dive",
        },
        {
          label: "THE ECOSYSTEM",
          value: "Artificial Reefs",
        },
        {
          label: "WHAT YOU'LL SEE",
          value: "Local Reef Species",
        },
        {
          label: "WATER CLARITY",
          value: "Standard Visibility",
        },
        {
          label: "TRANSPORT OPTION",
          value: "Self-Arrival",
        },
      ],
    },
  ];

  return (
    <>
      <section
        className="relative overflow-hidden py-28 bg-[#071c2d]"
        style={{ fontFamily: "Harabara, sans-serif" }}
      >

        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0">

          <div className="absolute top-0 left-0 w-[40%] h-[500px] bg-cyan-500/10 blur-[120px]" />

          <div className="absolute bottom-0 right-0 w-[30%] h-[400px] bg-blue-500/10 blur-[100px]" />

        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">

          {/* HEADER */}
          <div className="text-center">

            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-1px] text-white">
              CHOOSE YOUR DIVE SITE
            </h2>

            <p className="mt-5 text-white/45 text-sm leading-[1.8] max-w-2xl mx-auto">
              Select your perfect environment. Experience the convenience
              of Palm Jumeirah or the crystal clear waters of Fujairah.
            </p>

          </div>

          {/* CARDS */}
          <div className="mt-20 grid lg:grid-cols-2 gap-8">

            {diveSites.map((site, i) => (
              <motion.div
                key={i}
                whileHover={{
                  y: -6,
                  scale: 1.01,
                }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-3xl border overflow-hidden
                ${
                  site.highlight
                    ? "border-cyan-400/60 bg-cyan-500/[0.05] shadow-[0_0_40px_rgba(0,200,255,0.12)]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >

                {/* TOP GLOW */}
                {site.highlight && (
                  <div className="absolute top-0 left-0 h-[3px] w-full bg-cyan-400" />
                )}

                <div className="p-8">

                  {/* BADGE */}
                  <p className="text-[10px] tracking-[3px] text-cyan-400 uppercase">
                    {site.badge}
                  </p>

                  {/* TITLE */}
                  <h3 className="mt-4 text-[34px] leading-[1.1] tracking-[-0.8px] font-semibold text-white">
                    {site.title}
                  </h3>

                  {/* DIVIDER */}
                  <div className="mt-7 border-t border-white/10" />

                  {/* ITEMS */}
                  <div className="mt-4">

                    {site.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-6 border-b border-white/8 gap-6"
                      >

                        <p className="text-[10px] tracking-[2px] text-white/30 shrink-0">
                          {item.label}
                        </p>

                        <p
                          className={`text-sm md:text-[15px] text-right leading-[1.5]
                          ${
                            site.highlight
                              ? "text-cyan-300"
                              : "text-white/85"
                          }`}
                        >
                          {item.value}
                        </p>

                      </div>
                    ))}

                  </div>

                  {/* FOOTER */}
                  {site.footer && (
                    <div className="mt-8 flex justify-center">

                      <div className="px-5 py-3 rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-[10px] tracking-[2px] font-semibold">

                        {site.footer}

                      </div>

                    </div>
                  )}

                </div>

              </motion.div>
            ))}

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