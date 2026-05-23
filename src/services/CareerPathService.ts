import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET SECTION
========================================= */

export const getCareerPathSection =
  async () => {

    const { data, error } = await supabase
        .from("career_path_section")
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

export const updateCareerPathSection =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
        .from("career_path_section")
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
   GET BENEFITS
========================================= */

export const getCareerPathBenefits =
  async () => {

    const { data, error } = await supabase
        .from("career_path_benefits")
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
   UPDATE BENEFIT
========================================= */

export const updateCareerPathBenefit =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
        .from("career_path_benefits")
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

export const getCareerPathFaqs =
  async () => {

    const { data, error } = await supabase
        .from("career_path_faqs")
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
   UPDATE FAQ
========================================= */

export const updateCareerPathFaq =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
        .from("career_path_faqs")
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