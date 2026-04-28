// src/admin/AdminDashboard.tsx

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

const COLORS = ["#00d4ff", "#06b6d4", "#3b82f6", "#6366f1"];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");

    if (!isAuth) {
      navigate("/admin");
    }

    // 🔥 TEMP MOCK DATA (later supabase connect)
    const mockData = [
      { name: "Ali", phone: "9715000001", course: "Open Water", date: "2026-04-21" },
      { name: "John", phone: "9715000002", course: "Advanced", date: "2026-04-21" },
      { name: "Sara", phone: "9715000003", course: "Rescue", date: "2026-04-20" },
      { name: "Ahmed", phone: "9715000004", course: "Open Water", date: "2026-04-19" },
    ];

    setLeads(mockData);
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
    setHeroLoading(true);

    const { error } = await updateHero(hero);

    if (error) alert("❌ Update failed");
    else alert("✅ Hero updated");

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

  // 📄 DOCX DOWNLOAD
  const downloadDoc = async () => {
    const doc = new Document({
      sections: [
        {
          children: leads.map(
            (l) =>
              new Paragraph({
                children: [
                  new TextRun(
                    `${l.name} | ${l.phone} | ${l.course} | ${l.date}`
                  ),
                ],
              })
          ),
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "leads.docx");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] to-[#020617] text-white p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>

        <div className="flex gap-4">
          <button
            onClick={downloadDoc}
            className="bg-cyan-400 text-black px-4 py-2 rounded-lg"
          >
            Download DOCX
          </button>

          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="p-6 rounded-xl bg-white/10 backdrop-blur-lg">
          <h2 className="text-lg text-white/60">Total Leads</h2>
          <p className="text-3xl font-bold">{leads.length}</p>
        </div>

        <div className="p-6 rounded-xl bg-white/10 backdrop-blur-lg">
          <h2 className="text-lg text-white/60">Bookings Today</h2>
          <p className="text-3xl font-bold">
            {graphData.find((g) => g.date === "2026-04-21")?.leads || 0}
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white/10 backdrop-blur-lg">
          <h2 className="text-lg text-white/60">Courses</h2>
          <p className="text-3xl font-bold">{pieData.length}</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-8 mb-10">

        {/* PIE */}
        <div className="p-6 bg-white/10 rounded-xl backdrop-blur">
          <h2 className="mb-4">Course Distribution</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value">
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* GRAPH */}
        <div className="p-6 bg-white/10 rounded-xl backdrop-blur">
          <h2 className="mb-4">Leads Over Time</h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={graphData}>
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="leads" stroke="#00d4ff" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white/10 backdrop-blur rounded-xl p-6">
        <h2 className="mb-4 text-xl">Bookings</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-white/60">
              <th>Name</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((l, i) => (
              <tr key={i} className="border-t border-white/10">
                <td>{l.name}</td>
                <td>{l.phone}</td>
                <td>{l.course}</td>
                <td>{l.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}