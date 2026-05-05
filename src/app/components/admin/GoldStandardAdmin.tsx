"use client";

import { useEffect, useState } from "react";
import { Shield, Star, Award } from "lucide-react";
import {
  getGoldStandard,
  updateGoldSection,
  updateGoldTag,
  updateGoldImage,
} from "@/services/goldStandardService";

const iconMap: any = {
  Star: <Star size={14} />,
  Award: <Award size={14} />,
  Shield: <Shield size={14} />,
};

export default function GoldStandardAdmin() {
  const [section, setSection] = useState<any>(null);
  const [tags, setTags] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { section, tags, images } = await getGoldStandard();
      setSection(section);
      setTags(tags);
      setImages(images);
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);

    await updateGoldSection(section);
    await Promise.all(tags.map(updateGoldTag));
    await Promise.all(images.map(updateGoldImage));

    setSaving(false);
    console.log("✅ Saved");
  };

  if (!section) return null;

  const getImage = (pos: string) =>
    images.find((img) => img.position === pos);

  return (
    <section className="py-32 bg-gradient-to-b from-[#f5f7fa] to-[#eef2f6]">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 px-6 items-center">

        {/* LEFT */}
        <div>

          {/* BADGE */}
          {editing === "badge" ? (
            <input
              value={section.badge}
              onChange={(e) =>
                setSection({ ...section, badge: e.target.value })
              }
              onBlur={() => setEditing(null)}
              className="bg-black/10 px-2 py-1 rounded"
            />
          ) : (
            <div
              onClick={() => setEditing("badge")}
              className="inline-block px-4 py-2 text-[11px] tracking-[3px] rounded-full border border-cyan-400/30 text-cyan-500 mb-6 cursor-pointer"
            >
              {section.badge}
            </div>
          )}

          {/* TITLE */}
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a0e27] mb-6">

            {editing === "title" ? (
              <input
                value={section.title}
                onChange={(e) =>
                  setSection({ ...section, title: e.target.value })
                }
                onBlur={() => setEditing(null)}
                className="bg-black/10 px-2"
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
                className="bg-black/10 px-2 text-cyan-400"
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

          {/* DESC */}
          {editing === "description" ? (
            <textarea
              value={section.description}
              onChange={(e) =>
                setSection({ ...section, description: e.target.value })
              }
              onBlur={() => setEditing(null)}
              className="bg-black/10 p-2 w-full"
            />
          ) : (
            <p
              onClick={() => setEditing("description")}
              className="text-gray-500 mb-10 cursor-pointer"
            >
              {section.description}
            </p>
          )}

          {/* CARD */}
          <div className="relative p-6 rounded-2xl border border-yellow-300/40 bg-gradient-to-br from-[#fffdf7] to-[#fff7d6]">

            <div className="absolute -top-5 left-6 bg-white p-2 rounded-full">
              <Shield className="text-yellow-500 w-5 h-5" />
            </div>

            {/* CARD TITLE */}
            {editing === "card_title" ? (
              <input
                value={section.card_title}
                onChange={(e) =>
                  setSection({ ...section, card_title: e.target.value })
                }
                onBlur={() => setEditing(null)}
                className="bg-black/10 px-2 w-full"
              />
            ) : (
              <h3
                onClick={() => setEditing("card_title")}
                className="font-semibold mb-3 mt-3 cursor-pointer"
              >
                {section.card_title}
              </h3>
            )}

            {/* CARD DESC */}
            {editing === "card_desc" ? (
              <textarea
                value={section.card_description}
                onChange={(e) =>
                  setSection({
                    ...section,
                    card_description: e.target.value,
                  })
                }
                onBlur={() => setEditing(null)}
                className="bg-black/10 p-2 w-full"
              />
            ) : (
              <p
                onClick={() => setEditing("card_desc")}
                className="text-sm text-gray-600 cursor-pointer"
              >
                {section.card_description}
              </p>
            )}

            {/* TAGS */}
            <div className="flex flex-wrap gap-3 mt-6">
              {tags.map((tag, i) => (
                <div
                  key={tag.id}
                  className="px-4 py-2 text-xs flex items-center gap-2 border border-yellow-400/50 bg-yellow-50 text-yellow-600"
                >
                  {iconMap[tag.icon]}

                  {editing === `tag-${i}` ? (
                    <input
                      value={tag.text}
                      onChange={(e) => {
                        const updated = [...tags];
                        updated[i].text = e.target.value;
                        setTags(updated);
                      }}
                      onBlur={() => setEditing(null)}
                      className="bg-transparent outline-none"
                    />
                  ) : (
                    <span onClick={() => setEditing(`tag-${i}`)}>
                      {tag.text}
                    </span>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* RIGHT IMAGES */}
        <div className="grid grid-cols-2 gap-6">

          {["big", "small1", "small2"].map((pos, i) => {
            const img = getImage(pos);
            return (
              <div key={pos} className={i === 0 ? "row-span-2" : ""}>
                {editing === pos ? (
                  <input
                    value={img?.image_url}
                    onChange={(e) => {
                      const updated = images.map((im) =>
                        im.position === pos
                          ? { ...im, image_url: e.target.value }
                          : im
                      );
                      setImages(updated);
                    }}
                    onBlur={() => setEditing(null)}
                    className="w-full bg-black/10 p-2"
                  />
                ) : (
                  <img
                    src={img?.image_url}
                    onClick={() => setEditing(pos)}
                    className="rounded-2xl cursor-pointer"
                  />
                )}
              </div>
            );
          })}

        </div>

      </div>

      {/* SAVE */}
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