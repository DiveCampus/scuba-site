import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET SECTION
========================================= */

export const getHybridProtocolSection =
  async () => {

    const { data, error } =
      await supabase
        .from("hybrid_protocol_section")
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

export const updateHybridProtocolSection =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from("hybrid_protocol_section")
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

export const getHybridProtocolCards =
  async () => {

    const { data, error } =
      await supabase
        .from("hybrid_protocol_cards")
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

export const updateHybridProtocolCard =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from("hybrid_protocol_cards")
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