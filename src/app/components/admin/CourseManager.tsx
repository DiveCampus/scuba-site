import { useEffect, useState } from "react";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "@/services/courseService";

export default function CourseManager() {
  const [courses, setCourses] = useState<any[]>([]);
  const [form, setForm] = useState<any>({});
  const [editing, setEditing] = useState<any>(null);

  // 📥 FETCH
  const fetchCourses = async () => {
    const { data } = await getCourses();
    if (data) setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ➕ CREATE / UPDATE
  const handleSubmit = async () => {
    if (editing) {
      await updateCourse(editing.id, form);
      alert("Updated ✅");
    } else {
      await createCourse(form);
      alert("Created ✅");
    }

    setForm({});
    setEditing(null);
    fetchCourses();
  };

  // ❌ DELETE
  const handleDelete = async (id: string) => {
    await deleteCourse(id);
    fetchCourses();
  };

  // ✏️ EDIT
  const handleEdit = (c: any) => {
    setEditing(c);
    setForm(c);
  };

  return (
    <div className="bg-white/10 p-6 rounded-xl backdrop-blur space-y-6">

      <h2 className="text-2xl font-bold">Course Manager</h2>

      {/* FORM */}
      <div className="space-y-3">
        <input
          placeholder="Title"
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 bg-black/50 rounded"
        />

        <textarea
          placeholder="Description"
          value={form.description || ""}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full p-2 bg-black/50 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price || ""}
          onChange={(e) =>
            setForm({ ...form, price: Number(e.target.value) })
          }
          className="w-full p-2 bg-black/50 rounded"
        />

        <input
          type="number"
          placeholder="Old Price"
          value={form.old_price || ""}
          onChange={(e) =>
            setForm({ ...form, old_price: Number(e.target.value) })
          }
          className="w-full p-2 bg-black/50 rounded"
        />

        <input
          placeholder="Image URL"
          value={form.image || ""}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full p-2 bg-black/50 rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-cyan-400 text-black px-4 py-2 rounded"
        >
          {editing ? "Update Course" : "Create Course"}
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {courses.map((c) => (
          <div
            key={c.id}
            className="border border-white/10 p-4 rounded flex justify-between"
          >
            <div>
              <h3 className="font-bold">{c.title}</h3>
              <p>{c.price} AED</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => handleEdit(c)}>Edit</button>
              <button onClick={() => handleDelete(c.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}