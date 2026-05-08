import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET SECTION
========================================= */

export const getMasteryGapSection =
  async () => {

    const { data, error } =
      await supabase
        .from("mastery_gap_section")
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

export const updateMasteryGapSection =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from("mastery_gap_section")
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

export const getMasteryGapRows =
  async () => {

    const { data, error } =
      await supabase
        .from("mastery_gap_rows")
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

export const updateMasteryGapRow =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from("mastery_gap_rows")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

    if (error) {

      console.error(error);

    }

    return { data, error };

  };