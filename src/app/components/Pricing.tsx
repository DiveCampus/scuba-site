"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { getPricing } from "@/services/pricingService";

export function Pricing() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    const { data, error } = await getPricing();

    console.log("📦 PRICING DATA:", data);

    if (error) {
      console.error("❌ ERROR:", error);
      setLoading(false);
      return;
    }

    setPackages(data || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="text-white text-center py-20">
        Loading pricing...
      </div>
    );
  }

  return (
    <section className="relative py-16 md:py-24 overflow-hidden font-habara">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#18476D] via-[#123a5a] to-[#0b2c45]" />

      <div className="relative max-w-[1400px] mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[36px] md:text-[52px] font-semibold tracking-[1px] leading-[1.1] text-white mb-5">
            Choose Your <span className="text-cyan-300">Adventure</span>
          </h2>
        </div>

        {/* EMPTY STATE */}
        {packages.length === 0 && (
          <p className="text-center text-white/60">
            No pricing plans found
          </p>
        )}

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              whileHover={{ y: -12 }}
              className={`relative ${pkg.popular ? "lg:scale-105" : ""}`}
            >

              {/* POPULAR */}
              {pkg.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-5 py-2 rounded-full bg-cyan-300 text-black text-xs flex gap-2">
                    <Sparkles size={14} />
                    Most Popular
                  </div>
                </div>
              )}

              {/* CARD */}
              <div className="rounded-2xl p-8 h-full flex flex-col bg-white/10 border border-white/20">

                {/* NAME */}
                <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] text-white mb-2">
                  {pkg.name}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-white/50 text-[14px] md:text-[15px] leading-relaxed mb-6">
                  {pkg.description}
                </p>

                {/* PRICE */}
                <div className="border-y border-white/10 py-6 mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-cyan-300">$</span>
                    <span className="text-5xl text-white font-bold">
                      {pkg.price}
                    </span>
                  </div>
                  <p className="text-white/50 text-xs mt-1">
                    {pkg.period || "per person"}
                  </p>
                </div>

                {/* FEATURES */}
                <ul className="space-y-3 flex-1">
                  {pkg.features?.map((f: string, i: number) => (
                    <li key={i} className="flex gap-3">
                      <Check className="text-cyan-300 w-5 h-5" />
                      <span className="text-white/80 text-sm">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* BUTTON */}
                <button
                  className={`w-full mt-8 py-3 rounded-full font-semibold text-sm ${
                    pkg.popular
                      ? "bg-cyan-300 text-black"
                      : "border border-cyan-300 text-white"
                  }`}
                >
                  Get Started
                </button>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}