"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

import { getHero, updateHero } from "@/services/heroService";
import CoursesPage from "./CoursesPage";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [hero, setHero] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🔥 EDIT STATES (SAFE UX)
  const [editingField, setEditingField] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
    fetchHero();
  }, []);

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) navigate("/admin");
  };

  const fetchHero = async () => {
    const { data } = await getHero();
    setHero(data);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);

    const { error } = await updateHero(hero);

    if (error) alert("❌ Update failed");
    else alert("✅ Updated successfully");

    setSaving(false);
  };

  if (loading || !hero) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <><>  </>
    <div className="bg-[#020617] text-white min-h-screen">

      {/* 🔥 HERO VISUAL EDITOR */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden font-habara">

        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0">

          {/* BASE LIGHT OVERLAY */}
          <div className="absolute inset-0 bg-[#02182b]/50" />

          {/* GRADIENT (LIGHTER) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0ea5e9]/20 via-transparent to-[#1e3a8a]/30" />

          {/* GLOW EFFECTS */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full" />

        </div>

        {/* CONTENT */}
        <div className="relative z-10 text-center px-6 max-w-5xl">

          {/* 🔥 TOP TEXT (FIXED) */}
          {editingField === "top_text" ? (
            <input
              value={hero.top_text || ""}
              onChange={(e) => setHero({ ...hero, top_text: e.target.value })}
              onBlur={() => setEditingField(null)}
              autoFocus
              className="uppercase tracking-[6px] text-cyan-300 text-[12px] mb-5 bg-black/40 px-3 py-1 rounded text-center" />
          ) : (
            <p
              onClick={() => setEditingField("top_text")}
              className="uppercase tracking-[6px] text-cyan-300 text-[12px] mb-5 cursor-pointer"
            >
              {hero.top_text || "Dive Campus Diving Club"}
            </p>
          )}

          {/* 🔥 TITLE */}
          <h1 className="text-white text-4xl md:text-6xl font-semibold leading-tight">

            {/* TITLE */}
            {editingField === "title" ? (
              <input
                value={hero.title}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
                onBlur={() => setEditingField(null)}
                autoFocus
                className="bg-black/40 px-2 rounded" />
            ) : (
              <span
                onClick={() => setEditingField("title")}
                className="cursor-pointer"
              >
                {hero.title}
              </span>
            )}

            {" "}

            {/* SUBTITLE */}
            {editingField === "subtitle" ? (
              <input
                value={hero.subtitle}
                onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                onBlur={() => setEditingField(null)}
                autoFocus
                className="bg-black/40 px-2 rounded text-cyan-400" />
            ) : (
              <span
                onClick={() => setEditingField("subtitle")}
                className="text-cyan-400 cursor-pointer"
              >
                {hero.subtitle}
              </span>
            )}
          </h1>

          {/* 🔥 DESCRIPTION */}
          {editingField === "description" ? (
            <textarea
              value={hero.description}
              onChange={(e) => setHero({ ...hero, description: e.target.value })}
              onBlur={() => setEditingField(null)}
              autoFocus
              className="mt-6 bg-black/40 p-2 rounded w-full text-center" />
          ) : (
            <p
              onClick={() => setEditingField("description")}
              className="mt-6 text-white/85 max-w-3xl mx-auto cursor-pointer"
            >
              {hero.description}
            </p>
          )}

          {/* 🔥 PRICE */}
          <div className="mt-6">

            {/* OLD PRICE */}
            {editingField === "old_price" ? (
              <input
                type="number"
                value={hero.old_price}
                onChange={(e) => setHero({ ...hero, old_price: Number(e.target.value) })}
                onBlur={() => setEditingField(null)}
                autoFocus
                className="bg-black/40 px-2 rounded" />
            ) : (
              <p
                onClick={() => setEditingField("old_price")}
                className="text-white/50 line-through cursor-pointer"
              >
                AED {hero.old_price}
              </p>
            )}

            {/* PRICE */}
            {editingField === "price" ? (
              <input
                type="number"
                value={hero.price}
                onChange={(e) => setHero({ ...hero, price: Number(e.target.value) })}
                onBlur={() => setEditingField(null)}
                autoFocus
                className="bg-black/40 px-2 rounded text-cyan-400" />
            ) : (
              <p
                onClick={() => setEditingField("price")}
                className="text-3xl font-bold text-cyan-400 cursor-pointer"
              >
                AED {hero.price}
              </p>
            )}
          </div>

          {/* 🔥 CTA BUTTON (NOW DYNAMIC) */}
          <div className="mt-10">
            {editingField === "cta_text" ? (
              <input
                value={hero.cta_text || ""}
                onChange={(e) => setHero({ ...hero, cta_text: e.target.value })}
                onBlur={() => setEditingField(null)}
                autoFocus
                className="bg-white/20 px-4 py-2 rounded text-white outline-none border border-cyan-400/30" />
            ) : (
              <button
                onClick={() => setEditingField("cta_text")}
                className="px-10 py-4 bg-cyan-400 text-black rounded-full cursor-pointer"
              >
                {hero.cta_text || "Get Certified →"}
              </button>
            )}
          </div>

          {/* SAVE BUTTON */}
          <div className="mt-12">
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-green-400 text-black rounded-full font-semibold"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
          <CoursesPage />

        </div>
      </section>
    </div></>
  );
}

{/* <CourseManager /> */ }


{/* STATS */ }
{/* <div className="grid grid-cols-3 gap-6">
        <div className="bg-white/10 p-6 rounded">
          <p>Total Leads</p>
          <h2 className="text-3xl">{leads.length}</h2>
        </div>

        <div className="bg-white/10 p-6 rounded">
          <p>Courses</p>
          <h2 className="text-3xl">{pieData.length}</h2>
        </div>

        <div className="bg-white/10 p-6 rounded">
          <p>Latest</p>
          <h2>{leads[0]?.name || "-"}</h2>
        </div>
      </div> */}

{/* CHARTS */ }
{/* <div className="grid grid-cols-2 gap-8">

        <div className="bg-white/10 p-6 rounded">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value">
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/10 p-6 rounded">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={graphData}>
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis />
              <Tooltip />
              <Line dataKey="leads" stroke="#00d4ff" />
            </LineChart>
          </ResponsiveContainer>
        </div> */}

{/* </div> */ }
