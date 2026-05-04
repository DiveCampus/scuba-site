"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Users, ShieldCheck, Award } from "lucide-react";
import {
  getWhyChoose,
  updateWhySection,
  updateWhyFeature,
} from "@/services/whyChooseService";

const iconMap: any = {
  Clock: <Clock className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
};

export default function WhyChooseAdmin() {
  const [section, setSection] = useState<any>(null);
  const [features, setFeatures] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { section, features } = await getWhyChoose();
      setSection(section);
      setFeatures(features || []);
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);

    await updateWhySection(section);
    await Promise.all(features.map(updateWhyFeature));

    setSaving(false);
    console.log("✅ Saved");
  };

  if (!section) return null;

  return (
    <section className="relative py-32 bg-[#02131d] text-white">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 px-6 items-center">

        {/* LEFT */}
        <div>

          {/* TAG */}
          {editing === "tag" ? (
            <input
              value={section.tag}
              onChange={(e) =>
                setSection({ ...section, tag: e.target.value })
              }
              onBlur={() => setEditing(null)}
              className="bg-black/40 px-2"
            />
          ) : (
            <p
              onClick={() => setEditing("tag")}
              className="text-cyan-400 tracking-[4px] text-[11px] mb-4 uppercase cursor-pointer"
            >
              {section.tag}
            </p>
          )}

          {/* TITLE */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">

            {editing === "title" ? (
              <input
                value={section.title}
                onChange={(e) =>
                  setSection({ ...section, title: e.target.value })
                }
                onBlur={() => setEditing(null)}
                className="bg-black/40 px-2"
              />
            ) : (
              <span onClick={() => setEditing("title")}>
                {section.title}
              </span>
            )}

            {" "}

            {editing === "highlight" ? (
              <input
                value={section.highlight}
                onChange={(e) =>
                  setSection({ ...section, highlight: e.target.value })
                }
                onBlur={() => setEditing(null)}
                className="bg-black/40 px-2 text-cyan-400"
              />
            ) : (
              <span
                onClick={() => setEditing("highlight")}
                className="text-cyan-400 cursor-pointer"
              >
                {section.highlight}
              </span>
            )}
          </h2>

          {/* DESCRIPTION */}
          {editing === "description" ? (
            <textarea
              value={section.description}
              onChange={(e) =>
                setSection({ ...section, description: e.target.value })
              }
              onBlur={() => setEditing(null)}
              className="bg-black/40 p-2 w-full"
            />
          ) : (
            <p
              onClick={() => setEditing("description")}
              className="text-white/60 mb-10 cursor-pointer"
            >
              {section.description}
            </p>
          )}

          {/* FEATURES */}
          <div className="space-y-8">
            {features.map((item, i) => (
              <motion.div
                key={item.id}
                className="flex gap-4 items-start"
              >

                {/* ICON */}
                <div className="w-12 h-12 flex items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400">
                  {iconMap[item.icon]}
                </div>

                {/* TEXT */}
                <div>

                  {/* TITLE */}
                  {editing === `title-${i}` ? (
                    <input
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...features];
                        updated[i].title = e.target.value;
                        setFeatures(updated);
                      }}
                      onBlur={() => setEditing(null)}
                      className="bg-black/40 px-2"
                    />
                  ) : (
                    <h3
                      onClick={() => setEditing(`title-${i}`)}
                      className="font-semibold cursor-pointer"
                    >
                      {item.title}
                    </h3>
                  )}

                  {/* DESC */}
                  {editing === `desc-${i}` ? (
                    <textarea
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...features];
                        updated[i].description = e.target.value;
                        setFeatures(updated);
                      }}
                      onBlur={() => setEditing(null)}
                      className="bg-black/40 p-2"
                    />
                  ) : (
                    <p
                      onClick={() => setEditing(`desc-${i}`)}
                      className="text-sm text-white/60 cursor-pointer"
                    >
                      {item.description}
                    </p>
                  )}

                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div>
          {editing === "image" ? (
            <input
              value={section.image_url}
              onChange={(e) =>
                setSection({ ...section, image_url: e.target.value })
              }
              onBlur={() => setEditing(null)}
              className="w-full bg-black/40 p-2"
            />
          ) : (
            <img
              src={section.image_url}
              onClick={() => setEditing("image")}
              className="rounded-2xl cursor-pointer"
            />
          )}
        </div>

      </div>

      {/* SAVE BUTTON */}
      <div className="text-center mt-10">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-cyan-400 text-black rounded-xl"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

    </section>
  );
}