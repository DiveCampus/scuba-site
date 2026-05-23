"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Save,
} from "lucide-react";

import {
  getFooter,
  updateFooterSection,
  updateFooterLink,
  updateFooterSocial,
  updateFooterApp,
} from "@/services/footService";

export default function FooterAdmin() {
  const [section, setSection] =
    useState<any>(null);

  const [links, setLinks] =
    useState<any[]>([]);

  const [socials, setSocials] =
    useState<any[]>([]);

  const [apps, setApps] =
    useState<any[]>([]);

  const [saving, setSaving] =
    useState(false);

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

  const handleSave =
    async () => {
      setSaving(true);

      await updateFooterSection(
        section
      );

      await Promise.all(
        links.map(
          updateFooterLink
        )
      );

      await Promise.all(
        socials.map(
          updateFooterSocial
        )
      );

      await Promise.all(
        apps.map(
          updateFooterApp
        )
      );

      setSaving(false);
    };

  if (!section)
    return null;

  return (
    <section className="min-h-screen py-24 bg-[#f4f7fb]">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-16">

          <h1 className="text-5xl font-bold text-black mb-3">

            Footer CMS

          </h1>

          <p className="text-black/60 text-lg">

            Manage footer section, links, apps and socials.

          </p>

        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            {/* SECTION */}
            <div className="bg-white rounded-[30px] border border-gray-200 p-8 shadow-sm">

              <h2 className="text-2xl font-bold text-black mb-8">

                Footer Section

              </h2>

              <div className="space-y-5">

                <div>
                  <label className="block mb-2 text-sm font-medium text-black">

                    Whatsapp Text

                  </label>

                  <input
                    value={
                      section.whatsapp_text
                    }
                    onChange={(e) =>
                      setSection({
                        ...section,
                        whatsapp_text:
                          e.target
                            .value,
                      })
                    }
                    className="w-full px-5 py-4 rounded-2xl border border-gray-300 text-black placeholder:text-gray-500 outline-none focus:border-cyan-400"
                    placeholder="Whatsapp Text"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-black">

                    Subscribe Placeholder

                  </label>

                  <input
                    value={
                      section.subscribe_placeholder
                    }
                    onChange={(e) =>
                      setSection({
                        ...section,
                        subscribe_placeholder:
                          e.target
                            .value,
                      })
                    }
                    className="w-full px-5 py-4 rounded-2xl border border-gray-300 text-black placeholder:text-gray-500 outline-none focus:border-cyan-400"
                    placeholder="Subscribe Placeholder"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-black">

                    Copyright

                  </label>

                  <input
                    value={
                      section.copyright
                    }
                    onChange={(e) =>
                      setSection({
                        ...section,
                        copyright:
                          e.target
                            .value,
                      })
                    }
                    className="w-full px-5 py-4 rounded-2xl border border-gray-300 text-black placeholder:text-gray-500 outline-none focus:border-cyan-400"
                    placeholder="Copyright"
                  />
                </div>

              </div>

            </div>

            {/* APPS */}
            <div className="bg-white rounded-[30px] border border-gray-200 p-8 shadow-sm">

              <h2 className="text-2xl font-bold text-black mb-8">

                Footer Apps

              </h2>

              <div className="space-y-6">

                {apps.map(
                  (
                    app,
                    i
                  ) => (
                    <div
                      key={app.id}
                      className="p-5 rounded-2xl border border-gray-200 bg-gray-50"
                    >

                      <div className="space-y-4">

                        <input
                          value={
                            app.name
                          }
                          onChange={(
                            e
                          ) => {
                            const updated =
                              [
                                ...apps,
                              ];

                            updated[
                              i
                            ].name =
                              e.target.value;

                            setApps(
                              updated
                            );
                          }}
                          className="w-full px-5 py-4 rounded-2xl border border-gray-300 text-black"
                          placeholder="App Name"
                        />

                        <input
                          value={
                            app.link
                          }
                          onChange={(
                            e
                          ) => {
                            const updated =
                              [
                                ...apps,
                              ];

                            updated[
                              i
                            ].link =
                              e.target.value;

                            setApps(
                              updated
                            );
                          }}
                          className="w-full px-5 py-4 rounded-2xl border border-gray-300 text-black"
                          placeholder="App Link"
                        />

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">

            {/* LINKS */}
            <div className="bg-white rounded-[30px] border border-gray-200 p-8 shadow-sm">

              <h2 className="text-2xl font-bold text-black mb-8">

                Footer Links

              </h2>

              <div className="space-y-5">

                {links.map(
                  (
                    item,
                    i
                  ) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-2 gap-4"
                    >

                      <input
                        value={
                          item.label
                        }
                        onChange={(
                          e
                        ) => {
                          const updated =
                            [
                              ...links,
                            ];

                          updated[
                            i
                          ].label =
                            e.target.value;

                          setLinks(
                            updated
                          );
                        }}
                        className="px-5 py-4 rounded-2xl border border-gray-300 text-black"
                        placeholder="Label"
                      />

                      <input
                        value={
                          item.category
                        }
                        onChange={(
                          e
                        ) => {
                          const updated =
                            [
                              ...links,
                            ];

                          updated[
                            i
                          ].category =
                            e.target.value;

                          setLinks(
                            updated
                          );
                        }}
                        className="px-5 py-4 rounded-2xl border border-gray-300 text-black"
                        placeholder="Category"
                      />

                    </div>
                  )
                )}

              </div>

            </div>

            {/* SOCIALS */}
            <div className="bg-white rounded-[30px] border border-gray-200 p-8 shadow-sm">

              <h2 className="text-2xl font-bold text-black mb-8">

                Social Links

              </h2>

              <div className="space-y-5">

                {socials.map(
                  (
                    item,
                    i
                  ) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-2 gap-4"
                    >

                      <input
                        value={
                          item.platform
                        }
                        onChange={(
                          e
                        ) => {
                          const updated =
                            [
                              ...socials,
                            ];

                          updated[
                            i
                          ].platform =
                            e.target.value;

                          setSocials(
                            updated
                          );
                        }}
                        className="px-5 py-4 rounded-2xl border border-gray-300 text-black"
                        placeholder="Platform"
                      />

                      <input
                        value={
                          item.url
                        }
                        onChange={(
                          e
                        ) => {
                          const updated =
                            [
                              ...socials,
                            ];

                          updated[
                            i
                          ].url =
                            e.target.value;

                          setSocials(
                            updated
                          );
                        }}
                        className="px-5 py-4 rounded-2xl border border-gray-300 text-black"
                        placeholder="URL"
                      />

                    </div>
                  )
                )}

              </div>

            </div>

          </div>

        </div>

        {/* SAVE BUTTON */}
        <div className="fixed bottom-8 right-8 z-50">

          <button
            onClick={
              handleSave
            }
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 transition text-black font-bold shadow-2xl"
          >

            <Save className="w-5 h-5" />

            {saving
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>

      </div>

    </section>
  );
}