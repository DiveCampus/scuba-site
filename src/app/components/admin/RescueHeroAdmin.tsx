// =========================================
// RescueHeroAdmin.tsx
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

  getRescueHero,

  updateRescueHero,

} from "@/services/RescueHeroService";

export default function RescueHeroAdmin() {

  const [data, setData] =
    useState<any>(null);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    const load =
      async () => {

        const {

          data,

        } =
          await getRescueHero();

        console.log(
          "ADMIN DATA =>",
          data
        );

        setData(data);

      };

    load();

  }, []);

  if (!data)
    return null;

  /* =========================================
     SAVE
  ========================================= */

  const handleSave =
    async () => {

      try {

        setSaving(true);

        await updateRescueHero(

          data.id,

          data

        );

        alert(
          "Updated Successfully"
        );

      } catch (err) {

        console.error(err);

      } finally {

        setSaving(false);

      }

    };

  return (

    <section className="
      min-h-screen
      bg-[#02131d]
      text-white
      py-20
      px-6
    ">

      <div className="
        max-w-6xl
        mx-auto
      ">

        {/* HEADER */}
        <div className="
          flex
          items-center
          justify-between
          mb-14
        ">

          <div>

            <p className="
              text-cyan-400
              tracking-[4px]
              text-[10px]
              mb-4
            ">

              ADMIN PANEL

            </p>

            <h2 className="
              text-4xl
              font-semibold
            ">

              Rescue Hero Section

            </h2>

          </div>

          <button

            onClick={
              handleSave
            }

            className="
              h-[56px]
              px-8
              rounded-2xl
              bg-cyan-500
              hover:bg-cyan-400
              transition
              flex
              items-center
              gap-3
              font-semibold
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

        {/* FORM */}
        <div className="
          grid
          md:grid-cols-2
          gap-6
        ">

          {Object.keys(data).map(

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
                  className="
                    flex
                    flex-col
                    gap-2
                  "
                >

                  <label className="
                    text-sm
                    text-white/60
                    uppercase
                    tracking-[2px]
                  ">

                    {key}

                  </label>

                  <input

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

                    className="
                      h-[56px]
                      rounded-2xl
                      bg-white/5
                      border
                      border-white/10
                      px-5
                      outline-none
                    "

                  />

                </div>

              );

            }

          )}

        </div>

      </div>

    </section>

  );

}