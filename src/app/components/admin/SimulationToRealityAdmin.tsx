// =========================================
// SimulationRealityAdmin.tsx
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

  getSimulationReality,

  updateSimulationRealitySection,

  updateSimulationRealityFeature,

} from "@/services/SimulationRealityService";

export default function SimulationRealityAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [features, setFeatures] =
    useState<any[]>([]);

  const [saving, setSaving] =
    useState(false);

  /* =========================================
     LOAD DATA
  ========================================= */

  useEffect(() => {

    const load =
      async () => {

        const { section, features } = await getSimulationReality();

        setSection(section);

        setFeatures(
          features || []
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

        await updateSimulationRealitySection(

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
      feature: any
    ) => {

      try {

        await updateSimulationRealityFeature(

          feature.id,

          feature

        );

        alert(
          "Feature Updated"
        );

      } catch (err) {

        console.error(err);

      }

    };

  return (

    <section className="min-h-screen bg-[#f4f7fb] py-20 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-16">

          <div>

            <p className="text-cyan-500 text-[10px] tracking-[4px] uppercase mb-3">

              ADMIN PANEL

            </p>

            <h2 className="text-4xl font-semibold text-[#0a0e27]">

              Simulation To Reality

            </h2>

          </div>

          <button

            onClick={
              saveSection
            }

            className="h-[56px] px-8 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition text-white flex items-center gap-3 font-semibold"

          >

            <Save size={18} />

            {

              saving
                ? "Saving..."
                : "Save Section"

            }

          </button>

        </div>

        {/* SECTION FORM */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">

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

                  className="flex flex-col gap-2"

                >

                  <label className="text-sm uppercase tracking-[2px] text-gray-500">

                    {key}

                  </label>

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

                    className="h-[56px] rounded-2xl border border-gray-200 bg-white px-5 outline-none"

                  />

                </div>

              );

            }

          )}

        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-2 gap-8">

          {features.map(

            (
              feature,
              i
            ) => (

              <div

                key={feature.id}

                className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm"

              >

                {/* TITLE */}
                <input

                  value={
                    feature.title || ""
                  }

                  onChange={(e) => {

                    const updated =
                      [...features];

                    updated[i].title =
                      e.target.value;

                    setFeatures(updated);

                  }}

                  placeholder="Feature Title"

                  className="w-full h-[52px] rounded-2xl border border-gray-200 px-5 outline-none mb-5"

                />

                {/* DESCRIPTION */}
                <textarea

                  value={
                    feature.description || ""
                  }

                  onChange={(e) => {

                    const updated =
                      [...features];

                    updated[
                      i
                    ].description =
                      e.target.value;

                    setFeatures(updated);

                  }}

                  placeholder="Feature Description"

                  rows={5}

                  className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none mb-5 resize-none"

                />

                {/* BUTTON */}
                <button

                  onClick={() =>
                    saveFeature(
                      feature
                    )
                  }

                  className="w-full h-[52px] rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition text-white font-semibold"

                >

                  Update Feature

                </button>

              </div>

            )

          )}

        </div>

      </div>

    </section>

  );

}