import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET SECTION
========================================= */

export const getChooseEnvironmentSection =
  async () => {

    const { data, error } = await supabase
        .from("choose_environment_section")
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

export const updateChooseEnvironmentSection =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
        .from("choose_environment_section")
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

export const getChooseEnvironmentCards =
  async () => {

    const { data, error } = await supabase
        .from("choose_environment_cards")
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

export const updateChooseEnvironmentCard =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
        .from("choose_environment_cards")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

    if (error) {
      console.error(error);
    }

    return { data, error };
  };