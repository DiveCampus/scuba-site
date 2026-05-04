import { supabase } from "@/lib/supabaseClient";

// GET HERO
export const getHero = async () => {
  const { data, error } = await supabase
    .from("hero_section")
    .select("*")
    .order("created_at", { ascending: false }) // 🔥 important
    .limit(1)
    .single();

  return { data, error };
};
// UPDATE HERO
export const updateHero = async (data: any) => {
  return await supabase
    .from("hero_content")
    .update({
      top_text: data.top_text,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      price: data.price,
      old_price: data.old_price,
      cta_text: data.cta_text,
    })
    .eq("id", data.id)
    .select()
    .single();
};