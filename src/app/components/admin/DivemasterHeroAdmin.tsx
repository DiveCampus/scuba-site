"use client";

import {

  useEffect,

  useState,

} from "react";

import {

  Save,

} from "lucide-react";

import {

  getDivemasterHero,

  updateDivemasterHero,

} from "@/services/DivemasterHeroService";

/* =========================================
   ADMIN
========================================= */

export default function DivemasterHeroAdmin() {

  const [data, setData] =
    useState<any>(null);

  const [saving, setSaving] =
    useState(false);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const fetchData =
      async () => {

        const response = await getDivemasterHero();

        setData(response.data);

      };

    fetchData();

  }, []);

  /* =========================================
     SAVE
  ========================================= */

  const handleSave =
    async () => {

      if (!data?.id)
        return;

      setSaving(true);

      await updateDivemasterHero(
        data.id,
        data
      );

      setSaving(false);

    };

  if (!data)
    return null;

  return (

    <section className="relative min-h-screen bg-[#02131d] text-white py-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* TOP */}
        <div className="flex items-center justify-between mb-16 flex-wrap gap-5">

          <div>

            <p className="text-cyan-400 tracking-[4px] text-[10px] mb-3">

              ADMIN PANEL

            </p>

            <h2 className="text-4xl font-bold">

              Divemaster Hero

            </h2>

          </div>

          <button
            onClick={handleSave}
            className="h-[56px] px-7 rounded-2xl bg-cyan-400 text-black font-semibold flex items-center gap-3"
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
        <div className="grid md:grid-cols-2 gap-6">

          {Object.keys(data)

            .filter(
              (key) =>

                key !== "id" &&
                key !== "created_at" &&
                key !== "updated_at"
            )

            .map((key) => (

              <div
                key={key}
                className="flex flex-col gap-3"
              >

                <label className="text-sm text-cyan-300 uppercase tracking-[2px]">

                  {key}

                </label>

                <textarea
                  rows={3}
                  value={
                    data[key] || ""
                  }
                  onChange={(e) =>
                    setData({
                      ...data,
                      [key]:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-3xl bg-white/5 border border-white/10 p-5 outline-none resize-none text-white"
                />

              </div>

            ))}

        </div>

      </div>

    </section>

  );

}