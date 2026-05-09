import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET SECTION
========================================= */

export const getEliteTrainingSection =
  async () => {

    const { data, error } =
      await supabase
        .from("elite_training_section")
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

export const updateEliteTrainingSection =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from("elite_training_section")
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
   GET CARDS
========================================= */

export const getEliteTrainingCards =
  async () => {

    const { data, error } =
      await supabase
        .from("elite_training_cards")
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
   UPDATE CARD
========================================= */

export const updateEliteTrainingCard =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from("elite_training_cards")
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