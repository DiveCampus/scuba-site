import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET SECTION
========================================= */

export const getTrainingComparisonSection =
  async () => {

    const { data, error } =
      await supabase
        .from(
          "training_comparison_section"
        )
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

export const updateTrainingComparisonSection =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from(
          "training_comparison_section"
        )
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

export const getTrainingComparisonRows =
  async () => {

    const { data, error } =
      await supabase
        .from(
          "training_comparison_rows"
        )
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

export const updateTrainingComparisonRow =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from(
          "training_comparison_rows"
        )
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