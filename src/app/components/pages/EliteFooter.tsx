"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Apple,
  Play,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

import {
  getEliteFooterSection,
  getEliteFooterGroups,
  getEliteFooterLinks,
} from "@/services/EliteFooterService";

/* =========================================
   FOOTER
========================================= */

export function EliteFooter() {

  const [section, setSection] =
    useState<any>(null);

  const [groups, setGroups] =
    useState<any[]>([]);

  const [links, setLinks] =
    useState<any[]>([]);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const fetchData = async () => {

      const { data: sectionData } =
        await getEliteFooterSection();

      const { data: groupsData } =
        await getEliteFooterGroups();

      const { data: linksData } =
        await getEliteFooterLinks();

      setSection(sectionData);

      setGroups(groupsData || []);

      setLinks(linksData || []);

    };

    fetchData();

  }, []);

  /* =========================================
     FILTER LINKS
  ========================================= */

  const getLinksByGroup =
    (groupId: string) => {

      return links.filter(
        (item) =>
          item.group_id === groupId
      );

    };

  return (

    <footer
      className="
        relative
        overflow-hidden
        bg-[#02131d]
        text-white
        pt-24
        pb-10
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* GLOW */}
      <div
        className="
          absolute
          top-0
          left-[-300px]
          w-[700px]
          h-[700px]
          bg-cyan-500/10
          blur-[180px]
          rounded-full
        "
      />

      <div
        className="
          relative
          max-w-7xl
          mx-auto
          px-6
        "
      >

        {/* ================= TOP ================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-5
            gap-14
            pb-20
            border-b
            border-white/10
          "
        >

          {/* GROUPS */}

          {groups.map((group) => (

            <div key={group.id}>

              {/* TITLE */}

              <h4
                className="
                  text-[10px]
                  tracking-[4px]
                  text-white/60
                  mb-8
                "
              >

                {group.title}

              </h4>

              {/* LINKS */}

              <div
                className="
                  flex
                  flex-col
                  gap-5
                "
              >

                {getLinksByGroup(
                  group.id
                ).map((item) => (

                  <a
                    href={
                      item.link_url || "#"
                    }
                    key={item.id}
                    className="
                      text-white
                      text-[15px]
                      hover:text-cyan-400
                      transition
                      duration-300
                    "
                  >

                    {/* APP BUTTON */}

                    {group.title ===
                    "DOWNLOAD APP" ? (

                      <div
                        className="
                          w-full
                          h-[78px]
                          border
                          border-white/15
                          rounded-3xl
                          flex
                          items-center
                          px-6
                          gap-4
                          hover:border-cyan-400/40
                          transition
                        "
                      >

                        {item.icon_type ===
                          "apple" && (

                          <Apple
                            size={18}
                          />

                        )}

                        {item.icon_type ===
                          "play" && (

                          <Play
                            size={18}
                          />

                        )}

                        <span>

                          {item.link_text}

                        </span>

                      </div>

                    ) : (

                      item.link_text

                    )}

                  </a>

                ))}

                {/* ================= CONNECT ================= */}

                {group.title ===
                  "DOWNLOAD APP" &&
                  section && (

                  <div className="mt-10">

                    <p
                      className="
                        text-cyan-400
                        text-[15px]
                        mb-5
                      "
                    >

                      {
                        section.footer_note
                      }

                    </p>

                    <input
                      placeholder={
                        section.subscribe_placeholder
                      }
                      className="
                        w-full
                        h-[60px]
                        rounded-full
                        bg-white/10
                        border
                        border-white/10
                        px-6
                        outline-none
                        text-white
                        placeholder:text-white/40
                        mb-5
                      "
                    />

                    <button
                      className="
                        w-full
                        h-[58px]
                        rounded-full
                        bg-gradient-to-r
                        from-cyan-400
                        to-blue-500
                        text-white
                        font-semibold
                        tracking-[1px]
                      "
                    >

                      {
                        section.subscribe_button_text
                      }

                    </button>

                  </div>

                )}

              </div>

            </div>

          ))}

        </div>

        {/* ================= BOTTOM ================= */}

        <div
          className="
            pt-14
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-10
          "
        >

          {/* SOCIAL */}

          <div
            className="
              flex
              items-center
              gap-5
            "
          >

            <div
              className="
                w-14
                h-14
                rounded-full
                border
                border-white/20
                flex
                items-center
                justify-center
                hover:border-cyan-400
                transition
              "
            >

              <Facebook size={18} />

            </div>

            <div
              className="
                w-14
                h-14
                rounded-full
                border
                border-white/20
                flex
                items-center
                justify-center
                hover:border-cyan-400
                transition
              "
            >

              <Instagram size={18} />

            </div>

            <div
              className="
                w-14
                h-14
                rounded-full
                border
                border-white/20
                flex
                items-center
                justify-center
                hover:border-cyan-400
                transition
              "
            >

              <Twitter size={18} />

            </div>

          </div>

          {/* CTA */}

          <div
            className="
              flex
              items-center
              bg-white/5
              rounded-full
              p-2
              border
              border-white/10
            "
          >

            <button
              className="
                h-[58px]
                px-10
                rounded-full
                bg-cyan-400
                text-black
                font-bold
                tracking-[1px]
              "
            >

              {
                section?.cta_button_text
              }

            </button>

            <a
              href={
                section?.whatsapp_link
              }
              target="_blank"
              rel="noreferrer"
              className="
                ml-3
                w-14
                h-14
                rounded-full
                bg-[#1acb5f]
                flex
                items-center
                justify-center
              "
            >

              <img
                src="/whatsapp.png"
                alt="whatsapp"
                className="
                  w-6
                  h-6
                "
              />

            </a>

          </div>

          {/* COPYRIGHT */}

          <p
            className="
              text-[11px]
              tracking-[2px]
              text-white/55
              text-center
            "
          >

            {
              section?.copyright_text
            }

          </p>

        </div>

      </div>

    </footer>

  );

}