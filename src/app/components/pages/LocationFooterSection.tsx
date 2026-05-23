// =========================================
// LocationFooterSection.tsx
// DYNAMIC FRONTEND
// =========================================

"use client";

import {

  useEffect,

  useState,

} from "react";

import {

  MapPin,

  Coffee,

  Car,

  Waves,

} from "lucide-react";

import {

  getLocationFooter,

} from "@/services/LocationFooterService";

/* =========================================
   ICON MAP
========================================= */

const iconMap: any = {

  Car: Car,

  Waves: Waves,

  MapPin: MapPin,

  Coffee: Coffee,

};

export function LocationFooterSection() {

  const [

    section,

    setSection,

  ] = useState<any>(null);

  const [

    features,

    setFeatures,

  ] = useState<any[]>([]);

  const [

    groups,

    setGroups,

  ] = useState<any[]>([]);

  const [

    links,

    setLinks,

  ] = useState<any[]>([]);

  /* =========================================
     LOAD DATA
  ========================================= */

  useEffect(() => {

    const load =
      async () => {

        const {

          section,

          features,

          groups,

          links,

        } = await getLocationFooter();

        console.log(
          "LOCATION FOOTER =>",
          {
            section,
            features,
            groups,
            links,
          }
        );

        setSection(section);

        setFeatures(
          features || []
        );

        setGroups(
          groups || []
        );

        setLinks(
          links || []
        );

      };

    load();

  }, []);

  if (!section)
    return null;

  /* =========================================
     GET LINKS BY GROUP
  ========================================= */

  const getLinks =
    (
      groupId: string
    ) => {

      return links.filter(

        (item) =>
          item.group_id ===
          groupId

      );

    };

  return (

    <>

      {/* =========================================
         LOCATION SECTION
      ========================================= */}

      <section

        className="relative bg-gradient-to-r from-[#02131d] to-[#031e2d] text-white py-32 overflow-hidden"

        style={{
          fontFamily:
            "Harabara, sans-serif",
        }}

      >

        {/* BACKGROUND GLOW */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full" />

        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full" />

        <div className="relative max-w-[1120px] mx-auto grid md:grid-cols-2 gap-20 px-6 items-center">

          {/* LEFT */}
          <div>

            {/* LABEL */}
            <p className="text-[10px] tracking-[4px] text-cyan-400 mb-6 uppercase">

              {
                section.label
              }

            </p>

            {/* TITLE */}
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.12] tracking-[1.2px]">

              {
                section.title
              }

              <br />

              <span className="text-cyan-400">

                {
                  section.highlighted_title
                }

              </span>

            </h2>

            {/* DESCRIPTION */}
            <p className="text-[15px] md:text-[16px] text-white/60 mt-9 max-w-[540px] leading-[2] tracking-[0.45px] whitespace-pre-line">

              {
                section.description
              }

            </p>

            {/* FEATURES */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-6 mt-12 text-[13px] text-white/75 tracking-[0.4px]">

              {features.map(
                (
                  item
                ) => {

                  const Icon =
                    iconMap[
                      item.icon
                    ];

                  return (

                    <div

                      key={
                        item.id
                      }

                      className="flex items-center gap-3"

                    >

                      {

                        Icon && (

                          <Icon
                            className="w-4 h-4 text-cyan-400 shrink-0"
                          />

                        )

                      }

                      <span className="leading-[1.8]">

                        {
                          item.title
                        }

                      </span>

                    </div>

                  );

                }

              )}

            </div>

            {/* BUTTONS */}
            <div className="mt-12 flex gap-4 flex-wrap">

              {/* PRIMARY */}
              <a

                href={
                  section.primary_button_link
                }

                target="_blank"

                rel="
                  noopener
                  noreferrer
                "

                className="px-7 py-3.5 bg-white text-[#0a0e27] text-[12px] tracking-[1px] rounded-2xl font-medium hover:scale-[1.03] transition duration-300 shadow-lg"

              >

                {
                  section.primary_button_text
                }

              </a>

              {/* SECONDARY */}
              <a

                href={
                  section.secondary_button_link
                }

                className="px-7 py-3.5 border border-white/20 text-[12px] tracking-[1px] rounded-2xl hover:bg-white/10 transition duration-300"

              >

                {
                  section.secondary_button_text
                }

              </a>

            </div>

          </div>

          {/* MAP */}
          <div className="rounded-[28px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.45)] border border-white/10">

            <iframe

              src={
                section.map_iframe_url
              }

              className="w-full h-[420px] border-0"

              loading="lazy"

            />

          </div>

        </div>

      </section>

      {/* =========================================
         FOOTER
      ========================================= */}

      <footer

        className="bg-[#020d16] text-white py-24 border-t border-white/5"

        style={{
          fontFamily:
            "Harabara, sans-serif",
        }}

      >

        <div className="max-w-[1120px] mx-auto grid md:grid-cols-4 gap-14 px-6">

          {groups.map(
            (
              group
            ) => (

              <div
                key={
                  group.id
                }
              >

                <p className="text-white/50 text-[10px] tracking-[4px] mb-7 uppercase">

                  {
                    group.title
                  }

                </p>

                <ul className="space-y-5 text-white/70 text-[13px] tracking-[0.4px] leading-[1.9]">

                  {getLinks(
                    group.id
                  ).map(
                    (
                      link
                    ) => (

                      <li
                        key={
                          link.id
                        }
                      >

                        <a

                          href={
                            link.url
                          }

                          className="hover:text-white transition cursor-pointer"

                        >

                          {
                            link.label
                          }

                        </a>

                      </li>

                    )
                  )}

                </ul>

              </div>

            )
          )}

        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-white/35 text-[11px] tracking-[1.2px] mt-20 leading-[2.2]">

          {
            section.copyright_text
          }

        </div>

      </footer>

    </>

  );

}