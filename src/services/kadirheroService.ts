import { supabase } from "@/lib/supabaseClient";

// ==========================
// GET HERO
// ==========================

export const getMainHero = async () => {
  const { data, error } = await supabase
    .from("kadir_main_hero")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error(
      "❌ [GET HERO ERROR]",
      error.message
    );
  }

  return { data, error };
};

// ==========================
// UPDATE HERO
// ==========================

export const updateMainHero = async (
  data: any
) => {
  const response = await supabase
    .from("kadir_main_hero")
    .update({
      top_text: data.top_text,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      primary_cta_text: data.primary_cta_text,
      primary_cta_link: data.primary_cta_link,
      secondary_cta_text: data.secondary_cta_text,
      secondary_cta_link: data.secondary_cta_link,
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.id)
    .select()
    .single();

  if (response.error) {
    console.error(
      "❌ [UPDATE HERO ERROR]",
      response.error.message
    );
  }

  return response;
};