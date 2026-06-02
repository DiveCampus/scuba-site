import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    // 🔐 AUTH LOGIN
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("❌ [ERROR] Login failed:", error.message);
      alert("Login failed: " + error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (!user) {
      console.error("❌ [ERROR] No user returned after login");
      setLoading(false);
      return;
    }

    // 🔎 FETCH PROFILE
    const { data: profile, error: roleError } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (roleError) {
      console.error("❌ [ERROR] Profile fetch error:", roleError.message);
    }

    // 🔒 ROLE CHECK
    if (!profile) {
      console.error("❌ [ERROR] Profile not found");
      alert("Profile not found");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    if (profile.role !== "admin") {
      console.warn("⚠️ [WARNING] Not an admin user");
      alert("Not authorized as admin");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    // ✅ SUCCESS
    localStorage.setItem("adminAuth", "true");
    window.location.href = "/admin/dashboard";
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="p-8 bg-white/10 rounded-xl w-[320px] backdrop-blur">
        <h2 className="text-xl mb-6 text-center font-semibold">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 bg-black/50 rounded"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 bg-black/50 rounded"
          onChange={(e) => {
            setPassword(e?.target?.value);
          }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-cyan-400 text-black p-2 rounded font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}