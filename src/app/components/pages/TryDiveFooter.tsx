"use client";

import { useEffect, useState } from "react";
import {
  FaApple,
  FaGooglePlay,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

import { WhatsAppIcon } from "../WhatsAppButton";
import { getTryDiveFooter } from "@/services/TryDiveFooterService";

// Fallback content — keeps the footer pixel-identical when the DB is empty.
const DEFAULT_SECTION = {
  footer_bg_image: "/footer-bg.webp",
  whatsapp_text: "WhatsApp Support",
  whatsapp_url: "",
  newsletter_placeholder: "Enter email for deals...",
  subscribe_button_text: "SUBSCRIBE",
  copyright_text: "© 2026 DIVING IN UAE | POWERED BY DIVE CAMPUS CENTER",
  app_store_url: "",
  google_play_url: "",
};

const DEFAULT_LINKS = [
  { section_name: "information", title: "About Us", url: "/about" },
  { section_name: "information", title: "Blogs", url: "/blogs" },
  { section_name: "information", title: "Terms & Conditions", url: "/terms" },
  { section_name: "information", title: "Privacy Policy", url: "/privacy" },
  { section_name: "experiences", title: "Try Scuba Dive", url: "/try-dive" },
  { section_name: "experiences", title: "Certified Dive Trips", url: "/certified-dives" },
  { section_name: "experiences", title: "International Trips", url: "/international-trips" },
  { section_name: "experiences", title: "Refresher Course", url: "/refresher-course" },
  { section_name: "courses", title: "PADI Open Water", url: "/open-water" },
  { section_name: "courses", title: "Advanced Open Water", url: "/advanced-open-water" },
  { section_name: "courses", title: "Rescue Diver", url: "/rescue-diver" },
  { section_name: "courses", title: "Dive Master", url: "/dive-master" },
  { section_name: "courses", title: "Retail Shop", url: "/retail-shop" },
];

const DEFAULT_SOCIALS = [
  { icon_name: "facebook", url: "https://facebook.com" },
  { icon_name: "instagram", url: "https://instagram.com" },
  { icon_name: "twitter", url: "https://x.com" },
];

// Maps a DB social icon name -> element (sizes match the original layout).
const socialIconMap: any = {
  facebook: <FaFacebookF size={13} />,
  instagram: <FaInstagram size={14} />,
  twitter: <FaXTwitter size={13} />,
  x: <FaXTwitter size={13} />,
};

export function TryDiveFooter() {
  const [section, setSection] = useState<any>(DEFAULT_SECTION);
  const [links, setLinks] = useState<any[]>(DEFAULT_LINKS);
  const [socials, setSocials] = useState<any[]>(DEFAULT_SOCIALS);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { section, links, socials } = await getTryDiveFooter();

    if (section) setSection(section);

    if (links && links.length) setLinks(links);

    if (socials && socials.length) setSocials(socials);
  };

  const linksFor = (name: string) =>
    links.filter((l) => l.section_name === name);

  return (
    <>
      <footer
        className="relative overflow-hidden bg-[#02101d] pt-20 pb-10"
        style={{ fontFamily: "Harabara, sans-serif" }}
      >

        {/* BACKGROUND */}
        <div className="absolute inset-0">
          <img
            src={section.footer_bg_image}
            alt="footer"
            className="w-full h-full object-cover opacity-20"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#02101d] via-[#02101d]/90 to-[#02101d]" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-6xl mx-auto px-6">

          {/* TOP GRID */}
          <div className="grid md:grid-cols-5 gap-10">

            {/* DOWNLOAD */}
            <div>
              <h4 className="text-white text-[12px] font-semibold tracking-[3px] uppercase mb-6">
                DOWNLOAD APP
              </h4>

              <div className="space-y-3">

                {/* APP STORE */}
                <button
                  onClick={() =>
                    section.app_store_url &&
                    window.open(section.app_store_url, "_blank", "noopener,noreferrer")
                  }
                  className="w-[160px] h-[48px] rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition flex items-center gap-3 px-4"
                >

                  <FaApple className="text-white text-xl" />

                  <div className="text-left">
                    <p className="text-[8px] text-white/40 uppercase">
                      Download on the
                    </p>

                    <p className="text-white text-sm font-medium">
                      App Store
                    </p>
                  </div>

                </button>

                {/* PLAY STORE */}
                <button
                  onClick={() =>
                    section.google_play_url &&
                    window.open(section.google_play_url, "_blank", "noopener,noreferrer")
                  }
                  className="w-[160px] h-[48px] rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition flex items-center gap-3 px-4"
                >

                  <FaGooglePlay className="text-white text-lg" />

                  <div className="text-left">
                    <p className="text-[8px] text-white/40 uppercase">
                      Get it on
                    </p>

                    <p className="text-white text-sm font-medium">
                      Google Play
                    </p>
                  </div>

                </button>

              </div>
            </div>

            {/* CONNECT */}
            <div>
              <h4 className="text-white text-[12px] font-semibold tracking-[3px] uppercase mb-6">
                CONNECT
              </h4>

              <div className="flex items-center gap-2 text-white/70 text-sm mb-5">
                <WhatsAppIcon className="text-[#25D366]" />
                {section.whatsapp_text}
              </div>

              <div className="space-y-3">

                <input
                  type="email"
                  placeholder={section.newsletter_placeholder}
                  className="w-full h-[44px] rounded-full bg-white/[0.03] border border-white/10 px-5 text-sm text-white placeholder:text-white/30 outline-none"
                />

                <button className="w-full h-[44px] rounded-full bg-cyan-500 hover:bg-cyan-400 transition text-white text-sm font-semibold tracking-[1px]">
                  {section.subscribe_button_text}
                </button>

              </div>
            </div>

            {/* INFO */}
            <div>
              <h4 className="text-white text-[12px] font-semibold tracking-[3px] uppercase mb-6">
                INFORMATION
              </h4>

              <div className="space-y-4 text-sm text-white/50">

                {linksFor("information").map((link, i) => (
                  <a
                    key={link.id ?? i}
                    href={link.url || "#"}
                    className="block hover:text-cyan-400 cursor-pointer transition"
                  >
                    {link.title}
                  </a>
                ))}

              </div>
            </div>

            {/* EXPERIENCES */}
            <div>
              <h4 className="text-white text-[12px] font-semibold tracking-[3px] uppercase mb-6">
                EXPERIENCES
              </h4>

              <div className="space-y-4 text-sm text-white/50">

                {linksFor("experiences").map((link, i) => (
                  <a
                    key={link.id ?? i}
                    href={link.url || "#"}
                    className="block hover:text-cyan-400 cursor-pointer transition"
                  >
                    {link.title}
                  </a>
                ))}

              </div>
            </div>

            {/* COURSES */}
            <div>
              <h4 className="text-white text-[12px] font-semibold tracking-[3px] uppercase mb-6">
                DIVING COURSES
              </h4>

              <div className="space-y-4 text-sm text-white/50">

                {linksFor("courses").map((link, i) => (
                  <a
                    key={link.id ?? i}
                    href={link.url || "#"}
                    className="block hover:text-cyan-400 cursor-pointer transition"
                  >
                    {link.title}
                  </a>
                ))}

              </div>
            </div>

          </div>

          {/* DIVIDER */}
          <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">

            {/* SOCIALS */}
            <div className="flex items-center gap-3">

              {socials.map((social, i) => (
                <button
                  key={social.id ?? i}
                  onClick={() =>
                    social.url &&
                    window.open(social.url, "_blank", "noopener,noreferrer")
                  }
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/70 hover:text-cyan-400 hover:border-cyan-400/30 transition"
                >
                  {socialIconMap[social.icon_name] ?? <FaFacebookF size={13} />}
                </button>
              ))}

            </div>

            {/* COPYRIGHT */}
            <p className="text-[11px] tracking-[1px] text-white/30 text-center">
              {section.copyright_text}
            </p>

          </div>

        </div>

      </footer>

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
