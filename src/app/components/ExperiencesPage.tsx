import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ExperiencesPage() {
  const [active, setActive] = useState<null | "dubai" | "khor">(null);

  return (
    <section className="relative min-h-screen w-full overflow-hidden font-habara">

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#18476D] via-[#123a5a] to-[#0b2c45]" />


      <div className="relative z-10 px-6 py-20 max-w-6xl mx-auto">

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* DUBAI */}
          <motion.div
            layout
            onClick={() => setActive(active === "dubai" ? null : "dubai")}
            className="cursor-pointer rounded-2xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-lg"
          >
            <motion.img
              layout
              src="/dubai.webp"
              alt="Scuba diving Dubai - Palm Jumeirah dive site"
              loading="lazy"
              decoding="async"
              className="w-full h-[300px] object-cover"
            />

            <div className="p-5">
              <h3 className="text-white text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] uppercase">
                Dubai
              </h3>
            </div>

            {/* EXPAND CONTENT */}
            <AnimatePresence>
              {active === "dubai" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-5 pb-6"
                >
                  <div className="mt-4 border-t border-white/10 pt-4">

                    <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed mb-3">
                      Located in the heart of Dubai, DiveCampus launched in 2023 as the UAE’s first concept store dedicated to ‘everything diving’ and is home to the region’s largest indoor Dive Tank.
                    </p>

                    <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed mb-3">
                      Built using upcycled shipping containers and filled with 220,000 litres of fresh water, the 4-metre-deep tank is a signature space for dive training, try dives, and events.
                    </p>

                    <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed mb-4">
                      At DiveCampus, you can explore scuba for the first time, get certified, advance your diving skills, shop premium dive gear, host private events, or grab a specialty coffee at the in-house café.
                    </p>

                    {/* MAP */}
                    <iframe
                      src="https://www.google.com/maps?q=Dubai&output=embed"
                      className="w-full h-[180px] rounded-xl border border-white/10"
                    />

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* KHOR */}
          <motion.div
            layout
            onClick={() => setActive(active === "khor" ? null : "khor")}
            className="cursor-pointer rounded-2xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-lg"
          >
            <motion.img
              layout
              src="/Khorfakkan.webp"
              alt="Khor Fakkan scuba diving UAE - East Coast dive site"
              loading="lazy"
              decoding="async"
              className="w-full h-[300px] object-cover"
            />

            <div className="p-5">
              <h3 className="text-white text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] uppercase">
                Khor Fakkan
              </h3>
            </div>

            {/* EXPAND CONTENT */}
            <AnimatePresence>
              {active === "khor" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-5 pb-6"
                >
                  <div className="mt-4 border-t border-white/10 pt-4">

                    <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed mb-4">
                      Explore real ocean diving, coral reefs, and marine life in Khor Fakkan. Perfect for adventure seekers and certified divers.
                    </p>

                    <iframe
                      src="https://www.google.com/maps?q=Khor Fakkan&output=embed"
                      className="w-full h-[180px] rounded-xl border border-white/10"
                    />

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
}