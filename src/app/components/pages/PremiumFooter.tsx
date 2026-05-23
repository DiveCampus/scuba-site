"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

import { motion } from "framer-motion";

import { getFooter } from "@/services/footService";

export function PremiumFooter() {
  const [section, setSection] =
    useState<any>(null);

  const [links, setLinks] =
    useState<any[]>([]);

  const [socials, setSocials] =
    useState<any[]>([]);

  const [apps, setApps] =
    useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getFooter();

    setSection(
      res.section
    );

    setLinks(
      res.links || []
    );

    setSocials(
      res.socials || []
    );

    setApps(
      res.apps || []
    );
  };

  if (!section)
    return null;

  return (
    <footer className="relative bg-[#06141f] text-white pt-24 pb-10 overflow-hidden">

      {/* BG */}
      <div className="absolute inset-0 opacity-10">

        <img
          src="/img3.webp"
          className="w-full h-full object-cover"
        />

      </div>

      {/* GLOW */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* TOP */}
        <div className="grid md:grid-cols-5 gap-12">

          {/* APPS */}
          <div>

            <h4 className="text-[11px] tracking-[3px] text-gray-400 mb-5">

              DOWNLOAD APP

            </h4>

            <div className="space-y-3">

              {apps.map((app) => (
                <motion.a
                  whileHover={{
                    scale: 1.02,
                  }}
                  key={app.id}
                  href={app.link}
                  target="_blank"
                  className="block border border-white/10 rounded-2xl px-5 py-4 hover:bg-white/5 transition"
                >

                  {app.name}

                </motion.a>
              ))}

            </div>

          </div>

          {/* CONNECT */}
          <div>

            <h4 className="text-[11px] tracking-[3px] text-gray-400 mb-5">

              CONNECT

            </h4>

            <p className="text-cyan-400 text-sm mb-4">

              {
                section.whatsapp_text
              }

            </p>

            <input
              placeholder={
                section.subscribe_placeholder
              }
              className="bg-white/5 border border-white/10 px-5 py-3 rounded-full text-sm w-full outline-none"
            />

            <button
              className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-3 rounded-full font-semibold"
            >

              SUBSCRIBE

            </button>

          </div>

          {/* INFO */}
          <div>

            <h4 className="text-[11px] tracking-[3px] text-gray-400 mb-5">

              INFORMATION

            </h4>

            <div className="space-y-3">

              {links
                .filter(
                  (l) =>
                    l.category ===
                    "info"
                )
                .map((item) => (
                  <p
                    key={item.id}
                    className="text-sm text-gray-300 hover:text-white cursor-pointer"
                  >

                    {item.label}

                  </p>
                ))}

            </div>

          </div>

          {/* EXPERIENCES */}
          <div>

            <h4 className="text-[11px] tracking-[3px] text-gray-400 mb-5">

              EXPERIENCES

            </h4>

            <div className="space-y-3">

              {links
                .filter(
                  (l) =>
                    l.category ===
                    "experiences"
                )
                .map((item) => (
                  <p
                    key={item.id}
                    className="text-sm text-gray-300 hover:text-white cursor-pointer"
                  >

                    {item.label}

                  </p>
                ))}

            </div>

          </div>

          {/* COURSES */}
          <div>

            <h4 className="text-[11px] tracking-[3px] text-gray-400 mb-5">

              DIVING COURSES

            </h4>

            <div className="space-y-3">

              {links
                .filter(
                  (l) =>
                    l.category ===
                    "courses"
                )
                .map((item) => (
                  <p
                    key={item.id}
                    className="text-sm text-gray-300 hover:text-white cursor-pointer"
                  >

                    {item.label}

                  </p>
                ))}

            </div>

          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-10" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* SOCIALS */}
          <div className="flex gap-4">

            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                className="w-11 h-11 flex items-center justify-center border border-white/10 rounded-full hover:bg-cyan-400 hover:text-black transition"
              >

                {s.platform ===
                  "facebook" && (
                  <Facebook size={16} />
                )}

                {s.platform ===
                  "instagram" && (
                  <Instagram size={16} />
                )}

                {s.platform ===
                  "twitter" && (
                  <Twitter size={16} />
                )}

              </a>
            ))}

          </div>

          {/* COPYRIGHT */}
          <p className="text-xs text-gray-400 text-center">

            {
              section.copyright
            }

          </p>

        </div>

      </div>

    </footer>
  );
}