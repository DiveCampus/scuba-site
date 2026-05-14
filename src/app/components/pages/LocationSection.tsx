"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

import { motion } from "framer-motion";

import { getLocations } from "@/services/locationService";

export function LocationSection() {
  const [
    locations,
    setLocations,
  ] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } =
      await getLocations();

    setLocations(data || []);
  };

  if (!locations.length)
    return null;

  return (
    <section className="relative py-32 bg-gradient-to-b from-[#f8fafc] to-[#eef2f6] overflow-hidden">

      {/* BG GLOW */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold text-[#0a0e27]">

            Visit Our{" "}

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              Locations

            </span>

          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">

            Explore our premium dive training centers across the UAE.

          </p>

        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-10">

          {locations.map(
            (loc, i) => (
              <motion.div
                key={loc.id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    i * 0.1,
                }}
                whileHover={{
                  y: -6,
                }}
                className="
                  bg-white/80
                  backdrop-blur-xl
                  rounded-3xl
                  border
                  border-white/40
                  shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                  overflow-hidden
                "
              >

                {/* TOP */}
                <div className="p-8">

                  <div className="flex items-center justify-between mb-6">

                    <div>

                      <h3 className="text-xl font-bold text-[#0a0e27]">

                        {loc.title}

                      </h3>

                      <p className="text-sm text-gray-500 mt-1">

                        {loc.rating}
                        {" "}
                        ⭐⭐⭐⭐⭐
                        {" "}
                        {loc.reviews}

                      </p>

                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center">

                      <MapPin className="text-cyan-500 w-6 h-6" />

                    </div>

                  </div>

                  {/* INFO */}
                  <div className="space-y-5 text-sm text-gray-600">

                    <div className="flex items-start gap-3">

                      <MapPin className="text-cyan-500 w-5 h-5 mt-1" />

                      <span>
                        {loc.address}
                      </span>

                    </div>

                    <div className="flex items-center gap-3">

                      <Mail className="text-cyan-500 w-5 h-5" />

                      <span>
                        {loc.email}
                      </span>

                    </div>

                    <div className="flex items-center gap-3">

                      <Phone className="text-cyan-500 w-5 h-5" />

                      <span>
                        {loc.phone}
                      </span>

                    </div>

                  </div>

                </div>

                {/* MAP */}
                <div className="border-t border-gray-100">

                  <iframe
                    src={
                      loc.map_url
                    }
                    className="w-full h-[260px]"
                    loading="lazy"
                  />

                </div>

                {/* FOOTER */}
                <div className="p-5 border-t border-gray-100">

                  <a
                    href={
                      loc.map_url
                    }
                    target="_blank"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      text-cyan-600
                      hover:text-cyan-700
                      font-medium
                    "
                  >

                    Open in Maps ↗

                  </a>

                </div>

              </motion.div>
            )
          )}

        </div>

      </div>
    </section>
  );
}