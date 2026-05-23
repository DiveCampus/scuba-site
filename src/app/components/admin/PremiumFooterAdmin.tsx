"use client";

import { useEffect, useState } from "react";

import { Save } from "lucide-react";

import {

  getPremiumFooterSection,

  updatePremiumFooterSection,

  getPremiumFooterGroups,

  updatePremiumFooterGroup,

  getPremiumFooterLinks,

  updatePremiumFooterLink,

} from "@/services/PremiumFooterService";

export default function PremiumFooterAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [groups, setGroups] =
    useState<any[]>([]);

  const [links, setLinks] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

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
     SAVE
  ========================================= */

  const handleSave = async () => {

    if (!section?.id) return;

    setSaving(true);

    await updatePremiumFooterSection(
      section.id,
      section
    );

    setSaving(false);

  };

  if (loading) return null;

  return (

    <section
      className="relative min-h-screen bg-[#02131d] text-white py-28 overflow-hidden"
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
          className="w-full h-full object-cover opacity-10"
        />

        <div className="absolute inset-0 bg-[#02131d]/95" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-16 flex-wrap gap-5">

          <div>

            <p className="text-[10px] tracking-[4px] text-cyan-400 mb-3">
              ADMIN PANEL
            </p>

            <h2 className="text-3xl md:text-5xl font-bold">
              Premium Footer
            </h2>

          </div>

          <button
            onClick={handleSave}
            className="h-[56px] px-7 rounded-2xl bg-cyan-400 text-black font-semibold flex items-center gap-3"
          >

            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save"}

          </button>

        </div>

        {/* SECTION */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">

          <input
            value={
              section?.background_image || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                background_image:
                  e.target.value,
              })
            }
            className="h-[56px] rounded-2xl bg-white/5 border border-white/10 px-5 text-white outline-none"
            placeholder="Background Image"
          />

          <input
            value={
              section?.connect_text || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                connect_text:
                  e.target.value,
              })
            }
            className="h-[56px] rounded-2xl bg-white/5 border border-white/10 px-5 text-white outline-none"
            placeholder="Connect Text"
          />

          <input
            value={
              section?.email_placeholder || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                email_placeholder:
                  e.target.value,
              })
            }
            className="h-[56px] rounded-2xl bg-white/5 border border-white/10 px-5 text-white outline-none"
            placeholder="Email Placeholder"
          />

          <input
            value={
              section?.subscribe_button_text || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                subscribe_button_text:
                  e.target.value,
              })
            }
            className="h-[56px] rounded-2xl bg-white/5 border border-white/10 px-5 text-white outline-none"
            placeholder="Subscribe Button"
          />

        </div>

        {/* GROUPS */}
        <div className="grid md:grid-cols-4 gap-8">

          {groups.map(
            (group) => (

              <div
                key={group.id}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
              >

                {/* GROUP TITLE */}
                <input
                  value={
                    group.group_title
                  }
                  onChange={(e) => {

                    const updated =
                      [...groups];

                    const index =
                      updated.findIndex(
                        (g) =>
                          g.id ===
                          group.id
                      );

                    updated[
                      index
                    ].group_title =
                      e.target.value;

                    setGroups(updated);

                    updatePremiumFooterGroup(
                      group.id,
                      updated[index]
                    );

                  }}
                  className="w-full h-[52px] rounded-2xl bg-white/5 border border-white/10 px-4 text-white outline-none mb-6 text-[12px] tracking-[2px]"
                />

                {/* LINKS */}
                <div className="space-y-4">

                  {links
                    .filter(
                      (item) =>
                        item.group_id ===
                        group.id
                    )
                    .map((item) => (

                      <input
                        key={item.id}
                        value={
                          item.link_text
                        }
                        onChange={(e) => {

                          const updated =
                            [...links];

                          const index =
                            updated.findIndex(
                              (l) =>
                                l.id ===
                                item.id
                            );

                          updated[
                            index
                          ].link_text =
                            e.target.value;

                          setLinks(
                            updated
                          );

                          updatePremiumFooterLink(
                            item.id,
                            updated[
                              index
                            ]
                          );

                        }}
                        className="w-full h-[50px] rounded-2xl bg-white/5 border border-white/10 px-4 text-white outline-none text-[13px]"
                      />

                    ))}

                </div>

              </div>

            )
          )}

        </div>

        {/* COPYRIGHT */}
        <div className="mt-14">

          <textarea
            rows={3}
            value={
              section?.copyright_text || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                copyright_text:
                  e.target.value,
              })
            }
            className="w-full rounded-3xl bg-white/5 border border-white/10 p-5 text-white outline-none resize-none"
          />

        </div>

      </div>

    </section>

  );

}