import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET SECTION
========================================= */

export const getEliteFooterSection =
  async () => {

    const { data, error } =
      await supabase
        .from("elite_footer_section")
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

export const updateEliteFooterSection =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from("elite_footer_section")
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
   GET GROUPS
========================================= */

export const getEliteFooterGroups =
  async () => {

    const { data, error } =
      await supabase
        .from("elite_footer_groups")
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
   GET LINKS
========================================= */

export const getEliteFooterLinks =
  async () => {

    const { data, error } =
      await supabase
        .from("elite_footer_links")
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
   UPDATE GROUP
========================================= */

export const updateEliteFooterGroup =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from("elite_footer_groups")
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
   UPDATE LINK
========================================= */

export const updateEliteFooterLink =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from("elite_footer_links")
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