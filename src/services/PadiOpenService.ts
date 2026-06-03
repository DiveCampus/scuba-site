import { supabase } from "@/lib/supabaseClient";
import { normalizePricing } from "./heroServiceOpen";

/* =========================
   GET DATA
========================= */

export const getPadiOpenDiver =
  async () => {

    const { data, error } = await supabase
      .from(
        "kadir_padi_open_diver"
      )
      .select("*")
      .limit(1)
      .single();

    // Normalize new_price -> price so the public UI only reads `price`.
    return {
      data: normalizePricing(data),
      error,
    };
  };

/* =========================
   CREATE
========================= */

export const createPadiOpenDiver =
  async (payload: any) => {

    const { data, error } = await supabase
      .from(
        "kadir_padi_open_diver"
      )
      .insert([
        payload,
      ])
      .select()
      .single();

    return {
      data,
      error,
    };
  };

/* =========================
   UPDATE
========================= */

export const updatePadiOpenDiver =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
      .from(
        "kadir_padi_open_diver"
      )
      .update({
        ...payload,

        updated_at:
          new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    return {
      data,
      error,
    };
  };

/* =========================
   DELETE
========================= */

export const deletePadiOpenDiver =
  async (
    id: string
  ) => {

    const { error } = await supabase
        .from(
          "kadir_padi_open_diver"
        )
        .delete()
        .eq("id", id);

    return {
      error,
    };
  };