"use client";

import { useEffect, useState } from "react";

import {
  Facebook,
  Instagram,
  Twitter,
  Apple,
  Play,
} from "lucide-react";

import {

  getPremiumFooterSection,

  getPremiumFooterGroups,

  getPremiumFooterLinks,

} from "@/services/PremiumFooterService";

export function PremiumSec() {

  const [section, setSection] =
    useState<any>(null);

  const [groups, setGroups] =
    useState<any[]>([]);

  const [links, setLinks] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const fetchData = async () => {

      const { data: sectionData } = await getPremiumFooterSection();

      const { data: groupsData } = await getPremiumFooterGroups();

      const { data: linksData } = await getPremiumFooterLinks();

      setSection(sectionData);

      setGroups(groupsData || []);

      setLinks(linksData || []);

      setLoading(false);

    };

    fetchData();

  }, []);

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {

    return null;

  }

  return (

    <>
      <footer
        className="relative text-white pt-28 pb-12 overflow-hidden"
        style={{
          fontFamily:
            "Harabara, sans-serif",
        }}
      >

        {/* BACKGROUND */}
        <div className="absolute inset-0">

          <img
            src={
              section?.background_image
            }
            className="w-full h-full object-cover opacity-20"
          />

          <div className="absolute inset-0 bg-[#02131d]/90" />

        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">

          {/* GRID */}
          <div className="grid md:grid-cols-5 gap-14">

            {/* DOWNLOAD */}
            <div>

              <h4 className="text-[10px] tracking-[3.5px] text-gray-400 mb-6">

                {
                  groups[0]
                    ?.group_title
                }

              </h4>

              <div className="space-y-4">

                {links
                  .filter(
                    (item) =>
                      item.group_id ===
                      groups[0]?.id
                  )
                  .map((item) => (

                    <button
                      key={item.id}
                      className="w-full border border-white/20 rounded-2xl px-5 py-4 text-left text-[13px] tracking-[0.45px] hover:bg-white/10 transition backdrop-blur-md"
                    >

                      <div className="flex items-center gap-3">

                        {item.link_text.includes(
                          "App Store"
                        ) && (

                            <Apple size={16} />

                          )}

                        {item.link_text.includes(
                          "Google Play"
                        ) && (

                            <Play size={16} />

                          )}

                        <span>

                          {item.link_text
                            .replace(" ", "")
                            .replace("▶ ", "")}

                        </span>

                      </div>

                    </button>

                  ))}              </div>

            </div>

            {/* CONNECT */}
            <div>

              <h4 className="text-[10px] tracking-[3.5px] text-gray-400 mb-6">

                CONNECT

              </h4>

              <p className="text-[14px] tracking-[0.5px] text-cyan-400 mb-5 leading-[1.8]">

                {section?.connect_text}

              </p>

              <div className="flex flex-col gap-4">

                <input
                  placeholder={
                    section?.email_placeholder
                  }
                  className="bg-white/10 border border-white/20 px-5 py-3 rounded-full text-[13px] tracking-[0.4px] outline-none backdrop-blur-md placeholder:text-white/45"
                />

                <button
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-full text-[12px] tracking-[1px] font-semibold hover:scale-[1.02] transition shadow-lg"
                >

                  {
                    section?.subscribe_button_text
                  }

                </button>

              </div>

            </div>

            {/* OTHER GROUPS */}
            {groups
              .slice(1)
              .map((group) => (

                <div key={group.id}>

                  <h4 className="text-[10px] tracking-[3.5px] text-gray-400 mb-6">

                    {group.group_title}

                  </h4>

                  <ul className="space-y-4 text-[13px] text-gray-300 tracking-[0.45px]">

                    {links
                      .filter(
                        (item) =>
                          item.group_id ===
                          group.id
                      )
                      .map((item) => (

                        <li
                          key={item.id}
                          className="hover:text-white transition cursor-pointer leading-[1.8]"
                        >

                          {item.link_text}

                        </li>

                      ))}

                  </ul>

                </div>

              ))}

          </div>

          {/* DIVIDER */}
          <div className="border-t border-white/10 my-14" />

          {/* BOTTOM */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">

            {/* SOCIALS */}
            <div className="flex gap-4">

              {[
                Facebook,
                Instagram,
                Twitter,
              ].map((Icon, i) => (

                <div
                  key={i}
                  className="w-11 h-11 flex items-center justify-center border border-white/20 rounded-full hover:bg-white/10 transition cursor-pointer"
                >

                  <Icon size={16} />

                </div>

              ))}

            </div>

            {/* COPYRIGHT */}
            <p className="text-[11px] text-gray-400 text-center tracking-[1px] leading-[1.9]">

              {section?.copyright_text}

            </p>

          </div>

        </div>

      </footer>

      {/* FONT */}
      <style jsx global>{`
        @font-face {
          font-family: 'Harabara';
          src: url('/fonts/Harabara.woff') format('woff');
        }
      `}</style>
    </>

  );

}