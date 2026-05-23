import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET DATA
========================================= */

export const getDivemasterHero =
  async () => {

    const { data, error } = await supabase
        .from("divemaster_hero_section")
        .select("*")
        .limit(1)
        .single();

    if (error) {

      console.error(error);

    }

    return { data, error };

  };


/* =========================================
   UPDATE DATA
========================================= */

export const updateDivemasterHero =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
        .from("divemaster_hero_section")
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


