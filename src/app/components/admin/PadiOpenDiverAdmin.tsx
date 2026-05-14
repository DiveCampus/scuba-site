"use client";

import { motion } from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

import {
  Save,
} from "lucide-react";

import {
  getPadiOpenDiver,
  updatePadiOpenDiver,
} from "@/services/PadiOpenService";

export default function PadiOpenDiverAdmin() {

  const [data, setData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    const fetchData =
      async () => {

        const {
          data,
        } =
          await getPadiOpenDiver();

        setData(data);

        setLoading(false);
      };

    fetchData();

  }, []);

  const handleSave =
    async () => {

      if (!data?.id) return;

      setSaving(true);

      await updatePadiOpenDiver(
        data.id,
        data
      );

      setSaving(false);
    };

  if (loading) {
    return (
      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#02182b]
        text-white
      ">
        Loading...
      </div>
    );
  }

  return (
    <>
      <section className="
        relative
        min-h-screen
        overflow-hidden
        text-white
      ">

        {/* BG */}
        <div className="absolute inset-0">

          <img
            src={
              data?.background_image
            }
            className="
              w-full
              h-full
              object-cover
            "
          />

          <div className="
            absolute
            inset-0
            bg-[#02182b]/80
          " />

        </div>

        {/* GLOW */}
        <div className="
          absolute
          top-0
          right-0
          w-[500px]
          h-[500px]
          bg-cyan-400/20
          blur-[180px]
          rounded-full
        " />

        {/* SAVE BUTTON */}
        <div className="
          fixed
          top-6
          right-6
          z-50
        ">

          <button
            onClick={
              handleSave
            }
            className="
              px-7
              py-4
              rounded-2xl
              bg-cyan-400
              text-black
              font-bold
              shadow-[0_20px_60px_rgba(0,180,255,0.35)]
              hover:scale-105
              transition
              flex
              items-center
              gap-3
            "
          >

            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save"}

          </button>

        </div>

        {/* CONTENT */}
        <div className="
          relative
          z-10
          min-h-screen
          flex
          flex-col
          items-center
          justify-center
          text-center
          px-6
        ">

          {/* BADGE */}
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              px-6
              py-2
              rounded-full
              border
              border-cyan-400/30
              text-cyan-300
              text-xs
              tracking-[4px]
              uppercase
              mb-6
              backdrop-blur-xl
              bg-white/5
            "
          >

            <input
              value={
                data?.top_badge || ""
              }
              onChange={(e) =>
                setData({
                  ...data,
                  top_badge:
                    e.target.value,
                })
              }
              className="
                bg-transparent
                outline-none
                text-center
                w-full
              "
            />

          </motion.div>

          {/* SUBTEXT */}
          <input
            value={
              data?.sub_text || ""
            }
            onChange={(e) =>
              setData({
                ...data,
                sub_text:
                  e.target.value,
              })
            }
            className="
              bg-transparent
              outline-none
              text-white/60
              tracking-[4px]
              text-xs
              uppercase
              mb-4
              text-center
              w-full
              max-w-xl
            "
          />

          {/* TITLE */}
          <div className="
            max-w-5xl
            space-y-4
          ">

            <textarea
              rows={2}
              value={
                data?.title || ""
              }
              onChange={(e) =>
                setData({
                  ...data,
                  title:
                    e.target.value,
                })
              }
              className="
                w-full
                bg-transparent
                outline-none
                text-5xl
                md:text-7xl
                font-bold
                text-center
                resize-none
                overflow-hidden
              "
            />

            <textarea
              rows={2}
              value={
                data?.highlighted_text || ""
              }
              onChange={(e) =>
                setData({
                  ...data,
                  highlighted_text:
                    e.target.value,
                })
              }
              className="
                w-full
                bg-transparent
                outline-none
                text-5xl
                md:text-7xl
                font-bold
                text-center
                resize-none
                overflow-hidden
                bg-gradient-to-r
                from-cyan-300
                to-blue-500
                bg-clip-text
                text-transparent
              "
            />

          </div>

          {/* DESCRIPTION */}
          <textarea
            rows={4}
            value={
              data?.description || ""
            }
            onChange={(e) =>
              setData({
                ...data,
                description:
                  e.target.value,
              })
            }
            className="
              mt-6
              bg-transparent
              outline-none
              text-white/70
              max-w-2xl
              text-lg
              leading-relaxed
              resize-none
              text-center
              w-full
            "
          />

          {/* PRICE CARD */}
          <div className="
            mt-10
            px-10
            py-7
            rounded-[30px]
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            shadow-[0_20px_80px_rgba(0,0,0,0.4)]
            w-full
            max-w-md
          ">

            <input
              value={
                data?.old_price || ""
              }
              onChange={(e) =>
                setData({
                  ...data,
                  old_price:
                    e.target.value,
                })
              }
              className="
                bg-transparent
                outline-none
                text-white/40
                line-through
                text-sm
                text-center
                w-full
              "
            />

            <div className="
              mt-3
              flex
              items-center
              justify-center
              gap-2
            ">

              <span className="
                text-cyan-400
                text-xl
              ">
                AED
              </span>

              <input
                value={
                  data?.new_price || ""
                }
                onChange={(e) =>
                  setData({
                    ...data,
                    new_price:
                      e.target.value,
                  })
                }
                className="
                  bg-transparent
                  outline-none
                  text-5xl
                  font-bold
                  text-center
                  w-[180px]
                "
              />

            </div>

            <input
              value={
                data?.price_note || ""
              }
              onChange={(e) =>
                setData({
                  ...data,
                  price_note:
                    e.target.value,
                })
              }
              className="
                mt-3
                bg-transparent
                outline-none
                text-white/60
                text-sm
                text-center
                w-full
              "
            />

          </div>

          {/* BUTTONS */}
          <div className="
            mt-10
            flex
            gap-5
            flex-wrap
            justify-center
          ">

            <input
              value={
                data?.primary_button || ""
              }
              onChange={(e) =>
                setData({
                  ...data,
                  primary_button:
                    e.target.value,
                })
              }
              className="
                px-8
                py-4
                rounded-2xl
                bg-cyan-400
                text-black
                font-bold
                text-center
                outline-none
              "
            />

            <input
              value={
                data?.secondary_button || ""
              }
              onChange={(e) =>
                setData({
                  ...data,
                  secondary_button:
                    e.target.value,
                })
              }
              className="
                px-8
                py-4
                rounded-2xl
                border
                border-white/20
                bg-white/5
                text-white
                text-center
                outline-none
              "
            />

          </div>

          {/* FEATURES */}
          <div className="
            mt-14
            grid
            md:grid-cols-4
            gap-4
            max-w-6xl
            w-full
          ">

            {[
              "feature_1",
              "feature_2",
              "feature_3",
              "feature_4",
            ].map(
              (
                key,
                i
              ) => (
                <div
                  key={i}
                  className="
                    px-6
                    py-5
                    rounded-2xl
                    bg-white/5
                    border
                    border-white/10
                    backdrop-blur-xl
                  "
                >

                  <input
                    value={
                      data?.[
                        key
                      ] || ""
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        [key]:
                          e.target.value,
                      })
                    }
                    className="
                      bg-transparent
                      outline-none
                      text-white/80
                      text-center
                      w-full
                    "
                  />

                </div>
              )
            )}

          </div>

          {/* IMAGE URL */}
          <div className="
            mt-14
            w-full
            max-w-3xl
          ">

            <input
              value={
                data?.background_image || ""
              }
              onChange={(e) =>
                setData({
                  ...data,
                  background_image:
                    e.target.value,
                })
              }
              placeholder="Background Image URL"
              className="
                w-full
                h-[60px]
                rounded-2xl
                bg-white/10
                backdrop-blur-xl
                border
                border-white/10
                px-6
                text-white
                outline-none
              "
            />

          </div>

        </div>

      </section>

      {/* FONT */}
      <style jsx global>{`
        @font-face {
          font-family: 'Harabara';
          src: url('/fonts/Harabara.woff')
            format('woff');
        }
      `}</style>
    </>
  );
}