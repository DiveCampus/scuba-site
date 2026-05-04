"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { getHero, updateHero } from "@/services/heroService";
import { useNavigate } from "react-router-dom";

import CoursesPage from "./CoursesPage";
import { Gallery } from "./gallerypage";
import { PricingPage } from "./PricingPage";
import { FaqAdmin } from "./FaqAdmin";
import { FeaturedAdmin } from "./FeaturedAdmin";
import { TestimonialsAdmin } from "./TestimonialsAdmin";
import { WhyAdmin } from "./WhyAdmin";
import { FooterAdmin } from "./FooterAdmin";
import HeroSectionAdmin from "./HeroSectionAdmin";
import FeaturesAdmin from "./FeaturesAdmin";

export default function AdminDashboard() {
  const [hero, setHero] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/admin");
        return;
      }
      const { data } = await getHero();
      setHero(data);
      setLoading(false);
    };
    init();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await updateHero(hero);
    const { data } = await getHero();
    setHero(data);
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!hero) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No data
      </div>
    );
  }

  return (
    <div className="bg-[#020617] text-white min-h-screen px-4 py-6">

      <div className="
        w-full
        max-w-md
        sm:max-w-xl
        md:max-w-3xl
        lg:max-w-5xl
        xl:max-w-6xl
        mx-auto
        space-y-10
      ">

        <div className="flex justify-end">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="h-[44px] px-5 rounded-2xl bg-red-500 text-white text-sm font-medium"
          >
            Logout
          </motion.button>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            rounded-2xl 
            p-5 
            sm:p-6 
            md:p-8 
            bg-white/5 
            backdrop-blur 
            shadow-lg 
            text-center
          "
        >

          {editingField === "top_text" ? (
            <input
              value={hero.top_text || ""}
              onChange={(e) => setHero({ ...hero, top_text: e.target.value })}
              onBlur={() => setEditingField(null)}
              autoFocus
              className="w-full text-[11px] tracking-widest uppercase text-cyan-300 bg-transparent outline-none text-center"
            />
          ) : (
            <p
              onClick={() => setEditingField("top_text")}
              className="text-[11px] tracking-widest uppercase text-cyan-300 cursor-pointer"
            >
              {hero.top_text || "Click to edit"}
            </p>
          )}

          <h1 className="
            mt-3 
            text-2xl 
            sm:text-3xl 
            md:text-4xl 
            font-semibold 
            leading-tight
          ">
            {editingField === "title" ? (
              <input
                value={hero.title || ""}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
                onBlur={() => setEditingField(null)}
                className="w-full bg-transparent outline-none text-center"
              />
            ) : (
              <span onClick={() => setEditingField("title")} className="cursor-pointer">
                {hero.title || "Click to edit"}
              </span>
            )}
            {" "}
            {editingField === "subtitle" ? (
              <input
                value={hero.subtitle || ""}
                onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                onBlur={() => setEditingField(null)}
                className="w-full bg-transparent outline-none text-cyan-400 text-center"
              />
            ) : (
              <span
                onClick={() => setEditingField("subtitle")}
                className="text-cyan-400 cursor-pointer"
              >
                {hero.subtitle || ""}
              </span>
            )}
          </h1>

          <div className="mt-4 text-sm sm:text-base md:text-lg text-white/80">
            {editingField === "description" ? (
              <textarea
                value={hero.description || ""}
                onChange={(e) =>
                  setHero({ ...hero, description: e.target.value })
                }
                onBlur={() => setEditingField(null)}
                autoFocus
                className="w-full bg-transparent outline-none text-center"
              />
            ) : (
              <p
                onClick={() => setEditingField("description")}
                className="cursor-pointer w-full"
              >
                {hero.description || "Click to edit description"}
              </p>
            )}
          </div>

          <div className="mt-6 space-y-1">

            {editingField === "old_price" ? (
              <input
                type="number"
                value={hero.old_price || ""}
                onChange={(e) =>
                  setHero({ ...hero, old_price: Number(e.target.value) })
                }
                onBlur={() => setEditingField(null)}
                autoFocus
                className="w-full text-center bg-transparent outline-none text-white/50 line-through"
              />
            ) : (
              <p
                onClick={() => setEditingField("old_price")}
                className="text-white/50 line-through text-sm sm:text-base cursor-pointer"
              >
                AED {hero.old_price || 0}
              </p>
            )}

            {editingField === "price" ? (
              <input
                type="number"
                value={hero.price || ""}
                onChange={(e) =>
                  setHero({ ...hero, price: Number(e.target.value) })
                }
                onBlur={() => setEditingField(null)}
                className="w-full text-center bg-transparent outline-none text-cyan-400 text-xl sm:text-2xl md:text-3xl font-bold"
              />
            ) : (
              <p
                onClick={() => setEditingField("price")}
                className="text-cyan-400 text-xl sm:text-2xl md:text-3xl font-bold cursor-pointer"
              >
                AED {hero.price || 0}
              </p>
            )}

          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="mt-6 w-full h-[48px] sm:h-[52px] rounded-2xl bg-cyan-400 text-black font-medium"
          >
            {hero.cta_text || "Get Started"}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="mt-4 w-full h-[48px] sm:h-[52px] rounded-2xl bg-green-400 text-black font-medium"
          >
            {saving ? "Saving..." : "Save Changes"}
          </motion.button>

        </motion.section>

        <div className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-8
        ">
          <CoursesPage />
          <FeaturedAdmin />
          <Gallery />
          <PricingPage />
          <TestimonialsAdmin />
          <WhyAdmin />
          <FaqAdmin />
          <FooterAdmin />
          <HeroSectionAdmin />
          <FeaturesAdmin />
        </div>

      </div>
    </div>
  );
}