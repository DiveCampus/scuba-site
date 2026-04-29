import { supabase } from "@/lib/supabaseClient";

// GET HERO
export const getHero = async () => {
  return await supabase
    .from("hero_content")
    .select("*")
    .limit(1)
    .single();
};

// UPDATE HERO
export const updateHero = async (data: any) => {
  return await supabase
    .from("hero_content")
    .update({
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      price: data.price,
      old_price: data.old_price,
    })
    .eq("id", data.id)
    .select()
    .single();
};