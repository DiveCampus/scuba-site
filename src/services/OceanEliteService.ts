import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET SECTION
========================================= */

export const getOceanEliteSection =
  async () => {

    const { data, error } =
      await supabase
        .from("ocean_elite_section")
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

export const updateOceanEliteSection =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from("ocean_elite_section")
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
   GET REVIEWS
========================================= */

export const getOceanEliteReviews =
  async () => {

    const { data, error } =
      await supabase
        .from("ocean_elite_reviews")
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
   CREATE REVIEW
========================================= */

export const createOceanEliteReview =
  async (payload: any) => {

    const { data, error } =
      await supabase
        .from("ocean_elite_reviews")
        .insert([payload])
        .select()
        .single();

    if (error) {

      console.error(error);

    }

    return { data, error };

  };

/* =========================================
   UPDATE REVIEW
========================================= */

export const updateOceanEliteReview =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from("ocean_elite_reviews")
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
   GET FAQS
========================================= */

export const getOceanEliteFaqs =
  async () => {

    const { data, error } =
      await supabase
        .from("ocean_elite_faqs")
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
   CREATE FAQ
========================================= */

export const createOceanEliteFaq =
  async (payload: any) => {

    const { data, error } =
      await supabase
        .from("ocean_elite_faqs")
        .insert([payload])
        .select()
        .single();

    if (error) {

      console.error(error);

    }

    return { data, error };

  };

/* =========================================
   UPDATE FAQ
========================================= */

export const updateOceanEliteFaq =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from("ocean_elite_faqs")
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
