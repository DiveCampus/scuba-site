import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET COURSES
========================================= */

export const getOpenDiverCourses =
  async () => {

    const { data, error } =
      await supabase
        .from("open_diver_courses")
        .select("*")
        .order("created_at", {
          ascending: true,
        });

    if (error) {

      console.error(error);

    }

    return { data, error };

  };

/* =========================================
   GET SINGLE COURSE
========================================= */

export const getOpenDiverCourse =
  async () => {

    const { data, error } =
      await supabase
        .from("open_diver_courses")
        .select("*")
        .limit(1)
        .single();

    if (error) {

      console.error(error);

    }

    return { data, error };

  };

/* =========================================
   UPDATE COURSE
========================================= */

export const updateOpenDiverCourse =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from("open_diver_courses")
        .update({
          ...payload,
          updated_at: new Date(),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {

      console.error(error);

    }

    return { data, error };

  };