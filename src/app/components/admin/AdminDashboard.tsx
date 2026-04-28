import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { supabase } from "@/lib/supabaseClient";

import { getHero, updateHero } from "@/services/heroService";

const COLORS = ["#00d4ff", "#06b6d4", "#3b82f6", "#6366f1"];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 HERO STATE
  const [hero, setHero] = useState<any>(null);
  const [heroLoading, setHeroLoading] = useState(false);

  useEffect(() => {
    checkUser();
    fetchLeads();
    fetchHero();
  }, []);

  // 🔐 AUTH
  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) navigate("/admin");
  };

  // 📊 LEADS
  const fetchLeads = async () => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("date", { ascending: false });

    setLeads(data || []);
    setLoading(false);
  };

  // 🔥 HERO FETCH
  const fetchHero = async () => {
    const { data } = await getHero();
    setHero(data);
  };

  // 🔥 HERO UPDATE
const handleHeroUpdate = async () => {
  console.log("🚀 [UPDATE] Sending data:", hero);

  setHeroLoading(true);

  const { data, error } = await updateHero(hero);

  console.log("📦 [UPDATE RESULT]:", { data, error });

  if (error) {
    console.error("❌ Update failed:", error);
    alert("❌ Update failed");
  } else {
    console.log("✅ Update success");

    // 🔥 IMPORTANT
    const { data: newHero } = await getHero();

    console.log("🔄 [REFETCH]:", newHero);

    setHero(newHero);
    alert("✅ Hero updated");
  }

  setHeroLoading(false);
};
  // 🚪 LOGOUT
  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("adminAuth");
    navigate("/admin");
  };

  // 📊 PIE DATA
  const courseCount: any = {};
  leads.forEach((l) => {
    courseCount[l.course] = (courseCount[l.course] || 0) + 1;
  });

  const pieData = Object.keys(courseCount).map((key) => ({
    name: key,
    value: courseCount[key],
  }));

  // 📈 GRAPH DATA
  const dateCount: any = {};
  leads.forEach((l) => {
    dateCount[l.date] = (dateCount[l.date] || 0) + 1;
  });

  const graphData = Object.keys(dateCount).map((date) => ({
    date,
    leads: dateCount[date],
  }));

  // 📄 EXPORT
  const downloadDoc = async () => {
    const doc = new Document({
      sections: [
        {
          children: leads.map(
            (l) =>
              new Paragraph({
                children: [
                  new TextRun(`${l.name} | ${l.phone} | ${l.course} | ${l.date}`),
                ],
              })
          ),
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "leads.docx");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-10 space-y-12">

      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>

        <div className="flex gap-4">
          <button onClick={downloadDoc} className="bg-cyan-400 px-4 py-2 text-black rounded">
            Export
          </button>

          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </div>

      {/* HERO EDITOR 🔥 */}
      {hero && (
        <div className="bg-white/10 p-6 rounded-xl backdrop-blur">
          <h2 className="text-2xl mb-4">Hero Section Editor</h2>

          <div className="space-y-3">

            <input
              value={hero.title}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              className="w-full p-2 bg-black/50 rounded"
              placeholder="Title"
            />

            <input
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              className="w-full p-2 bg-black/50 rounded"
              placeholder="Subtitle"
            />

            <textarea
              value={hero.description}
              onChange={(e) => setHero({ ...hero, description: e.target.value })}
              className="w-full p-2 bg-black/50 rounded"
            />

            <input
              type="number"
              value={hero.price}
              onChange={(e) => setHero({ ...hero, price: Number(e.target.value) })}
              className="w-full p-2 bg-black/50 rounded"
              placeholder="Price"
            />

            <input
              type="number"
              value={hero.old_price}
              onChange={(e) => setHero({ ...hero, old_price: Number(e.target.value) })}
              className="w-full p-2 bg-black/50 rounded"
              placeholder="Old Price"
            />

            <button
              onClick={handleHeroUpdate}
              className="bg-cyan-400 text-black px-4 py-2 rounded"
            >
              {heroLoading ? "Updating..." : "Save Hero"}
            </button>
          </div>
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6">
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
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-8">

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
        </div>

      </div>

    </div>
  );
}