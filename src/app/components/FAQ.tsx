"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useEffect, useState } from "react";
import { getFaqs } from "@/services/faqSerrvice";

export function FAQ() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH FAQS FROM DB
  // =========================
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    console.log("📡 Fetching FAQs from DB...");

    const { data, error } = await getFaqs();

    if (error) {
      console.error("❌ ERROR:", error);
      return;
    }

    console.log("📦 DATA:", data);

    setFaqs(data || []);
    setLoading(false);
  };

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <div className="text-white text-center py-20">
        Loading FAQs...
      </div>
    );
  }

  // =========================
  // EMPTY STATE
  // =========================
  if (faqs.length === 0) {
    return (
      <div className="text-white text-center py-20">
        No FAQs found
      </div>
    );
  }

  return (
    <section className="relative py-32 overflow-hidden">

      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#18476D] via-[#123a5a] to-[#0b2c45]" />

      {/* GLOW */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 80% 20%, rgba(0,212,255,0.05) 0%, transparent 50%)`,
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">

        {/* HEADER */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-[#00d4ff]/20 mb-6">
            <span className="text-[#00d4ff] text-sm uppercase tracking-wider">
              Questions & Answers
            </span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#06b6d4] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="text-white/60 max-w-2xl mx-auto">
            Everything you need to know about diving with us.
          </p>
        </motion.div>

        {/* FAQ LIST */}
        <Accordion type="single" collapsible className="space-y-4">

          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >

              <AccordionItem
                value={faq.id}
                className="border border-white/10 rounded-xl bg-white/5 px-6 hover:border-cyan-400/50 transition"
              >

                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-cyan-400 py-6">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-white/70 pb-6">
                  {faq.answer}
                </AccordionContent>

              </AccordionItem>

            </motion.div>
          ))}

        </Accordion>
      </div>
    </section>
  );
}