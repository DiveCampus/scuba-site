import { supabase } from "@/lib/supabaseClient";

// ✅ GET ALL COURSES
export const getCourses = async () => {
  // console.log("🚀 [GET COURSES] Fetching all courses...");

  const { data, error } = await supabase
    .from("kadir_courses")
    .select("*")
    .order("position", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: true });

  // console.log("📦 [GET COURSES RESULT]", {
  //   data,
  //   error,
  // });

  if (error) {
    console.error("❌ GET COURSES ERROR:", error);
    return { data: [], error };
  }

  return { data, error: null };
};

// ✅ GET SINGLE COURSE
export const getCourseById = async (id: string) => {
  // console.log("🚀 [GET SINGLE COURSE]", id);

  const { data, error } = await supabase
    .from("kadir_courses")
    .select("*")
    .eq("id", id)
    .single();

  // console.log("📦 [GET SINGLE RESULT]", {
  //   data,
  //   error,
  // });

  if (error) {
    console.error("❌ GET SINGLE ERROR:", error);
    return { data: null, error };
  }

  return { data, error: null };
};

// ✅ CREATE COURSE
export const createCourse = async (payload: any) => {
  // console.log("🚀 [CREATE COURSE]", payload);

  const { data, error } = await supabase
    .from("kadir_courses")
    .insert([
      {
        title: payload.title || "",
        description: payload.description || "",
        price: payload.price || 0,
        old_price: payload.old_price || 0,
        image: payload.image || "",
        age: payload.age || "",
      },
    ])
    .select()
    .single();

  // console.log("📦 [CREATE COURSE RESULT]", {
  //   data,
  //   error,
  // });

  if (error) {
    console.error("❌ CREATE ERROR:", error);
    return { data: null, error };
  }

  return { data, error: null };
};

// ✅ UPDATE COURSE
export const updateCourse = async (
  id: string,
  payload: any
) => {
  // console.log("🚀 [UPDATE COURSE]", {
  //   id,
  //   payload,
  // });

  const { data, error } = await supabase
    .from("kadir_courses")
    .update({
      title: payload.title,
      description: payload.description,
      price: payload.price,
      old_price: payload.old_price,
      image: payload.image,
      age: payload.age,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  // console.log("📦 [UPDATE COURSE RESULT]", {
  //   data,
  //   error,
  // });

  if (error) {
    console.error("❌ UPDATE ERROR:", error);
    return { data: null, error };
  }

  return { data, error: null };
};

// ✅ REORDER COURSES — persist drag order into the `position` column (1-based).
// Updates every affected row so the new sequence survives reload and is shown
// to all visitors. Runs the per-row updates in parallel.
export const reorderCourses = async (orderedIds: string[]) => {
  const results = await Promise.all(
    orderedIds.map((id, index) =>
      supabase
        .from("kadir_courses")
        .update({ position: index + 1, updated_at: new Date().toISOString() })
        .eq("id", id)
    )
  );

  const error = results.find((r) => r.error)?.error ?? null;

  if (error) {
    console.error("❌ REORDER ERROR:", error);
    return { error };
  }

  return { error: null };
};

// ✅ DELETE COURSE
export const deleteCourse = async (id: string) => {
  // console.log("🚀 [DELETE COURSE]", id);

  const { error } = await supabase
    .from("kadir_courses")
    .delete()
    .eq("id", id);

  // console.log("📦 [DELETE RESULT]", {
  //   error,
  // });

  if (error) {
    console.error("❌ DELETE ERROR:", error);
    return { error };
  }

  return { error: null };
};