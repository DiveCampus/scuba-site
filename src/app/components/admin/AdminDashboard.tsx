"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

import { getHero, updateHero } from "@/services/heroService";
import CoursesPage from "./CoursesPage";
import { Gallery } from "./gallerypage";
import { PricingPage } from "./PricingPage";
import { FaqAdmin } from "./FaqAdmin";
import { FeaturedAdmin } from "./FeaturedAdmin";
import { TestimonialsAdmin } from "./TestimonialsAdmin";
import { WhyAdmin } from "./WhyAdmin";
import { FooterAdmin } from "./FooterAdmin";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [hero, setHero] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);

        // 🔐 CHECK USER
        const { data: { user } } = await supabase.auth.getUser();
        console.log("USER:", user);

        if (!user) {
          navigate("/admin");
          return;
        }

        // 🔎 CHECK ROLE
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        console.log("PROFILE:", profile, error);

        if (!profile || profile.role !== "admin") {
          navigate("/admin");
          return;
        }

        // 📦 FETCH HERO
        const { data } = await getHero();
        console.log("HERO:", data);

        setHero(data);

      } catch (err) {
        console.error("❌ DASHBOARD ERROR:", err);
      } finally {
        setLoading(false); // 🔥 IMPORTANT
      }
    };

    init();
  }, []);

  const handleSave = async () => {
    setSaving(true);

    const { error } = await updateHero(hero);

    if (error) alert("❌ Update failed");
    else alert("✅ Updated successfully");

    setSaving(false);
  };

  // 🔥 LOADING STATE
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  // 🔥 NO DATA STATE
  if (!hero) {
    return (
      <div className="text-white text-center mt-20">
        No hero data found
      </div>
    );
  }

  return (
    <div className="bg-[#020617] text-white min-h-screen">

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden font-habara">

        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#02182b]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0ea5e9]/20 via-transparent to-[#1e3a8a]/30" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 text-center px-6 max-w-5xl">

          {/* TOP TEXT */}
          {editingField === "top_text" ? (
            <input
              value={hero.top_text || ""}
              onChange={(e) => setHero({ ...hero, top_text: e.target.value })}
              onBlur={() => setEditingField(null)}
              autoFocus
              className="uppercase tracking-[6px] text-cyan-300 text-[12px] mb-5 bg-black/40 px-3 py-1 rounded text-center"
            />
          ) : (
            <p
              onClick={() => setEditingField("top_text")}
              className="uppercase tracking-[6px] text-cyan-300 text-[12px] mb-5 cursor-pointer"
            >
              {hero.top_text || "Dive Campus Diving Club"}
            </p>
          )}

          {/* TITLE */}
          <h1 className="text-white text-4xl md:text-6xl font-semibold">

            {editingField === "title" ? (
              <input
                value={hero.title}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
                onBlur={() => setEditingField(null)}
                className="bg-black/40 px-2 rounded"
              />
            ) : (
              <span onClick={() => setEditingField("title")} className="cursor-pointer">
                {hero.title}
              </span>
            )}

            {" "}

            {editingField === "subtitle" ? (
              <input
                value={hero.subtitle}
                onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                onBlur={() => setEditingField(null)}
                className="bg-black/40 px-2 rounded text-cyan-400"
              />
            ) : (
              <span
                onClick={() => setEditingField("subtitle")}
                className="text-cyan-400 cursor-pointer"
              >
                {hero.subtitle}
              </span>
            )}
          </h1>

          {/* DESCRIPTION */}
          {editingField === "description" ? (
            <textarea
              value={hero.description}
              onChange={(e) => setHero({ ...hero, description: e.target.value })}
              onBlur={() => setEditingField(null)}
              className="mt-6 bg-black/40 p-2 rounded w-full text-center"
            />
          ) : (
            <p
              onClick={() => setEditingField("description")}
              className="mt-6 text-white/85 cursor-pointer"
            >
              {hero.description}
            </p>
          )}

          {/* PRICE */}
          <div className="mt-6">

            {/* OLD PRICE */}
            {editingField === "old_price" ? (
              <input
                type="number"
                value={hero.old_price || ""}
                onChange={(e) =>
                  setHero({ ...hero, old_price: Number(e.target.value) })
                }
                onBlur={() => setEditingField(null)}
                className="bg-black/40 px-2 rounded text-white/50 line-through text-center"
                autoFocus
              />
            ) : (
              <p
                onClick={() => setEditingField("old_price")}
                className="text-white/50 line-through cursor-pointer"
              >
                AED {hero.old_price}
              </p>
            )}

            {/* NEW PRICE */}
            {editingField === "price" ? (
              <input
                type="number"
                value={hero.price || ""}
                onChange={(e) =>
                  setHero({ ...hero, price: Number(e.target.value) })
                }
                onBlur={() => setEditingField(null)}
                className="bg-black/40 px-2 rounded text-cyan-400 text-3xl text-center"
              />
            ) : (
              <p
                onClick={() => setEditingField("price")}
                className="text-3xl font-bold text-cyan-400 cursor-pointer"
              >
                AED {hero.price}
              </p>
            )}

          </div>          {/* CTA */}
          <div className="mt-10">
            <button
              onClick={() => setEditingField("cta_text")}
              className="px-10 py-4 bg-cyan-400 text-black rounded-full"
            >
              {hero.cta_text || "Get Certified →"}
            </button>
          </div>

          {/* SAVE */}
          <div className="mt-12">
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-green-400 text-black rounded-full"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* OTHER SECTIONS */}
          <CoursesPage />
          <FeaturedAdmin />
          <Gallery />
          <PricingPage />
          <TestimonialsAdmin />
          <WhyAdmin />
          <FaqAdmin />
          <FooterAdmin />

        </div>
      </section>
    </div>
  );
}