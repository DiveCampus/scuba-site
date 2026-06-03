// src/services/heroServiceOpen.ts

import { supabase } from "@/lib/supabaseClient";

// ======================================================
// TYPES — single source of truth for the Hero schema
// ======================================================

export interface HeroOpen {
  id?: number;

  top_text: string;
  title: string;
  subtitle: string;
  description: string;

  primary_cta_text: string;
  primary_cta_link: string;

  secondary_cta_text: string;
  secondary_cta_link: string;

  // Frontend pricing is ALWAYS just these two. The backend column may be
  // `price` OR `new_price` depending on the table — normalizePricing() below
  // collapses both into `price` so the UI never has to know the difference.
  price: string;
  old_price: string;

  created_at?: string;
  updated_at?: string;
}

export interface HeroResult {
  data: HeroOpen | null;
  error: Error | null;
}

// ======================================================
// PRICING NORMALIZATION
// ======================================================
//
// THE ONLY place backend pricing column variants are read. Supabase tables
// disagree on schema — some return `price`, some return `new_price` — so this
// is the single seam that maps BOTH into one consistent frontend shape:
//
//   price     = data.price ?? data.new_price ?? ""
//   old_price = data.old_price ?? ""
//
// No DB migration, no column renames. `new_price` is left untouched on the raw
// object (admin editors still write the real column) but is never read by UI.

export const normalizePricing = <T extends Record<string, unknown>>(
  data: T | null
): (T & { price: string; old_price: string }) | null => {
  if (!data) return null;

  return {
    ...data,
    price: (data.price ?? data.new_price ?? "") as string,
    old_price: (data.old_price ?? "") as string,
  };
};

// ======================================================
// GENERIC FETCHER
// ======================================================

const fetchHero = async (table: string): Promise<HeroResult> => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .single();

  if (error) {
    console.error(`Error fetching ${table}:`, error);
    return { data: null, error };
  }

  return { data: normalizePricing(data) as HeroOpen, error: null };
};

// ======================================================
// GENERIC UPSERT — updates the existing row or inserts the first one
// ======================================================

const updateHero = async (
  table: string,
  payload: Partial<HeroOpen>
): Promise<HeroResult> => {
  const { data: existing } = await supabase
    .from(table)
    .select("id")
    .limit(1)
    .maybeSingle();

  if (!existing?.id) {
    const { data, error } = await supabase
      .from(table)
      .insert([payload])
      .select("*")
      .single();

    if (error) {
      console.error(`Error inserting ${table}:`, error);
      return { data: null, error };
    }

    return { data: data as HeroOpen, error: null };
  }

  const { data, error } = await supabase
    .from(table)
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", existing.id)
    .select("*")
    .single();

  if (error) {
    console.error(`Error updating ${table}:`, error);
    return { data: null, error };
  }

  return { data: data as HeroOpen, error: null };
};

// ======================================================
// HERO SERVICE FACTORY — scalable to any future hero page
// ======================================================

export const createHeroService = (table: string) => ({
  get: (): Promise<HeroResult> => fetchHero(table),
  update: (payload: Partial<HeroOpen>): Promise<HeroResult> =>
    updateHero(table, payload),
});

// ======================================================
// MAIN HERO
// ======================================================

const HERO_MAIN_TABLE = "hero_main";

export const getMainHero = (): Promise<HeroResult> =>
  fetchHero(HERO_MAIN_TABLE);

export const updateMainHero = (
  payload: Partial<HeroOpen>
): Promise<HeroResult> => updateHero(HERO_MAIN_TABLE, payload);
