"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getCourses, updateCourse } from "@/services/courseService";

export function DivingCourses() {
  const [active, setActive] = useState<number | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    console.log("📡 Fetching...");
    const { data, error } = await getCourses();

    console.log("🔥 DATA:", data);
    console.log("❌ ERROR:", error);

    setCourses(data || []);
    setLoading(false);
  };

  const handleChange = (id: string, field: string, value: any) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      )
    );
  };

  const handleSave = async (course: any) => {
    setSaving(true);
    await updateCourse(course.id, course);
    setSaving(false);
    setEditingId(null);
    alert("✅ Updated");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-[#18476D]">
        Loading...
      </div>
    );
  }

  return (
    <section className="py-20 px-4 bg-[#18476D]">
      <div className="max-w-[1600px] mx-auto">

        {/* HEADING */}
        <h2 className="text-center text-5xl font-bold text-white mb-14 uppercase">
          CHOOSE YOUR <span className="text-cyan-300">PATH</span>
        </h2>

        {/* CARDS */}
        <div className="flex justify-center gap-5 flex-wrap">

          {courses.map((course, index) => {
            const isEditing = editingId === course.id;

            return (
              <div
                key={course.id}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setEditingId(course.id)}
                className="w-[260px] h-[620px] rounded-[28px] overflow-hidden bg-[#0f2f4d] cursor-pointer"
              >

                {/* IMAGE */}
                <motion.div
                  animate={{
                    height: active === index ? "42%" : "100%",
                  }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <img
                    src={course.image ?? "/1.avif"}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/1.avif";
                    }}
                    className="w-full h-full object-cover"
                  />

                  {/* 🔥 IMAGE EDIT INPUT */}
                  {isEditing && (
                    <input
                      value={course.image ?? ""}
                      onChange={(e) =>
                        handleChange(course.id, "image", e.target.value)
                      }
                      placeholder="Paste image URL"
                      className="absolute top-2 left-2 w-[90%] text-xs p-1 rounded text-black bg-white border"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />

                  {/* AGE */}
                  {isEditing ? (
                    <input
                      value={course.age ?? ""}
                      onChange={(e) =>
                        handleChange(course.id, "age", e.target.value)
                      }
                      className="absolute top-4 left-4 text-xs px-2 py-1 text-black rounded"
                    />
                  ) : (
                    <div className="absolute top-4 left-4 bg-white text-black text-xs px-3 py-1 rounded-full">
                      {course.age || "AGE"}
                    </div>
                  )}

                  {/* COLLAPSED VIEW */}
                  {active !== index && (
                    <>
                      <div className="absolute bottom-6 left-5">

                        {isEditing ? (
                          <input
                            value={course.title ?? ""}
                            onChange={(e) =>
                              handleChange(course.id, "title", e.target.value)
                            }
                            className="text-black px-1 rounded"
                          />
                        ) : (
                          <h3 className="text-white text-[22px] font-bold uppercase">
                            {course.title}
                          </h3>
                        )}

                        <p className="text-sm text-white/70 mt-2 uppercase">
                          FROM
                        </p>

                        {isEditing ? (
                          <input
                            type="number"
                            value={course.price ?? 0}
                            onChange={(e) =>
                              handleChange(course.id, "price", Number(e.target.value))
                            }
                            className="text-black px-1 rounded"
                          />
                        ) : (
                          <p className="text-3xl font-bold text-cyan-300 uppercase">
                            AED {course.price}
                          </p>
                        )}
                      </div>

                      <div className="absolute bottom-5 right-5">
                        <div className="w-14 h-14 rounded-full bg-[#18476D]/80 flex items-center justify-center">
                          <ArrowRight className="text-white" />
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>

                {/* EXPANDED VIEW */}
                {active === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-5 h-[58%] flex flex-col justify-between"
                  >

                    <div>
                      {isEditing ? (
                        <textarea
                          value={course.description ?? ""}
                          onChange={(e) =>
                            handleChange(course.id, "description", e.target.value)
                          }
                          className="w-full text-black rounded p-1"
                        />
                      ) : (
                        <p className="text-white/80 text-sm uppercase">
                          {course.description}
                        </p>
                      )}
                    </div>

                    {/* SAVE BUTTON */}
                    {isEditing && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSave(course);
                        }}
                        className="bg-green-400 text-black px-3 py-1 rounded"
                      >
                        {saving ? "Saving..." : "Save"}
                      </button>
                    )}

                  </motion.div>
                )}

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}