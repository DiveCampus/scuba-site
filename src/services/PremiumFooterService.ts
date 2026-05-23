import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET SECTION
========================================= */

export const getPremiumFooterSection =
  async () => {

    const { data, error } = await supabase
        .from("premium_footer_section")
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

export const updatePremiumFooterSection =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
        .from("premium_footer_section")
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

export const getPremiumFooterGroups =
  async () => {

    const { data, error } = await supabase
        .from("premium_footer_groups")
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

export const getPremiumFooterLinks =
  async () => {

    const { data, error } = await supabase
        .from("premium_footer_links")
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

export const updatePremiumFooterGroup =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
        .from("premium_footer_groups")
        .update(payload)
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

export const updatePremiumFooterLink =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
        .from("premium_footer_links")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

    if (error) {

      console.error(error);

    }

    return { data, error };

  };