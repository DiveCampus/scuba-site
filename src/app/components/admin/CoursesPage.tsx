"use client";

import { useEffect, useState } from "react";
import { getCoursestable } from "@/services/courseTableService";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🚀 Page Mounted");
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    console.log("📡 Fetching from Supabase...");

    const { data, error } = await getCoursestable();

    console.log("🔥 RAW DATA:", data);
    console.log("❌ ERROR:", error);

    if (error) {
      console.error("❌ SUPABASE ERROR:", error);
    }

    if (!data || data.length === 0) {
      console.warn("⚠️ No data found in DB");
    }

    setCourses(data || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0b2c44] text-white">
        Loading Courses...
      </div>
    );
  }

  return (
    <div className="bg-[#0b2c44] py-20 text-white min-h-screen">

      {/* 🔥 HEADING */}
      <h1 className="text-center text-4xl font-bold mb-10">
        CHOOSE YOUR <span className="text-cyan-400">PATH</span>
      </h1>

      {/* ❌ EMPTY STATE */}
      {courses.length === 0 && (
        <p className="text-center text-white/60">
          No courses found in database
        </p>
      )}

      {/* ✅ CARDS */}
      <div className="flex justify-center gap-6 flex-wrap">

        {courses.map((course, index) => {
          console.log("🧱 RENDER:", index, course);

          return (
            <div
              key={course.id}
              className="w-[260px] rounded-2xl overflow-hidden relative hover:scale-105 transition duration-300"
            >

              {/* IMAGE */}
              <img
                src={course.image || "/1.avif"}
                className="w-full h-[350px] object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/50 p-4 flex flex-col justify-end">

                {/* AGE */}
                <span className="text-xs bg-white text-black px-2 py-1 rounded w-fit mb-2">
                  {course.age || "AGE"}
                </span>

                {/* TITLE */}
                <h2 className="text-xl font-bold">
                  {course.title || "TITLE"}
                </h2>

                {/* PRICE */}
                <p className="text-cyan-400 text-lg font-semibold">
                  AED {course.price || 0}
                </p>

                {/* DESCRIPTION */}
                <p className="text-xs text-white/70 mt-1">
                  {course.description || "Description"}
                </p>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}