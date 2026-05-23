import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET SECTION
========================================= */

export const getComparisonDiveSection =
  async () => {

    const { data, error } = await supabase
        .from("comparison_dive_section")
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

export const updateComparisonDiveSection =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
        .from("comparison_dive_section")
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
   GET ROWS
========================================= */

export const getComparisonDiveRows =
  async () => {

    const { data, error } = await supabase
        .from("comparison_dive_rows")
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
   UPDATE ROW
========================================= */

export const updateComparisonDiveRow =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
        .from("comparison_dive_rows")
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