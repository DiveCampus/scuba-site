"use client";

import { useEffect, useState } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { getFooter } from "@/services/footService";

export function PremiumFooter() {
  const [section, setSection] = useState<any>(null);
  const [links, setLinks] = useState<any[]>([]);
  const [socials, setSocials] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      console.log("🚀 Loading footer UI...");

      const res = await getFooter();

      console.log("📦 FULL RESPONSE:", res);

      setSection(res.section);
      setLinks(res.links || []);
      setSocials(res.socials || []);
      setApps(res.apps || []);
    };

    load();
  }, []);

  if (!section) return null;

  return (
    <footer className="relative bg-[#06141f] text-white pt-20 pb-10 overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 opacity-20">
        <img src="/img3.jpeg" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-5 gap-10">

          {/* DOWNLOAD APP */}
          <div>
            <h4 className="text-[11px] tracking-[3px] text-gray-400 mb-4">
              DOWNLOAD APP
            </h4>

            <div className="space-y-3">
              {apps.map((app) => (
                <a
                  key={app.id}
                  href={app.link}
                  target="_blank"
                  className="block border border-white/20 rounded-lg px-4 py-3 hover:bg-white/10"
                >
                  {app.name}
                </a>
              ))}
            </div>
          </div>

          {/* CONNECT */}
          <div>
            <h4 className="text-[11px] tracking-[3px] text-gray-400 mb-4">
              CONNECT
            </h4>

            <p className="text-sm mb-3 text-cyan-400">
              {section.whatsapp_text}
            </p>

            <input
              placeholder={section.subscribe_placeholder}
              className="bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm w-full"
            />

            <button className="mt-3 w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-2 rounded-full">
              SUBSCRIBE
            </button>
          </div>

          {/* INFO */}
          <div>
            <h4 className="text-[11px] tracking-[3px] text-gray-400 mb-4">
              INFORMATION
            </h4>

            {links
              .filter((l) => l.category === "info")
              .map((item) => (
                <p key={item.id} className="text-sm text-gray-300">
                  {item.label}
                </p>
              ))}
          </div>

          {/* EXPERIENCES */}
          <div>
            <h4 className="text-[11px] tracking-[3px] text-gray-400 mb-4">
              EXPERIENCES
            </h4>

            {links
              .filter((l) => l.category === "experiences")
              .map((item) => (
                <p key={item.id} className="text-sm text-gray-300">
                  {item.label}
                </p>
              ))}
          </div>

          {/* COURSES */}
          <div>
            <h4 className="text-[11px] tracking-[3px] text-gray-400 mb-4">
              DIVING COURSES
            </h4>

            {links
              .filter((l) => l.category === "courses")
              .map((item) => (
                <p key={item.id} className="text-sm text-gray-300">
                  {item.label}
                </p>
              ))}
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-10" />

        {/* BOTTOM */}
        <div className="flex justify-between items-center">

          {/* SOCIAL */}
          <div className="flex gap-4">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full"
              >
                {s.platform === "facebook" && <Facebook size={16} />}
                {s.platform === "instagram" && <Instagram size={16} />}
                {s.platform === "twitter" && <Twitter size={16} />}
              </a>
            ))}
          </div>

          {/* COPYRIGHT */}
          <p className="text-xs text-gray-400">
            {section.copyright}
          </p>

        </div>
      </div>
    </footer>
  );
}