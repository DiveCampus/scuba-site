// =========================================
// GlobalPassportService.ts
// =========================================

import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET SECTION
========================================= */

export const getGlobalPassportSection =
  async () => {

    const { data, error } = await supabase
        .from("global_passport_section")
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

export const updateGlobalPassportSection =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
        .from("global_passport_section")
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

export const getGlobalPassportReviews =
  async () => {

    const { data, error } = await supabase
        .from("global_passport_reviews")
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

export const createGlobalPassportReview =
  async (payload: any) => {

    const { data, error } = await supabase
        .from("global_passport_reviews")
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

export const updateGlobalPassportReview =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
        .from("global_passport_reviews")
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
   DELETE REVIEW
========================================= */

export const deleteGlobalPassportReview =
  async (id: string) => {

    const { error } = await supabase
        .from("global_passport_reviews")
        .delete()
        .eq("id", id);

    if (error) {
      console.error(error);
    }

    return { error };
  };

/* =========================================
   GET FAQS
========================================= */

export const getGlobalPassportFaqs =
  async () => {

    const { data, error } = await supabase
        .from("global_passport_faqs")
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

export const createGlobalPassportFaq =
  async (payload: any) => {

    const { data, error } = await supabase
        .from("global_passport_faqs")
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

export const updateGlobalPassportFaq =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
        .from("global_passport_faqs")
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
   DELETE FAQ
========================================= */

export const deleteGlobalPassportFaq =
  async (id: string) => {

    const { error } = await supabase
        .from("global_passport_faqs")
        .delete()
        .eq("id", id);

    if (error) {
      console.error(error);
    }

    return { error };
  };