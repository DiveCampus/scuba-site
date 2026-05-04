"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { getFAQ } from "@/services/CommunityFAQService";

export function CommunityFAQSection() {
  const [active, setActive] = useState<number | null>(null);
  const [section, setSection] = useState<any>(null);
  const [faqs, setFaqs] = useState<any[]>([]);

  const load = async () => {
    console.log("🚀 Fetching FAQ...");

    const { section, items, error } = await getFAQ();

    console.log("📦 SECTION:", section);
    console.log("📦 FAQ ITEMS:", items);
    console.log("❌ ERROR:", error);

    setSection(section);
    setFaqs(items || []);
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = (index: number) => {
    setActive(active === index ? null : index);
  };

  if (!section) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        Loading FAQ...
      </div>
    );
  }

  return (
    <>
      <section
        className="py-32 bg-gradient-to-b from-[#f5f7fa] to-[#eef2f6]"
        style={{ fontFamily: "Harabara, sans-serif" }}
      >

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto px-6 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0a0e27] leading-tight">
            {section.title}
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {section.highlight}
            </span>
          </h2>

          <p className="text-gray-500 mt-4 text-sm md:text-base">
            {section.subtitle}
          </p>
        </div>

        {/* FAQ TITLE */}
        <h3 className="text-center text-xl font-semibold text-[#0a0e27] mb-10 tracking-wide">
          Frequently Asked Questions
        </h3>

        {/* FAQ LIST */}
        <div className="max-w-3xl mx-auto px-6 space-y-4">

          {faqs.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-white/30 bg-white/70 backdrop-blur-lg shadow-sm overflow-hidden hover:shadow-md transition"
            >

              {/* QUESTION */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="text-[#0a0e27] font-medium text-sm md:text-base">
                  {item.question}
                </span>

                <motion.div
                  animate={{ rotate: active === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-cyan-500"
                >
                  <Plus size={18} />
                </motion.div>
              </button>

              {/* ANSWER */}
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-6 pb-5 text-gray-600 text-sm leading-relaxed"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          ))}

        </div>
      </section>

      {/* FONT LOAD */}
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