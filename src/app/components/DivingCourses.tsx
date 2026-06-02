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
    const { data } = await getCourses(); // ordered by position ASC from the service
    const ordered = (data || [])
      .slice()
      .sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0));
    setCourses(ordered);
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
    <section id="courses" className="py-20 px-4 bg-[#18476D] font-habara">
      <div className="max-w-[1600px] mx-auto">

        <h2 className="text-center text-5xl font-bold text-white mb-14 uppercase">
          CHOOSE YOUR <span className="text-cyan-300">PATH</span>
        </h2>

        <div className="flex justify-center gap-5 flex-wrap">

          {courses.map((course, index) => {
            const isEditing = editingId === course.id;

            return (
              <div
                key={course.id}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                className="w-[260px] h-[620px] rounded-[28px] overflow-hidden bg-[#0f2f4d] shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
              >

                {/* CLICK TO EDIT BUTTON */}
                <button
                  onClick={() =>
                    setEditingId(isEditing ? null : course.id)
                  }
                  className="absolute z-10 top-3 right-3 bg-white text-black text-xs px-2 py-1 rounded"
                >
                  {isEditing ? "Close" : "Edit"}
                </button>

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
                    alt={course.title ? `${course.title} - PADI Scuba Course Dubai` : "PADI Scuba Diving Course Dubai"}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />

                  {/* IMAGE INPUT */}
                  {isEditing && (
                    <input
                      value={course.image ?? ""}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        handleChange(course.id, "image", e.target.value)
                      }
                      className="absolute top-2 left-2 w-[90%] text-xs p-1 rounded text-black bg-white"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />

                  {/* 🔥 AGE FIXED */}
                  {isEditing ? (
                    <div
                      className="absolute top-4 left-4 flex gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={course.age ?? ""}
                        onChange={(e) =>
                          handleChange(course.id, "age", e.target.value)
                        }
                        className="text-xs px-2 py-1 rounded bg-white text-black"
                      >
                        <option value="">Age</option>
                        <option value="8+">8+</option>
                        <option value="10+">10+</option>
                        <option value="12+">12+</option>
                        <option value="18+">18+</option>
                      </select>

                      <input
                        placeholder="Custom"
                        value={course.age ?? ""}
                        onChange={(e) =>
                          handleChange(course.id, "age", e.target.value)
                        }
                        className="text-xs px-2 py-1 rounded bg-white text-black w-[60px]"
                      />
                    </div>
                  ) : (
                    <div className="absolute top-4 left-4 bg-white text-black text-xs px-3 py-1 rounded-full uppercase">
                      {course.age || "AGE"}
                    </div>
                  )}

                  {/* COLLAPSED */}
                  {active !== index && (
                    <>
                      <div className="absolute bottom-6 left-5">
                        <h3 className="text-white text-[22px] font-bold uppercase">
                          {course.title}
                        </h3>

                        <p className="text-sm text-white/70 mt-2 uppercase">
                          FROM
                        </p>

                        <p className="text-3xl font-bold text-cyan-300 uppercase">
                          AED {course.price}
                        </p>
                      </div>

                      <div className="absolute bottom-5 right-5">
                        <div className="w-14 h-14 rounded-full bg-[#18476D]/80 flex items-center justify-center">
                          <ArrowRight className="text-white" />
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>

                {/* EXPANDED */}
                {active === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-5 h-[58%] flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-white text-[22px] font-bold mb-4 uppercase">
                        {course.title}
                      </h3>

                      <p className="text-white/80 text-sm uppercase">
                        {course.description}
                      </p>
                    </div>

                    <div>
                      <div className="w-full h-[2px] bg-cyan-300 mb-4" />
                      <p className="text-sm text-white/60 uppercase">FROM</p>
                      <p className="text-3xl font-bold text-cyan-300 uppercase">
                        AED {course.price}
                      </p>
                    </div>

                    {/* SAVE */}
                    {isEditing && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSave(course);
                        }}
                        className="bg-green-400 text-black px-3 py-1 rounded mt-2"
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