"use client";

import {

  useEffect,
  useState,

} from "react";

import {

  motion,

} from "framer-motion";

import {

  Check,
  Save,

} from "lucide-react";

import {

  getExpertHands,
  updateExpertHandsSection,
  updateExpertHandsFeature,

} from "@/services/ExpertHandsService";

export default function
ExpertHandsAdmin() {

  const [

    section,
    setSection,

  ] = useState<any>(
    null
  );

  const [

    features,
    setFeatures,

  ] = useState<any[]>(
    []
  );

  const [

    saving,
    setSaving,

  ] = useState(
    false
  );

  /* =====================================
     LOAD
  ===================================== */

  useEffect(() => {

    load();

  }, []);

  const load =
    async () => {

      const { section, features } = await getExpertHands();

      setSection(
        section
      );

      setFeatures(
        features || []
      );

    };

  /* =====================================
     UPDATE FEATURE
  ===================================== */

  const updateFeature =
    (
      id: string,
      value: string
    ) => {

      setFeatures(
        prev =>
          prev.map(
            item =>
              item.id === id
                ? {

                    ...item,

                    feature:
                      value,

                  }
                : item
          )
      );

    };

  /* =====================================
     ADD FEATURE
  ===================================== */


  /* =====================================
     DELETE FEATURE
  ===================================== */


  /* =====================================
     SAVE
  ===================================== */

  const handleSave =
    async () => {

      try {

        setSaving(
          true
        );

        /* SECTION */
        await updateExpertHandsSection(

          section.id,

          section

        );

        /* FEATURES */
        for (
          const item
          of features
        ) {

          await updateExpertHandsFeature(

            item.id,

            item

          );

        }

        alert(
          "Saved Successfully ✅"
        );

      } catch (
        error
      ) {

        console.error(
          error
        );

      } finally {

        setSaving(
          false
        );

      }

    };

  if (
    !section
  )
    return null;

  return (

    <section
      className="py-24 bg-[#f5f8fb]"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      <div
        className="max-w-4xl mx-auto grid md:grid-cols-2 gap-14 items-center px-6"
      >

        {/* IMAGE SIDE */}
        <motion.div
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="relative w-fit"
        >

          {/* CORNER */}
          <div
            className="absolute -top-4 -left-4 w-16 h-16 border-l-[3px] border-t-[3px] border-cyan-400 rounded-tl-sm"
          />

          {/* IMAGE */}
          <div
            className="w-[320px] rounded-md overflow-hidden shadow-lg bg-white p-3"
          >

            <img
              src={
                section.image_url
              }
              className="w-full h-[205px] object-cover rounded-md"
            />

            <input
              value={
                section.image_url
              }
              onChange={e =>
                setSection({

                  ...section,

                  image_url:
                    e.target
                      .value,

                })
              }
              placeholder="
              Image URL
              "
              className="mt-4 w-full px-4 py-3 rounded-xl border outline-none text-sm"
            />

          </div>

        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
        >

          {/* BADGE */}
          <input
            value={
              section.badge
            }
            onChange={e =>
              setSection({

                ...section,

                badge:
                  e.target
                    .value,

              })
            }
            className="bg-transparent text-[10px] tracking-[3px] uppercase text-cyan-500 mb-4 outline-none w-full"
          />

          {/* TITLE */}
          <textarea
            value={
              section.title
            }
            onChange={e =>
              setSection({

                ...section,

                title:
                  e.target
                    .value,

              })
            }
            rows={2}
            className="text-[42px] leading-[1.05] tracking-[-1px] font-semibold text-[#0b1623] bg-transparent resize-none outline-none w-full"
          />

          {/* DESC 1 */}
          <textarea
            value={
              section.description_1
            }
            onChange={e =>
              setSection({

                ...section,

                description_1:
                  e.target
                    .value,

              })
            }
            rows={4}
            className="mt-6 text-[14px] leading-[1.9] text-[#7a8795] bg-transparent resize-none outline-none w-full"
          />

          {/* DESC 2 */}
          <textarea
            value={
              section.description_2
            }
            onChange={e =>
              setSection({

                ...section,

                description_2:
                  e.target
                    .value,

              })
            }
            rows={4}
            className="mt-4 text-[14px] leading-[1.9] text-[#7a8795] bg-transparent resize-none outline-none w-full"
          />

          {/* FEATURES */}
          <div
            className="mt-10 grid grid-cols-2 gap-y-6 gap-x-8"
          >

            {features.map(
              item => (

                <div
                  key={
                    item.id
                  }
                  className="flex items-start gap-3"
                >

                  {/* ICON */}
                  <div
                    className="w-5 h-5 rounded-full border border-cyan-400 flex items-center justify-center shrink-0 mt-[2px]"
                  >

                    <Check
                      size={10}
                      className="text-cyan-500"
                    />

                  </div>

                  <div
                    className="flex-1"
                  >

                    <input
                      value={
                        item.feature
                      }
                      onChange={e =>
                        updateFeature(

                          item.id,

                          e.target
                            .value
                        )
                      }
                      className="w-full bg-transparent text-[11px] tracking-[1px] font-semibold text-[#1b2735] outline-none"
                    />

                  </div>


                </div>
              )
            )}

          </div>


        </motion.div>

      </div>

      {/* SAVE */}
      <div
        className="flex justify-center mt-16"
      >

        <button
          onClick={
            handleSave
          }
          disabled={
            saving
          }
          className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-cyan-500 text-white hover:scale-[1.03] transition shadow-lg"
        >

          <Save
            size={18}
          />

          {saving

            ? "Saving..."

            : "Save Changes"}

        </button>

      </div>

    </section>
  );
}