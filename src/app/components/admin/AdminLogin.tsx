import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log("🚀 [STEP 1] Login started");
    console.log("📧 Email:", email);

    setLoading(true);

    // 🔐 AUTH LOGIN
    console.log("🔐 [STEP 2] Calling Supabase auth...");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("📦 [STEP 2 RESULT] Auth response:", { data, error });

    if (error) {
      console.error("❌ [ERROR] Login failed:", error.message);
      alert("Login failed: " + error.message);
      setLoading(false);
      return;
    }

    const user = data.user;
    console.log("✅ [STEP 3] User received:", user);

    if (!user) {
      console.error("❌ [ERROR] No user returned after login");
      setLoading(false);
      return;
    }

    // 🔎 FETCH PROFILE
    console.log("🔍 [STEP 4] Fetching profile for user ID:", user.id);

    const { data: profile, error: roleError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    console.log("📦 [STEP 4 RESULT] Profile response:", {
      profile,
      roleError,
    });

    if (roleError) {
      console.error("❌ [ERROR] Profile fetch error:", roleError.message);
    }

    // 🔒 ROLE CHECK
    console.log("🔐 [STEP 5] Checking role...");

    if (!profile) {
      console.error("❌ [ERROR] Profile not found");
      alert("Profile not found");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    console.log("👤 [STEP 6] User role:", profile.role);

    if (profile.role !== "admin") {
      console.warn("⚠️ [WARNING] Not an admin user");
      alert("Not authorized as admin");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    // ✅ SUCCESS
    console.log("🎉 [STEP 7] Admin login successful!");

    localStorage.setItem("adminAuth", "true");
    console.log("💾 [STEP 8] adminAuth saved to localStorage");

    console.log("➡️ [STEP 9] Redirecting to dashboard...");
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
            console.log("📧 [INPUT] Email:", e.target.value);
            setEmail(e.target.value);
          }}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 bg-black/50 rounded"
          onChange={(e) => {
            console.log("🔑 [INPUT] Password changed");
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