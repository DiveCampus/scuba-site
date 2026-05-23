"use client";

import {

  useEffect,
  useState,

} from "react";

import {

  motion,

} from "framer-motion";

import {

  ShieldCheck,
  Save,

} from "lucide-react";

import {

  getLegacyOfTrust,
  updateLegacyOfTrust,

} from "@/services/LegacyOfTrustService";

export default function
LegacyOfTrustAdmin() {

  const [

    section,
    setSection,

  ] = useState<any>(
    null
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

      const {

        section,

      } = await getLegacyOfTrust();

      setSection(
        section
      );

    };

  /* =====================================
     SAVE
  ===================================== */

  const handleSave =
    async () => {

      try {

        setSaving(
          true
        );

        await updateLegacyOfTrust(

          section.id,

          section

        );

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
      className="relative py-24 overflow-hidden bg-[#071c2d]"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* BG GLOW */}
      <div
        className="absolute inset-0"
      >

        <div
          className="absolute top-0 left-0 w-[40%] h-[400px] bg-cyan-500/10 blur-[120px]"
        />

        <div
          className="absolute bottom-0 right-0 w-[30%] h-[300px] bg-blue-500/10 blur-[100px]"
        />

      </div>

      {/* CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative z-10 max-w-[570px] mx-auto px-6"
      >

        <div
          className="relative rounded-3xl border border-cyan-400/30 bg-cyan-500/[0.03] backdrop-blur-xl px-10 py-14 shadow-[0_10px_50px_rgba(0,200,255,0.08)]"
        >

          {/* ICON */}
          <div
            className="absolute -top-6 left-1/2 -translate-x-1/2"
          >

            <div
              className="w-12 h-12 rounded-2xl border border-cyan-400/40 bg-[#071c2d] flex items-center justify-center shadow-lg"
            >

              <ShieldCheck
                size={22}
                className="text-cyan-400"
              />

            </div>

          </div>

          {/* TOP LINES */}
          <div
            className="absolute top-0 left-0 w-full flex items-center justify-center gap-3"
          >

            <div
              className="h-px w-20 bg-cyan-400/20"
            />

            <div
              className="h-px w-20 bg-cyan-400/20"
            />

          </div>

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
            className="mt-2 w-full bg-transparent text-center text-[10px] tracking-[4px] uppercase text-cyan-400 outline-none"
          />

          {/* TITLE */}
          <div
            className="mt-5 text-center"
          >

            <input
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
              className="bg-transparent text-center text-[42px] leading-[1] tracking-[-1px] font-semibold text-white outline-none w-full"
            />

            <input
              value={
                section.highlight_word
              }
              onChange={e =>
                setSection({

                  ...section,

                  highlight_word:
                    e.target
                      .value,

                })
              }
              className="mt-2 bg-transparent text-center text-[42px] font-bold text-cyan-300 outline-none w-full"
            />

          </div>

          {/* DESCRIPTION */}
          <textarea
            value={
              section.description
            }
            onChange={e =>
              setSection({

                ...section,

                description:
                  e.target
                    .value,

              })
            }
            rows={4}
            className="mt-8 w-full bg-transparent text-center text-[15px] leading-[1.9] text-white/55 resize-none outline-none"
          />

          {/* PARAGRAPH */}
          <textarea
            value={
              section.paragraph
            }
            onChange={e =>
              setSection({

                ...section,

                paragraph:
                  e.target
                    .value,

              })
            }
            rows={8}
            className="mt-8 w-full bg-transparent text-center text-[14px] leading-[2] text-white/50 resize-none outline-none"
          />

        </div>

      </motion.div>

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