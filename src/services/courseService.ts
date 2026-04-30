import { supabase } from "@/lib/supabaseClient";

// ✅ GET ALL COURSES
export const getCourses = async () => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ GET COURSES ERROR:", error);
    return { data: [], error };
  }

  return { data, error: null };
};

// ✅ GET SINGLE COURSE
export const getCourseById = async (id: string) => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("❌ GET SINGLE ERROR:", error);
    return { data: null, error };
  }

  return { data, error: null };
};

// ✅ CREATE COURSE
export const createCourse = async (payload: any) => {
  const { data, error } = await supabase
    .from("courses")
    .insert([
      {
        title: payload.title || "",
        description: payload.description || "",
        price: payload.price || 0,
        old_price: payload.old_price || null,
        image: payload.image || "", // 🔥 URL
      },
    ])
    .select()
    .single(); // 🔥 important

  if (error) {
    console.error("❌ CREATE ERROR:", error);
    return { data: null, error };
  }

  return { data, error: null };
};

// ✅ UPDATE COURSE
export const updateCourse = async (id: string, payload: any) => {
  const { data, error } = await supabase
    .from("courses")
    .update({
      title: payload.title,
      description: payload.description,
      price: payload.price,
      old_price: payload.old_price,
      image: payload.image,
    })
    .eq("id", id)
    .select()
    .single(); // 🔥 important

  if (error) {
    console.error("❌ UPDATE ERROR:", error);
    return { data: null, error };
  }

  return { data, error: null };
};

// ✅ DELETE COURSE
export const deleteCourse = async (id: string) => {
  const { error } = await supabase
    .from("courses")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("❌ DELETE ERROR:", error);
    return { error };
  }

  return { error: null };
};