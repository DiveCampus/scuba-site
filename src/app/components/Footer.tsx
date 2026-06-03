"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  getFooter,
  getSocials,
  getLocations,
} from "@/services/footerService";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const [footer, setFooter] = useState<any>(null);
  const [socials, setSocials] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    console.log("🚀 Footer Component Mounted");

    load();
  }, []);

  const load = async () => {
    console.log("📡 Loading footer data...");

    try {
      const f = await getFooter();
      const s = await getSocials();
      const l = await getLocations();

      // 🔥 FULL RESPONSE LOG
      console.log("📦 FOOTER RESPONSE:", f);
      console.log("📦 SOCIAL RESPONSE:", s);
      console.log("📦 LOCATION RESPONSE:", l);

      // 🔥 ERROR LOG
      console.log("❌ FOOTER ERROR:", f.error);
      console.log("❌ SOCIAL ERROR:", s.error);
      console.log("❌ LOCATION ERROR:", l.error);

      // 🔥 DATA LOG
      console.log("✅ FOOTER DATA:", f.data);
      console.log("✅ SOCIAL DATA:", s.data);
      console.log("✅ LOCATION DATA:", l.data);

      setFooter(f.data);
      setSocials(s.data || []);
      setLocations(l.data || []);
    } catch (err) {
      console.error("🔥 FETCH CRASH:", err);
    }
  };

  // 🔥 ICON MAP
  const iconMap: any = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
  };

  // 🔥 LOADING DEBUG
  if (!footer) {
    console.log("⏳ Footer not loaded yet...");
    return (
      <div className="text-white text-center py-20">
        Loading Footer...
      </div>
    );
  }

  return (
    <footer className="relative overflow-hidden">

      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#18476D] via-[#123a5a] to-[#0b2c45]" />

      <div className="relative max-w-[1400px] mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16">

          {/* LEFT */}
          <div className="space-y-6">

            <img src="/logo.webp" alt="DiveCampus - PADI Scuba Diving Dubai" className="w-32 h-auto object-contain" loading="lazy" decoding="async" />

            <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed max-w-md">
              {footer.description || "No description"}
            </p>

            <div className="space-y-3 text-white/70 text-[14px] md:text-[15px]">

              <div className="flex gap-3 items-center">
                <Mail className="text-cyan-300" size={16} />
                {footer.email || "No email"}
              </div>

              <div className="flex gap-3 items-center">
                <Phone className="text-cyan-300" size={16} />
                {footer.phone || "No phone"}
              </div>

              <div className="flex gap-3 items-center">
                <MapPin className="text-cyan-300" size={16} />
                {footer.location || "No location"}
              </div>

            </div>

            {/* 🔥 SOCIAL */}
            <div className="flex gap-3">

              {socials
                .filter((s) => s.url && s.url !== "#")
                .map((s, i) => {
                  const Icon = iconMap[s.platform?.toLowerCase()];

                  if (!Icon) {
                    console.warn("⚠️ Unknown platform:", s.platform);
                    return null;
                  }

                  console.log("🔗 Rendering social:", s);

                  return (
                    <motion.a
                      key={i}
                      href={s.url}
                      target="_blank"
                      whileHover={{ y: -5 }}
                      className="p-3 rounded-xl bg-white/10 border border-white/20 hover:border-cyan-300"
                    >
                      <Icon className="text-white w-5 h-5" />
                    </motion.a>
                  );
                })}

            </div>

          </div>

          {/* RIGHT MAPS */}
          <div className="grid grid-cols-2 gap-6">

            {locations.map((loc, i) => {
              console.log("🗺️ Rendering location:", loc);

              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="group rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl"
                >

                  <div className="p-3">
                    <h4 className="text-white text-[12px] font-semibold tracking-[3px] uppercase flex items-center gap-2">
                      <MapPin className="text-cyan-300" size={14} />
                      {loc.title}
                    </h4>

                    <p className="text-white/50 text-[14px] md:text-[15px] leading-relaxed mt-1">
                      {loc.address}
                    </p>
                  </div>

                  <iframe
                    src={loc.map_url}
                    className="w-full h-[320px] grayscale group-hover:grayscale-0 transition duration-500"
                  />

                </motion.div>
              );
            })}

          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-16 pt-6 border-t border-white/10 flex justify-between">

          <p className="text-white/50 text-sm">
            {footer.copyright ||
              `© ${currentYear} Dive Campus`}
          </p>

        </div>

      </div>
    </footer>
  );
}