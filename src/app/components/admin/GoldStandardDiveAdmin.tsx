"use client";

import {

  useEffect,

  useState,

} from "react";

import {

  Save,

} from "lucide-react";

import {

  getGoldStandardDive,

  updateGoldStandardDiveSection,

  updateGoldStandardDiveTag,

  updateGoldStandardDiveImage,

} from "@/services/goldStandardDiveService";

/* =========================================
   ADMIN PANEL
========================================= */

export default function GoldStandardDiveAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [tags, setTags] =
    useState<any[]>([]);

  const [images, setImages] =
    useState<any[]>([]);

  const [saving, setSaving] =
    useState(false);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const load =
      async () => {

        const {

          section,

          tags,

          images,

        } = await getGoldStandardDive();

        setSection(section);

        setTags(tags || []);

        setImages(images || []);

      };

    load();

  }, []);

  /* =========================================
     SAVE SECTION
  ========================================= */

  const handleSave =
    async () => {

      if (!section?.id)
        return;

      setSaving(true);

      await updateGoldStandardDiveSection(
        section.id,
        section
      );

      setSaving(false);

    };

  if (!section)
    return null;

  return (

    <section className="py-24 bg-[#f5f7fa] min-h-screen">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-14">

          <div>

            <p className="text-[10px] tracking-[4px] text-cyan-500 mb-3">

              ADMIN PANEL

            </p>

            <h2 className="text-4xl font-bold text-[#0a0e27]">

              Gold Standard Section

            </h2>

          </div>

          <button
            onClick={handleSave}
            className="h-[56px] px-8 rounded-2xl bg-cyan-500 text-white font-semibold flex items-center gap-3"
          >

            <Save size={18} />

            {
              saving
                ? "Saving..."
                : "Save Changes"
            }

          </button>

        </div>

        {/* SECTION FORM */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">

          <input
            type="text"
            value={section.badge}
            onChange={(e) =>
              setSection({
                ...section,
                badge:
                  e.target.value,
              })
            }
            placeholder="Badge"
            className="h-[58px] rounded-2xl border border-gray-200 bg-white px-5 outline-none"
          />

          <input
            type="text"
            value={section.highlight}
            onChange={(e) =>
              setSection({
                ...section,
                highlight:
                  e.target.value,
              })
            }
            placeholder="Highlight"
            className="h-[58px] rounded-2xl border border-cyan-200 bg-cyan-50 px-5 outline-none text-cyan-600"
          />

          <textarea
            rows={3}
            value={section.title}
            onChange={(e) =>
              setSection({
                ...section,
                title:
                  e.target.value,
              })
            }
            placeholder="Title"
            className="rounded-2xl border border-gray-200 bg-white p-5 outline-none resize-none"
          />

          <textarea
            rows={3}
            value={
              section.description
            }
            onChange={(e) =>
              setSection({
                ...section,
                description:
                  e.target.value,
              })
            }
            placeholder="Description"
            className="rounded-2xl border border-gray-200 bg-white p-5 outline-none resize-none"
          />

          <textarea
            rows={2}
            value={
              section.card_title
            }
            onChange={(e) =>
              setSection({
                ...section,
                card_title:
                  e.target.value,
              })
            }
            placeholder="Card Title"
            className="rounded-2xl border border-gray-200 bg-white p-5 outline-none resize-none"
          />

          <textarea
            rows={4}
            value={
              section.card_description
            }
            onChange={(e) =>
              setSection({
                ...section,
                card_description:
                  e.target.value,
              })
            }
            placeholder="Card Description"
            className="rounded-2xl border border-gray-200 bg-white p-5 outline-none resize-none"
          />

        </div>

        {/* TAGS */}
        <div className="mb-16">

          <h3 className="text-2xl font-semibold text-[#0a0e27] mb-6">

            Tags

          </h3>

          <div className="grid md:grid-cols-3 gap-6">

            {tags.map((tag, i) => (

              <div
                key={tag.id}
                className="bg-white border border-gray-200 rounded-3xl p-5"
              >

                <input
                  type="text"
                  value={tag.icon}
                  onChange={async (e) => {

                    const updated =
                      [...tags];

                    updated[i].icon =
                      e.target.value;

                    setTags(updated);

                    await updateGoldStandardDiveTag(
                      tag.id,
                      updated[i]
                    );

                  }}
                  placeholder="Shield"
                  className="w-full h-[50px] rounded-2xl border border-gray-200 px-4 outline-none mb-4"
                />

                <textarea
                  rows={2}
                  value={tag.text}
                  onChange={async (e) => {

                    const updated =
                      [...tags];

                    updated[i].text =
                      e.target.value;

                    setTags(updated);

                    await updateGoldStandardDiveTag(
                      tag.id,
                      updated[i]
                    );

                  }}
                  className="w-full rounded-2xl border border-gray-200 p-4 outline-none resize-none"
                />

              </div>

            ))}

          </div>

        </div>

        {/* IMAGES */}
        <div>

          <h3 className="text-2xl font-semibold text-[#0a0e27] mb-6">

            Images

          </h3>

          <div className="grid md:grid-cols-3 gap-6">

            {images.map((img, i) => (

              <div
                key={img.id}
                className="bg-white border border-gray-200 rounded-3xl overflow-hidden"
              >

                <img
                  src={img.image_url}
                  className="w-full h-[220px] object-cover"
                />

                <div className="p-5">

                  <input
                    type="text"
                    value={
                      img.image_url
                    }
                    onChange={async (e) => {

                      const updated =
                        [...images];

                      updated[
                        i
                      ].image_url =
                        e.target.value;

                      setImages(updated);

                      await updateGoldStandardDiveImage(
                        img.id,
                        updated[i]
                      );

                    }}
                    className="w-full h-[52px] rounded-2xl border border-gray-200 px-4 outline-none"
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>

  );

}