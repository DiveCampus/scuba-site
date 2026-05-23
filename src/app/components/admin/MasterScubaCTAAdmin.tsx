// =========================================
// MasterScubaCTAAdmin.tsx
// ADMIN UI
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

  getMasterScubaCTA,

  updateMasterScubaCTA,

} from "@/services/MasterScubaCTAService";

export default function MasterScubaCTAAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [saving, setSaving] =
    useState(false);

  /* =========================================
     LOAD DATA
  ========================================= */

  useEffect(() => {

    const load =
      async () => {

        const {

          data,

        } = await getMasterScubaCTA();

        setSection(data);

      };

    load();

  }, []);

  if (!section)
    return null;

  /* =========================================
     SAVE
  ========================================= */

  const handleSave =
    async () => {

      try {

        setSaving(true);

        await updateMasterScubaCTA(

          section.id,

          section

        );

        alert(
          "CTA Updated"
        );

      } catch (err) {

        console.error(err);

      } finally {

        setSaving(false);

      }

    };

  return (

    <section className="min-h-screen bg-gradient-to-br from-[#081c2c] to-[#0d2f45] text-white py-20 px-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-16">

          <div>

            <p className="text-cyan-400 text-[10px] tracking-[4px] uppercase mb-3">

              ADMIN PANEL

            </p>

            <h2 className="text-4xl font-semibold">

              Master Scuba CTA

            </h2>

          </div>

          <button

            onClick={
              handleSave
            }

            className="h-[56px] px-8 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition flex items-center gap-3 font-semibold"

          >

            <Save size={18} />

            {

              saving
                ? "Saving..."
                : "Save Changes"

            }

          </button>

        </div>

        {/* FORM */}
        <div className="grid md:grid-cols-2 gap-7">

          {Object.keys(section).map(

            (key) => {

              if (

                key === "id" ||

                key === "created_at" ||

                key === "updated_at"

              ) {

                return null;

              }

              return (

                <div

                  key={key}

                  className="flex flex-col gap-3"

                >

                  <label className="text-sm uppercase tracking-[2px] text-white/60">

                    {key}

                  </label>

                  {key.includes(
                    "description"
                  ) ? (

                    <textarea

                      rows={5}

                      value={
                        section[key] || ""
                      }

                      onChange={(e) =>
                        setSection({

                          ...section,

                          [key]:
                            e.target.value,

                        })
                      }

                      className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 outline-none resize-none"

                    />

                  ) : (

                    <input

                      value={
                        section[key] || ""
                      }

                      onChange={(e) =>
                        setSection({

                          ...section,

                          [key]:
                            e.target.value,

                        })
                      }

                      className="h-[56px] rounded-2xl bg-white/5 border border-white/10 px-5 outline-none"

                    />

                  )}

                </div>

              );

            }

          )}

        </div>

      </div>

    </section>

  );

}