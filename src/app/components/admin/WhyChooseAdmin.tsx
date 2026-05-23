"use client";

import { useEffect, useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Clock,
  Users,
  ShieldCheck,
  Award,
  Save,
} from "lucide-react";

import {
  getWhyChoose,
  updateWhySection,
  updateWhyFeature,
} from "@/services/whyChooseService";

const iconMap: any = {
  Clock: (
    <Clock className="w-5 h-5" />
  ),

  Users: (
    <Users className="w-5 h-5" />
  ),

  ShieldCheck: (
    <ShieldCheck className="w-5 h-5" />
  ),

  Award: (
    <Award className="w-5 h-5" />
  ),
};

export default function WhyChooseAdmin() {
  const [section, setSection] =
    useState<any>(null);

  const [features, setFeatures] =
    useState<any[]>([]);

  const [editing, setEditing] =
    useState<string | null>(null);

  const [saving, setSaving] =
    useState(false);

  // ================= LOAD =================

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { section, features } = await getWhyChoose();

    setSection(section);

    setFeatures(features || []);
  };

  // ================= SAVE =================

  const handleSave = async () => {
    setSaving(true);

    await updateWhySection(
      section
    );

    await Promise.all(
      features.map(
        updateWhyFeature
      )
    );

    setSaving(false);
  };

  if (!section) return null;

  return (
    <>
      <section
        className="relative py-32 bg-[#02131d] text-white overflow-hidden"
      >

        {/* BG */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400/10 blur-[120px]" />

        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 blur-[120px]" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 px-6 items-center">

          {/* LEFT */}
          <div>

            {/* TAG */}
            {editing ===
            "tag" ? (
              <input
                autoFocus
                value={
                  section.tag
                }
                onChange={(e) =>
                  setSection({
                    ...section,
                    tag: e.target
                      .value,
                  })
                }
                onBlur={() =>
                  setEditing(null)
                }
                className="bg-white/10 border border-cyan-400/30 px-4 py-2 rounded-xl outline-none mb-4"
              />
            ) : (
              <p
                onClick={() =>
                  setEditing(
                    "tag"
                  )
                }
                className="text-cyan-400 tracking-[4px] text-[11px] mb-4 uppercase cursor-pointer"
              >
                {section.tag}
              </p>
            )}

            {/* TITLE */}
            <div className="mb-6">

              {editing ===
              "title" ? (
                <input
                  autoFocus
                  value={
                    section.title
                  }
                  onChange={(e) =>
                    setSection({
                      ...section,
                      title:
                        e.target
                          .value,
                    })
                  }
                  onBlur={() =>
                    setEditing(null)
                  }
                  className="w-full bg-white/10 border border-cyan-400/30 px-5 py-3 rounded-2xl text-5xl font-bold outline-none"
                />
              ) : (
                <h2
                  onClick={() =>
                    setEditing(
                      "title"
                    )
                  }
                  className="text-4xl md:text-5xl font-bold leading-tight cursor-pointer"
                >
                  {
                    section.title
                  }{" "}

                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                    {
                      section.highlight
                    }

                  </span>

                </h2>
              )}

            </div>

            {/* HIGHLIGHT */}
            {editing ===
            "highlight" ? (
              <input
                autoFocus
                value={
                  section.highlight
                }
                onChange={(e) =>
                  setSection({
                    ...section,
                    highlight:
                      e.target
                        .value,
                  })
                }
                onBlur={() =>
                  setEditing(null)
                }
                className="bg-white/10 border border-cyan-400/30 px-4 py-2 rounded-xl outline-none mb-6"
              />
            ) : null}

            {/* DESC */}
            {editing ===
            "description" ? (
              <textarea
                autoFocus
                value={
                  section.description
                }
                onChange={(e) =>
                  setSection({
                    ...section,
                    description:
                      e.target
                        .value,
                  })
                }
                onBlur={() =>
                  setEditing(null)
                }
                className="w-full bg-white/10 border border-cyan-400/30 p-4 rounded-2xl outline-none mb-10"
              />
            ) : (
              <p
                onClick={() =>
                  setEditing(
                    "description"
                  )
                }
                className="text-white/60 mb-10 max-w-lg leading-relaxed cursor-pointer"
              >
                {
                  section.description
                }
              </p>
            )}

            {/* FEATURES */}
            <div className="space-y-8">

              {features.map(
                (
                  item,
                  i
                ) => (
                  <motion.div
                    key={item.id}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    className="flex gap-4 items-start"
                  >

                    {/* ICON */}
                    <div
                      className="w-12 h-12 flex items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400"
                    >
                      {
                        iconMap[
                          item.icon
                        ]
                      }
                    </div>

                    {/* TEXT */}
                    <div className="flex-1">

                      {/* TITLE */}
                      {editing ===
                      `title-${i}` ? (
                        <input
                          autoFocus
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
                          onBlur={() =>
                            setEditing(
                              null
                            )
                          }
                          className="w-full bg-white/10 border border-cyan-400/30 px-4 py-2 rounded-xl outline-none"
                        />
                      ) : (
                        <h3
                          onClick={() =>
                            setEditing(
                              `title-${i}`
                            )
                          }
                          className="font-semibold mb-2 cursor-pointer"
                        >
                          {
                            item.title
                          }
                        </h3>
                      )}

                      {/* DESC */}
                      {editing ===
                      `desc-${i}` ? (
                        <textarea
                          autoFocus
                          value={
                            item.description
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
                            ].description =
                              e
                                .target
                                .value;

                            setFeatures(
                              updated
                            );
                          }}
                          onBlur={() =>
                            setEditing(
                              null
                            )
                          }
                          className="w-full bg-white/10 border border-cyan-400/30 p-4 rounded-xl outline-none"
                        />
                      ) : (
                        <p
                          onClick={() =>
                            setEditing(
                              `desc-${i}`
                            )
                          }
                          className="text-sm text-white/60 leading-relaxed cursor-pointer"
                        >
                          {
                            item.description
                          }
                        </p>
                      )}

                    </div>

                  </motion.div>
                )
              )}

            </div>

          </div>

          {/* IMAGE */}
          <div>

            {editing ===
            "image" ? (
              <input
                autoFocus
                value={
                  section.image_url
                }
                onChange={(e) =>
                  setSection({
                    ...section,
                    image_url:
                      e.target
                        .value,
                  })
                }
                onBlur={() =>
                  setEditing(null)
                }
                className="w-full bg-white/10 border border-cyan-400/30 p-4 rounded-2xl outline-none mb-4"
              />
            ) : null}

            <motion.img
              whileHover={{
                scale: 1.02,
              }}
              src={
                section.image_url
              }
              onClick={() =>
                setEditing(
                  "image"
                )
              }
              className="rounded-3xl cursor-pointer shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
            />

          </div>

        </div>

        {/* SAVE */}
        <div className="fixed bottom-8 right-8 z-50">

          <button
            onClick={handleSave}
            className="flex items-center gap-3 px-8 py-4 bg-cyan-400 text-black rounded-2xl font-semibold shadow-[0_0_40px_rgba(34,211,238,0.35)]"
          >

            <Save className="w-5 h-5" />

            {saving
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>

      </section>
    </>
  );
}