import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET SECTION
========================================= */

export const getProfessionalStatusSection =
  async () => {

    const { data, error } = await supabase
        .from("professional_status_section")
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

export const updateProfessionalStatusSection =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
        .from("professional_status_section")
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

export const getProfessionalStatusItems =
  async () => {

    const { data, error } = await supabase
        .from("professional_status_items")
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

export const updateProfessionalStatusItem =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
        .from("professional_status_items")
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