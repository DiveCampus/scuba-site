import { supabase } from "@/lib/supabaseClient";

export const getHero = async () => {
  const { data, error } = await supabase
    .from("hero_section")
    .select("*")
    .limit(1)
    .single();

  return { data, error };
};
export const updateHero = async (hero: any) => {
  const { error } = await supabase
    .from("hero_section")
    .update({
      top_text: hero.top_text,
      title: hero.title,
      subtitle: hero.subtitle,
      description: hero.description,
      old_price: hero.old_price,
      price: hero.price,
      cta_text: hero.cta_text,
    })
    .eq("id", hero.id);

  return { error };
};