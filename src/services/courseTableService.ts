import { supabase } from "@/lib/supabaseClient";

// ✅ GET ALL COURSES
export const getCoursestable = async () => {
  const { data, error } = await supabase
    .from("coursestable")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ GET ERROR:", error);
    return { data: null, error };
  }

  return { data, error };
};

// ✅ CREATE COURSE
export const createCoursestable = async (data: any) => {
  const { data: res, error } = await supabase
    .from("coursestable")
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error("❌ CREATE ERROR:", error);
    return { data: null, error };
  }

  return { data: res, error };
};

// ✅ UPDATE COURSE
export const updateCoursestable = async (id: string, data: any) => {
  const { data: res, error } = await supabase
    .from("coursestable")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("❌ UPDATE ERROR:", error);
    return { data: null, error };
  }

  return { data: res, error };
};

// ✅ DELETE COURSE
export const deleteCoursestable = async (id: string) => {
  const { error } = await supabase
    .from("coursestable")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("❌ DELETE ERROR:", error);
    return { error };
  }

  return { error: null };
};