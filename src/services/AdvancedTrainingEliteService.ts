import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET SECTION
========================================= */

export const getAdvancedTrainingEliteSection =
  async () => {

    const { data, error } =
      await supabase
        .from(
          "advanced_training"
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

export const updateAdvancedTrainingEliteSection =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from(
          "advanced_training"
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