"use client";

import { getFeatured, updateFeatured } from "@/services/FeatureService";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type FeaturedForm = {
  title: string;
  subtitle: string;
};

const EMPTY: FeaturedForm = { title: "", subtitle: "" };

export function FeaturedAdmin() {
  const [id, setId] = useState<string | null>(null);
  const [form, setForm] = useState<FeaturedForm>(EMPTY);
  const [original, setOriginal] = useState<FeaturedForm>(EMPTY);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<null | "saved" | "error">(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    setStatus(null);

    const { data, error } = await getFeatured();

    if (error) {
      console.error("❌ FEATURED LOAD ERROR:", error);
      setStatus("error");
      setLoading(false);
      return;
    }

    const next: FeaturedForm = {
      title: data?.title ?? "",
      subtitle: data?.subtitle ?? "",
    };

    setId(data?.id ?? null);
    setForm(next);
    setOriginal(next);
    setLoading(false);
  };

  const handleChange = (field: keyof FeaturedForm, value: string) => {
    setStatus(null);
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setStatus(null);
    setForm(original);
  };

  const handleSave = async () => {
    if (!id) return;

    setSaving(true);
    setStatus(null);

    // Send only the editable fields. Textarea values preserve "\n",
    // so multiline content persists to the DB unchanged.
    const { error } = await updateFeatured(id, {
      title: form.title,
      subtitle: form.subtitle,
    });

    if (error) {
      console.error("❌ FEATURED UPDATE ERROR:", error);
      setStatus("error");
    } else {
      setOriginal(form);
      setStatus("saved");
    }

    setSaving(false);
  };

  const isDirty =
    form.title !== original.title || form.subtitle !== original.subtitle;

  if (loading) {
    return (
      <div className="text-white/60 text-center py-16">Loading…</div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-6">

      {/* HEADER */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-white">Featured Section</h3>
        <p className="text-sm text-white/50">
          Press <span className="text-white/70">Enter</span> to add a new line.
          Line breaks are saved and rendered on the site.
        </p>
      </div>

      {/* TITLE */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/70">
          Title
        </label>
        <textarea
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          rows={2}
          placeholder={"LET’S MAKE YOUR EVENT\nOR PROJECT EXTRAORDINARY"}
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-cyan-400/60 whitespace-pre-line resize-y"
        />
      </div>

      {/* SUBTITLE */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/70">
          Subtitle
        </label>
        <textarea
          value={form.subtitle}
          onChange={(e) => handleChange("subtitle", e.target.value)}
          rows={2}
          placeholder={"SPECIAL PROJECTS"}
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-cyan-400/60 whitespace-pre-line resize-y"
        />
      </div>

      {/* STATUS */}
      {status === "saved" && (
        <p className="text-sm text-emerald-400">✓ Saved</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Please try again.
        </p>
      )}

      {/* ACTIONS */}
      <div className="flex items-center gap-3 pt-2">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleSave}
          disabled={saving || !isDirty || !id}
          className="h-[44px] px-6 rounded-2xl bg-cyan-400 text-black text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? "Saving…" : "Save"}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleReset}
          disabled={saving || !isDirty}
          className="h-[44px] px-6 rounded-2xl bg-white/5 text-white border border-white/10 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10"
        >
          Cancel
        </motion.button>
      </div>
    </div>
  );
}
