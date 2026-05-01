import { supabase } from "@/lib/supabaseClient";

// GET ALL
export const getWhyCards = async () => {
  return await supabase
    .from("why_choose_us")
    .select("*")
    .order("position", { ascending: true });
};

// UPDATE
export const updateWhyCard = async (id: string, payload: any) => {
  return await supabase
    .from("why_choose_us")
    .update({
      title: payload.title,
      description: payload.description,
      image: payload.image,
    })
    .eq("id", id)
    .select();
};