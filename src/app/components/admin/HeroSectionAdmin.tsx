"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  getMainHero,
  updateMainHero,
} from "@/services/kadirheroService";

export default function HeroAdminSection() {
  const [hero, setHero] = useState<any>(null);

  const [editing, setEditing] =
    useState<string | null>(null);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    const fetchHero = async () => {
      const { data, error } =
        await getMainHero();

      if (error) return;

      if (data) {
        setHero(data);
      }
    };

    fetchHero();
  }, []);

  const handleSave = async () => {
    if (!hero) return;

    setSaving(true);

    await updateMainHero(hero);

    setSaving(false);
  };

  if (!hero) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading Hero...
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="/1.avif"
          className="w-full h-full object-cover scale-110"
        />

        <div className="absolute inset-0 bg-[#02182b]/70" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">

        {/* TOP TEXT */}
        {editing === "top_text" ? (
          <input
            value={hero?.top_text || ""}
            onChange={(e) =>
              setHero({
                ...hero,
                top_text: e.target.value,
              })
            }
            onBlur={() =>
              setEditing(null)
            }
            autoFocus
            className="mb-6 bg-black/40 px-4 py-2 rounded text-center text-cyan-300"
          />
        ) : (
          <p
            onClick={() =>
              setEditing(
                "top_text"
              )
            }
            className="mb-6 px-5 py-2 text-xs tracking-widest border border-cyan-300/40 rounded-full text-cyan-200 cursor-pointer"
          >
            {hero?.top_text}
          </p>
        )}

        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-bold max-w-4xl">

          {editing === "title" ? (
            <input
              value={
                hero?.title || ""
              }
              onChange={(e) =>
                setHero({
                  ...hero,
                  title:
                    e.target.value,
                })
              }
              onBlur={() =>
                setEditing(null)
              }
              autoFocus
              className="bg-black/40 px-3 rounded"
            />
          ) : (
            <span
              onClick={() =>
                setEditing(
                  "title"
                )
              }
              className="cursor-pointer"
            >
              {hero?.title}
            </span>
          )}

          {" "}

          {editing ===
          "subtitle" ? (
            <input
              value={
                hero?.subtitle ||
                ""
              }
              onChange={(e) =>
                setHero({
                  ...hero,
                  subtitle:
                    e.target.value,
                })
              }
              onBlur={() =>
                setEditing(null)
              }
              className="bg-black/40 px-3 rounded text-cyan-400"
            />
          ) : (
            <span
              onClick={() =>
                setEditing(
                  "subtitle"
                )
              }
              className="text-cyan-400 cursor-pointer"
            >
              {hero?.subtitle}
            </span>
          )}
        </h1>

        {/* DESCRIPTION */}
        {editing ===
        "description" ? (
          <textarea
            value={
              hero?.description ||
              ""
            }
            onChange={(e) =>
              setHero({
                ...hero,
                description:
                  e.target.value,
              })
            }
            onBlur={() =>
              setEditing(null)
            }
            className="mt-5 bg-black/40 p-3 rounded w-full max-w-2xl text-center"
          />
        ) : (
          <p
            onClick={() =>
              setEditing(
                "description"
              )
            }
            className="mt-5 text-white/70 max-w-2xl cursor-pointer"
          >
            {hero?.description}
          </p>
        )}

        {/* PRICE CARD */}
        <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-10 py-7">

          {/* OLD PRICE */}
          {editing ===
          "old_price" ? (
            <input
              type="number"
              value={
                hero?.old_price ||
                0
              }
              onChange={(e) =>
                setHero({
                  ...hero,
                  old_price:
                    Number(
                      e.target
                        .value
                    ),
                })
              }
              onBlur={() =>
                setEditing(null)
              }
              className="bg-black/40 text-white/40 text-center line-through rounded px-2"
            />
          ) : (
            <p
              onClick={() =>
                setEditing(
                  "old_price"
                )
              }
              className="text-sm text-white/40 line-through cursor-pointer"
            >
              AED{" "}
              {
                hero?.old_price
              }
            </p>
          )}

          {/* PRICE */}
          {editing ===
          "price" ? (
            <input
              type="number"
              value={
                hero?.price || 0
              }
              onChange={(e) =>
                setHero({
                  ...hero,
                  price: Number(
                    e.target
                      .value
                  ),
                })
              }
              onBlur={() =>
                setEditing(null)
              }
              className="bg-black/40 text-cyan-400 text-4xl text-center rounded px-2"
            />
          ) : (
            <p
              onClick={() =>
                setEditing(
                  "price"
                )
              }
              className="text-5xl font-bold cursor-pointer"
            >
              {hero?.price}

              <span className="text-cyan-400 text-xl ml-2">
                AED
              </span>
            </p>
          )}
        </div>

        {/* CTA */}
        {editing ===
        "cta_text" ? (
          <input
            value={
              hero?.cta_text ||
              ""
            }
            onChange={(e) =>
              setHero({
                ...hero,
                cta_text:
                  e.target.value,
              })
            }
            onBlur={() =>
              setEditing(null)
            }
            autoFocus
            className="mt-8 bg-black/40 px-4 py-2 rounded text-center"
          />
        ) : (
          <button
            onClick={() =>
              setEditing(
                "cta_text"
              )
            }
            className="mt-8 px-8 py-3 bg-cyan-400 text-black font-semibold rounded-lg"
          >
            {hero?.cta_text}
          </button>
        )}

        {/* SAVE BUTTON */}
        <motion.button
          whileTap={{
            scale: 0.95,
          }}
          onClick={handleSave}
          className="mt-8 px-7 py-3 bg-green-400 text-black rounded-xl font-semibold"
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </motion.button>

      </div>
    </section>
  );
}