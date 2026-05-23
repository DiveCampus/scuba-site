// =========================================
// LocationFooterAdmin.tsx
// PREMIUM ADMIN UI
// SAME UI/UX STYLE
// =========================================

"use client";

import {

  useEffect,

  useState,

} from "react";

import {

  Save,

} from "lucide-react";

import {

  getLocationFooter,

  updateLocationFooterSection,

  updateLocationFooterFeature,

  updateLocationFooterGroup,

  updateLocationFooterLink,

} from "@/services/LocationFooterService";

export default function LocationFooterAdmin() {

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

  const [

    saving,

    setSaving,

  ] = useState(false);

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

        setSection(
          section
        );

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
     SAVE SECTION
  ========================================= */

  const saveSection =
    async () => {

      try {

        setSaving(true);

        await updateLocationFooterSection(

          section.id,

          section

        );

        alert(
          "Section Updated"
        );

      } catch (err) {

        console.error(err);

      } finally {

        setSaving(false);

      }

    };

  /* =========================================
     SAVE FEATURE
  ========================================= */

  const saveFeature =
    async (
      item: any
    ) => {

      await updateLocationFooterFeature(

        item.id,

        item

      );

      alert(
        "Feature Updated"
      );

    };

  /* =========================================
     SAVE GROUP
  ========================================= */

  const saveGroup =
    async (
      item: any
    ) => {

      await updateLocationFooterGroup(

        item.id,

        item

      );

      alert(
        "Group Updated"
      );

    };

  /* =========================================
     SAVE LINK
  ========================================= */

  const saveLink =
    async (
      item: any
    ) => {

      await updateLocationFooterLink(

        item.id,

        item

      );

      alert(
        "Link Updated"
      );

    };

  return (

    <section className="min-h-screen bg-gradient-to-br from-[#02131d] to-[#031e2d] text-white py-20 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-14">

          <div>

            <p className="text-cyan-400 text-[10px] tracking-[4px] uppercase mb-3">

              ADMIN PANEL

            </p>

            <h2 className="text-4xl font-semibold">

              Location Footer

            </h2>

          </div>

          <button

            onClick={
              saveSection
            }

            className="h-[56px] px-8 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition flex items-center gap-3 font-semibold"

          >

            <Save
              size={18}
            />

            {

              saving
                ? "Saving..."
                : "Save Section"

            }

          </button>

        </div>

        {/* =========================================
           SECTION
        ========================================= */}

        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl mb-12">

          <h3 className="text-2xl mb-8 font-semibold">

            Section Content

          </h3>

          <div className="grid md:grid-cols-2 gap-6">

            {Object.keys(
              section
            ).map(
              (
                key
              ) => {

                if (

                  key === "id" ||

                  key ===
                    "created_at" ||

                  key ===
                    "updated_at"

                ) {

                  return null;

                }

                return (

                  <div
                    key={key}
                  >

                    <label className="text-sm text-white/60 mb-3 block uppercase tracking-[2px]">

                      {key}

                    </label>

                    {key.includes(
                      "description"
                    ) ? (

                      <textarea

                        rows={5}

                        value={
                          section[
                            key
                          ] || ""
                        }

                        onChange={(
                          e
                        ) =>
                          setSection({

                            ...section,

                            [key]:
                              e
                                .target
                                .value,

                          })
                        }

                        className="w-full rounded-2xl bg-white/10 border border-white/10 px-5 py-4 outline-none"

                      />

                    ) : (

                      <input

                        value={
                          section[
                            key
                          ] || ""
                        }

                        onChange={(
                          e
                        ) =>
                          setSection({

                            ...section,

                            [key]:
                              e
                                .target
                                .value,

                          })
                        }

                        className="w-full h-[56px] rounded-2xl bg-white/10 border border-white/10 px-5 outline-none"

                      />

                    )}

                  </div>

                );

              }
            )}

          </div>

        </div>

        {/* =========================================
           FEATURES
        ========================================= */}

        <div className="grid md:grid-cols-2 gap-6 mb-14">

          {features.map(
            (
              item,
              i
            ) => (

              <div

                key={
                  item.id
                }

                className="bg-white/5 border border-white/10 rounded-[30px] p-7"

              >

                <h4 className="text-lg mb-5 font-semibold">

                  Feature
                </h4>

                <input

                  value={
                    item.icon
                  }

                  onChange={(
                    e
                  ) => {

                    const updated =
                      [
                        ...features,
                      ];

                    updated[
                      i
                    ].icon =
                      e
                        .target
                        .value;

                    setFeatures(
                      updated
                    );

                  }}

                  placeholder="
                    Icon Name
                  "

                  className="w-full h-[56px] rounded-2xl bg-white/10 border border-white/10 px-5 mb-4"

                />

                <input

                  value={
                    item.title
                  }

                  onChange={(
                    e
                  ) => {

                    const updated =
                      [
                        ...features,
                      ];

                    updated[
                      i
                    ].title =
                      e
                        .target
                        .value;

                    setFeatures(
                      updated
                    );

                  }}

                  placeholder="
                    Title
                  "

                  className="w-full h-[56px] rounded-2xl bg-white/10 border border-white/10 px-5 mb-4"

                />

                <button

                  onClick={() =>
                    saveFeature(
                      item
                    )
                  }

                  className="w-full h-[52px] rounded-2xl bg-cyan-500 hover:bg-cyan-400"

                >

                  Save Feature

                </button>

              </div>

            )
          )}

        </div>

        {/* =========================================
           GROUPS + LINKS
        ========================================= */}

        {groups.map(
          (
            group
          ) => {

            const groupLinks =
              links.filter(

                (
                  item
                ) =>
                  item.group_id ===
                  group.id

              );

            return (

              <div

                key={
                  group.id
                }

                className="bg-white/5 border border-white/10 rounded-[32px] p-8 mb-10"

              >

                <div className="flex items-center justify-between mb-8">

                  <input

                    value={
                      group.title
                    }

                    onChange={(
                      e
                    ) => {

                      const updated =
                        [
                          ...groups,
                        ];

                      const index =
                        updated.findIndex(

                          (
                            g
                          ) =>
                            g.id ===
                            group.id

                        );

                      updated[
                        index
                      ].title =
                        e
                          .target
                          .value;

                      setGroups(
                        updated
                      );

                    }}

                    className="h-[56px] rounded-2xl bg-white/10 border border-white/10 px-5 text-xl font-semibold"

                  />

                  <button

                    onClick={() =>
                      saveGroup(
                        group
                      )
                    }

                    className="px-6 h-[50px] rounded-2xl bg-cyan-500"

                  >

                    Save Group

                  </button>

                </div>

                {/* LINKS */}
                <div className="grid md:grid-cols-2 gap-6">

                  {groupLinks.map(
                    (
                      link,
                      i
                    ) => (

                      <div

                        key={
                          link.id
                        }

                        className="bg-white/5 rounded-3xl border border-white/10 p-6"

                      >

                        <input

                          value={
                            link.label
                          }

                          onChange={(
                            e
                          ) => {

                            const updated =
                              [
                                ...links,
                              ];

                            const index =
                              updated.findIndex(

                                (
                                  l
                                ) =>
                                  l.id ===
                                  link.id

                              );

                            updated[
                              index
                            ].label =
                              e
                                .target
                                .value;

                            setLinks(
                              updated
                            );

                          }}

                          className="w-full h-[56px] rounded-2xl bg-white/10 border border-white/10 px-5 mb-4"

                        />

                        <input

                          value={
                            link.url
                          }

                          onChange={(
                            e
                          ) => {

                            const updated =
                              [
                                ...links,
                              ];

                            const index =
                              updated.findIndex(

                                (
                                  l
                                ) =>
                                  l.id ===
                                  link.id

                              );

                            updated[
                              index
                            ].url =
                              e
                                .target
                                .value;

                            setLinks(
                              updated
                            );

                          }}

                          className="w-full h-[56px] rounded-2xl bg-white/10 border border-white/10 px-5 mb-4"

                        />

                        <button

                          onClick={() =>
                            saveLink(
                              link
                            )
                          }

                          className="w-full h-[50px] rounded-2xl bg-cyan-500"

                        >

                          Save Link

                        </button>

                      </div>

                    )
                  )}

                </div>

              </div>

            );

          }
        )}

      </div>

    </section>

  );

}