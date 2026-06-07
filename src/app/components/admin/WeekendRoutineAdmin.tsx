"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getWeekendRoutine,
  updateWeekendRoutineSection,
  updateWeekendRoutineImage,
  updateWeekendRoutineGiftCard,
  createWeekendRoutineImage,
  deleteWeekendRoutineImage,
  reorderWeekendRoutineImage,
} from "@/services/WeekendRoutineService";

export default function WeekendRoutineAdmin() {
  const [section, setSection] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [giftCard, setGiftCard] = useState<any>(null);

  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  /* ========================= LOAD ========================= */
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { section, images, giftCard } = await getWeekendRoutine();
    setSection(section);
    setImages(images || []);
    setGiftCard(giftCard);
  };

  /* ========================= FIELD HELPERS ========================= */
  const setSectionField = (field: string, value: string) =>
    setSection((p: any) => ({ ...p, [field]: value }));

  const setGiftField = (field: string, value: string) =>
    setGiftCard((p: any) => ({ ...p, [field]: value }));

  const setImageField = (id: string, field: string, value: string) =>
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, [field]: value } : img))
    );

  const isActive = (img: any) => img.is_active !== false;

  /* ========================= IMAGE CRUD (immediate) ========================= */
  const handleAddImage = async () => {
    setBusy(true);
    setStatus(null);
    const { data, error } = await createWeekendRoutineImage({
      image_url: "",
      image_alt: "",
      sort_order: images.length + 1,
      is_active: true,
    });
    if (error) {
      console.error(error);
      setStatus("Could not add image.");
    } else if (data) {
      setImages((prev) => [...prev, data]);
    }
    setBusy(false);
  };

  const handleDeleteImage = async (id: string) => {
    if (!window.confirm("Delete this image?")) return;
    setBusy(true);
    setStatus(null);
    const { error } = await deleteWeekendRoutineImage(id);
    if (error) {
      console.error(error);
      setStatus("Could not delete image.");
    } else {
      setImages((prev) => prev.filter((img) => img.id !== id));
    }
    setBusy(false);
  };

  const handleToggleActive = async (img: any) => {
    const next = !isActive(img);
    setImages((prev) =>
      prev.map((i) => (i.id === img.id ? { ...i, is_active: next } : i))
    );
    const { error } = await updateWeekendRoutineImage(img.id, {
      is_active: next,
    });
    if (error) {
      console.error(error);
      setStatus("Toggle failed — does `is_active` column exist?");
    }
  };

  const handleMove = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= images.length) return;

    const next = [...images];
    [next[index], next[target]] = [next[target], next[index]];
    setImages(next);

    setBusy(true);
    const { error } = await reorderWeekendRoutineImage(next);
    if (error) {
      console.error(error);
      setStatus("Reorder failed.");
    }
    setBusy(false);
  };

  /* ========================= SAVE (batched text edits) ========================= */
  const handleSave = async () => {
    try {
      setSaving(true);
      setStatus(null);

      if (section) {
        await updateWeekendRoutineSection(section.id, {
          title: section.title,
          highlighted_title: section.highlighted_title,
          description: section.description,
          cta_button: section.cta_button,
          cta_link: section.cta_link,
        });
      }

      for (const image of images) {
        await updateWeekendRoutineImage(image.id, {
          image_url: image.image_url,
          image_alt: image.image_alt,
        });
      }

      if (giftCard) {
        await updateWeekendRoutineGiftCard(giftCard.id, {
          emoji: giftCard.emoji,
          title: giftCard.title,
          description: giftCard.description,
          notice: giftCard.notice,
          button_text: giftCard.button_text,
          button_link: giftCard.button_link,
        });
      }

      setStatus("Saved Successfully ✅");
    } catch (err) {
      console.error(err);
      setStatus("Save failed.");
    } finally {
      setSaving(false);
    }
  };

  if (!section || !giftCard) return null;

  return (
    <section
      className="relative overflow-hidden py-24 bg-[#071c2d]"
      style={{ fontFamily: "Harabara, sans-serif" }}
    >
      {/* BG */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[40%] h-[500px] bg-cyan-500/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[30%] h-[400px] bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ====================== HEADER / SECTION ====================== */}
        <div className="text-center">
          {/* TITLE */}
          <textarea
            value={section.title || ""}
            onChange={(e) => setSectionField("title", e.target.value)}
            rows={2}
            placeholder="Title"
            className="bg-transparent text-center text-white text-3xl md:text-5xl font-semibold resize-none outline-none w-full"
          />

          {/* HIGHLIGHT */}
          <input
            value={section.highlighted_title || ""}
            onChange={(e) =>
              setSectionField("highlighted_title", e.target.value)
            }
            placeholder="Highlighted title"
            className="mt-3 bg-transparent text-cyan-400 text-center text-2xl outline-none w-full"
          />

          {/* DESCRIPTION */}
          <textarea
            value={section.description || ""}
            onChange={(e) => setSectionField("description", e.target.value)}
            rows={3}
            placeholder="Description"
            className="mt-5 bg-transparent text-white/50 text-center resize-none outline-none w-full max-w-3xl mx-auto block"
          />

          {/* CTA BUTTON TEXT */}
          <input
            value={section.cta_button || ""}
            onChange={(e) => setSectionField("cta_button", e.target.value)}
            placeholder="CTA Button Text"
            className="mt-6 bg-white/10 border border-white/10 rounded-full text-cyan-300 text-center px-6 py-3 outline-none w-full max-w-xs mx-auto block"
          />

          {/* CTA LINK */}
          <input
            value={section.cta_link || ""}
            onChange={(e) => setSectionField("cta_link", e.target.value)}
            placeholder="CTA Link (https://…)"
            className="mt-3 bg-white/10 border border-white/10 rounded-full text-white/70 text-center px-6 py-3 outline-none w-full max-w-md mx-auto block text-sm"
          />
        </div>

        {/* ====================== IMAGES ====================== */}
        <div className="mt-16 flex items-center justify-between">
          <h3 className="text-white/80 text-lg font-semibold tracking-[1px]">
            Images ({images.length})
          </h3>
          <button
            onClick={handleAddImage}
            disabled={busy}
            className="px-5 py-2 rounded-xl bg-cyan-400 text-[#02131d] text-sm font-semibold disabled:opacity-40"
          >
            + Add Image
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-5">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              whileHover={{ y: -5 }}
              className={`rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-3 ${
                isActive(image) ? "" : "opacity-50"
              }`}
            >
              {/* LIVE PREVIEW */}
              {image.image_url ? (
                <img
                  src={image.image_url}
                  alt={image.image_alt || ""}
                  className="h-[220px] w-full object-cover rounded-xl mb-3"
                />
              ) : (
                <div className="h-[220px] w-full rounded-xl mb-3 flex items-center justify-center bg-white/5 text-white/30 text-xs text-center px-2">
                  Paste an image URL below
                </div>
              )}

              {/* IMAGE URL */}
              <input
                value={image.image_url || ""}
                onChange={(e) =>
                  setImageField(image.id, "image_url", e.target.value)
                }
                placeholder="Image URL (.webp / .avif)"
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
              />

              {/* ALT TEXT */}
              <input
                value={image.image_alt || ""}
                onChange={(e) =>
                  setImageField(image.id, "image_alt", e.target.value)
                }
                placeholder="Alt text (SEO)"
                className="mt-2 w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-xs text-white/70 outline-none"
              />

              {/* CONTROLS */}
              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="flex gap-1">
                  <button
                    onClick={() => handleMove(index, -1)}
                    disabled={busy || index === 0}
                    title="Move left"
                    className="px-2 py-1 rounded-lg bg-white/10 text-white text-xs disabled:opacity-30"
                  >
                    ◀
                  </button>
                  <button
                    onClick={() => handleMove(index, 1)}
                    disabled={busy || index === images.length - 1}
                    title="Move right"
                    className="px-2 py-1 rounded-lg bg-white/10 text-white text-xs disabled:opacity-30"
                  >
                    ▶
                  </button>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => handleToggleActive(image)}
                    title="Toggle active"
                    className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      isActive(image)
                        ? "bg-lime-400/20 text-lime-300"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    {isActive(image) ? "Active" : "Hidden"}
                  </button>
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    disabled={busy}
                    title="Delete"
                    className="px-2 py-1 rounded-lg bg-red-500/80 text-white text-xs disabled:opacity-40"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ====================== GIFT CARD ====================== */}
        <div className="mt-20 max-w-[500px] mx-auto">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center">
            <input
              value={giftCard.emoji || ""}
              onChange={(e) => setGiftField("emoji", e.target.value)}
              placeholder="🎁"
              className="bg-transparent text-4xl text-center w-full outline-none mb-5"
            />

            <textarea
              value={giftCard.title || ""}
              onChange={(e) => setGiftField("title", e.target.value)}
              rows={2}
              placeholder="Gift card title"
              className="bg-transparent text-white text-[22px] font-semibold text-center resize-none outline-none w-full"
            />

            <textarea
              value={giftCard.description || ""}
              onChange={(e) => setGiftField("description", e.target.value)}
              rows={4}
              placeholder="Gift card description"
              className="mt-4 bg-transparent text-white/50 text-center resize-none outline-none w-full"
            />

            <textarea
              value={giftCard.notice || ""}
              onChange={(e) => setGiftField("notice", e.target.value)}
              rows={2}
              placeholder="Notice"
              className="mt-7 bg-lime-400/10 border border-lime-400/30 rounded-full text-lime-300 text-center px-5 py-3 resize-none outline-none w-full"
            />

            {/* GIFT BUTTON TEXT */}
            <input
              value={giftCard.button_text || ""}
              onChange={(e) => setGiftField("button_text", e.target.value)}
              placeholder="Gift Button Text (optional)"
              className="mt-6 bg-white/10 border border-white/10 rounded-full text-cyan-300 text-center px-6 py-3 outline-none w-full"
            />

            {/* GIFT BUTTON LINK */}
            <input
              value={giftCard.button_link || ""}
              onChange={(e) => setGiftField("button_link", e.target.value)}
              placeholder="Gift Button Link (https://…)"
              className="mt-3 bg-white/10 border border-white/10 rounded-full text-white/70 text-center px-6 py-3 outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* STATUS */}
        {status && (
          <p className="text-center mt-8 text-sm text-cyan-300">{status}</p>
        )}

        {/* SAVE */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-[#02131d] font-semibold tracking-[1px] disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </section>
  );
}
