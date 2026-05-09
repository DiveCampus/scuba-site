"use client";

import {

  useEffect,

  useState,

} from "react";

import {

  Save,

} from "lucide-react";

import {

  getEliteFooterSection,

  updateEliteFooterSection,

  getEliteFooterGroups,

  getEliteFooterLinks,

  updateEliteFooterGroup,

  updateEliteFooterLink,

} from "@/services/EliteFooterService";

/* =========================================
   ADMIN
========================================= */

export default function EliteFooterAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [groups, setGroups] =
    useState<any[]>([]);

  const [links, setLinks] =
    useState<any[]>([]);

  const [saving, setSaving] =
    useState(false);

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
     SAVE
  ========================================= */

  const handleSave =
    async () => {

      if (!section?.id) return;

      setSaving(true);

      await updateEliteFooterSection(
        section.id,
        section
      );

      setSaving(false);

    };

  const getLinksByGroup =
    (groupId: string) => {

      return links.filter(
        (item) =>
          item.group_id === groupId
      );

    };

  if (!section) return null;

  return (

    <section
      className="
        bg-[#02131d]
        text-white
        py-24
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      <div className="
        max-w-7xl
        mx-auto
        px-6
      ">

        {/* TOP */}
        <div className="
          flex
          items-center
          justify-between
          mb-20
        ">

          <div>

            <p className="
              text-cyan-400
              tracking-[4px]
              text-[10px]
              mb-3
            ">

              ADMIN PANEL

            </p>

            <h2 className="
              text-4xl
              font-bold
            ">

              Elite Footer

            </h2>

          </div>

          <button
            onClick={handleSave}
            className="
              h-[56px]
              px-7
              rounded-2xl
              bg-cyan-400
              text-black
              font-semibold
              flex
              items-center
              gap-3
            "
          >

            <Save size={18} />

            {
              saving
                ? "Saving..."
                : "Save Changes"
            }

          </button>

        </div>

        {/* SECTION FORM */}
        <div className="
          grid
          md:grid-cols-2
          gap-6
          mb-20
        ">

          <input
            value={
              section.footer_note
            }
            onChange={(e) =>
              setSection({
                ...section,
                footer_note:
                  e.target.value,
              })
            }
            placeholder="
              Footer Note
            "
            className="
              h-[60px]
              rounded-2xl
              bg-white/5
              border
              border-white/10
              px-6
              outline-none
            "
          />

          <input
            value={
              section.subscribe_placeholder
            }
            onChange={(e) =>
              setSection({
                ...section,
                subscribe_placeholder:
                  e.target.value,
              })
            }
            placeholder="
              Subscribe Placeholder
            "
            className="
              h-[60px]
              rounded-2xl
              bg-white/5
              border
              border-white/10
              px-6
              outline-none
            "
          />

          <input
            value={
              section.subscribe_button_text
            }
            onChange={(e) =>
              setSection({
                ...section,
                subscribe_button_text:
                  e.target.value,
              })
            }
            placeholder="
              Subscribe Button
            "
            className="
              h-[60px]
              rounded-2xl
              bg-white/5
              border
              border-white/10
              px-6
              outline-none
            "
          />

          <input
            value={
              section.cta_button_text
            }
            onChange={(e) =>
              setSection({
                ...section,
                cta_button_text:
                  e.target.value,
              })
            }
            placeholder="
              CTA Button
            "
            className="
              h-[60px]
              rounded-2xl
              bg-white/5
              border
              border-white/10
              px-6
              outline-none
            "
          />

        </div>

        {/* GROUPS */}
        <div className="
          grid
          md:grid-cols-2
          lg:grid-cols-4
          gap-10
        ">

          {groups.map((group) => (

            <div
              key={group.id}
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                p-7
              "
            >

              {/* GROUP TITLE */}
              <input
                value={group.title}
                onChange={(e) => {

                  const updated =
                    [...groups];

                  updated.find(
                    (g) =>
                      g.id ===
                      group.id
                  ).title =
                    e.target.value;

                  setGroups(updated);

                  updateEliteFooterGroup(
                    group.id,
                    {
                      title:
                        e.target.value,
                    }
                  );

                }}
                className="
                  bg-transparent
                  text-cyan-400
                  text-[11px]
                  tracking-[4px]
                  uppercase
                  mb-8
                  outline-none
                  w-full
                "
              />

              {/* LINKS */}
              <div className="
                flex
                flex-col
                gap-4
              ">

                {getLinksByGroup(
                  group.id
                ).map((link) => (

                  <input
                    key={link.id}
                    value={
                      link.link_text
                    }
                    onChange={(e) => {

                      const updated =
                        [...links];

                      updated.find(
                        (l) =>
                          l.id ===
                          link.id
                      ).link_text =
                        e.target.value;

                      setLinks(updated);

                      updateEliteFooterLink(
                        link.id,
                        {
                          link_text:
                            e.target.value,
                        }
                      );

                    }}
                    className="
                      h-[52px]
                      rounded-2xl
                      bg-white/5
                      border
                      border-white/10
                      px-5
                      outline-none
                    "
                  />

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}