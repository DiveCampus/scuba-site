import { supabase } from "@/lib/supabaseClient";

// ✅ GET ALL COURSES
export const getCourses = async () => {
  return await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });
};

// ✅ GET SINGLE COURSE
export const getCourseById = async (id: string) => {
  return await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();
};

// ✅ CREATE COURSE
export const createCourse = async (data: any) => {
  return await supabase
    .from("courses")
    .insert([
      {
        title: data.title,
        description: data.description,
        price: data.price,
        old_price: data.old_price,
        image: data.image, // 🔥 image URL
      },
    ])
    .select();
};

// ✅ UPDATE COURSE
export const updateCourse = async (id: string, data: any) => {
  return await supabase
    .from("courses")
    .update({
      title: data.title,
      description: data.description,
      price: data.price,
      old_price: data.old_price,
      image: data.image,
    })
    .eq("id", id)
    .select();
};

// ✅ DELETE COURSE
export const deleteCourse = async (id: string) => {
  return await supabase
    .from("courses")
    .delete()
    .eq("id", id);
};