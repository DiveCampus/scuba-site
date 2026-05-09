import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET SECTION
========================================= */

export const getEliteBenefitsSection =
  async () => {

    const { data, error } =
      await supabase
        .from("elite_benefits_section")
        .select("*")
        .limit(1)
        .single();

    if (error) {

      console.error(error);

    }

    return { data, error };

  };

/* =========================================
   UPDATE SECTION
========================================= */

export const updateEliteBenefitsSection =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from("elite_benefits_section")
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

/* =========================================
   GET POINTS
========================================= */

export const getEliteBenefitsPoints =
  async () => {

    const { data, error } =
      await supabase
        .from("elite_benefits_points")
        .select("*")
        .order("sort_order", {
          ascending: true,
        });

    if (error) {

      console.error(error);

    }

    return { data, error };

  };

/* =========================================
   UPDATE POINT
========================================= */

export const updateEliteBenefitsPoint =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from("elite_benefits_points")
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