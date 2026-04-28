// src/admin/AdminLogin.tsx

import { useState } from "react";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("🚀 Login started");
    console.log("📧 Email:", email);

    setLoading(true);

    // 🔐 Step 1: Auth login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("🔐 Auth response:", { data, error });

    if (error) {
      console.error("❌ Login error:", error.message);
      alert("Login failed: " + error.message);
      setLoading(false);
      return;
    }

    const user = data.user;
    console.log("✅ User logged in:", user);

    if (!user) {
      console.error("❌ No user returned after login");
      setLoading(false);
      return;
    }

    // 🔎 Step 2: Fetch profile
    console.log("🔍 Fetching profile for user ID:", user.id);

    const { data: profile, error: roleError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    console.log("📦 Profile response:", { profile, roleError });

    if (roleError) {
      console.error("❌ Profile fetch error:", roleError.message);
    }

    // 🔒 Step 3: Role check
    console.log("🔐 Checking role...");

    if (!profile) {
      console.error("❌ Profile not found");
      alert("Profile not found");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    console.log("👤 User role:", profile.role);

    if (profile.role !== "admin") {
      console.warn("⚠️ Not an admin user");
      alert("Not authorized as admin");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    // ✅ Step 4: Success
    console.log("🎉 Admin login successful!");

    localStorage.setItem("adminAuth", "true");

    setLoading(false);
    navigate("/admin/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="p-8 bg-white/10 rounded-xl w-[300px]">
        <h2 className="text-xl mb-4">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 bg-black/50 rounded"
          onChange={(e) => {
            console.log("📧 Email input:", e.target.value);
            setEmail(e.target.value);
          }}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 bg-black/50 rounded"
          onChange={(e) => {
            console.log("🔑 Password input changed");
            setPassword(e.target.value);
          }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-cyan-400 text-black p-2 rounded font-semibold hover:opacity-80"
        >
          Login
        </button>
      </div>
    </div>
  );
}