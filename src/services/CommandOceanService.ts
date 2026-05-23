import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET SECTION
========================================= */

export const getCommandOceanSection =
  async () => {

    const { data, error } = await supabase
        .from("command_ocean_section")
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

export const updateCommandOceanSection =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
        .from("command_ocean_section")
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
   GET ITEMS
========================================= */

export const getCommandOceanItems =
  async () => {

    const { data, error } = await supabase
        .from("command_ocean_items")
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
   UPDATE ITEM
========================================= */

export const updateCommandOceanItem =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
        .from("command_ocean_items")
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