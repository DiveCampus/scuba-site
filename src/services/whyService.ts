import { supabase } from "@/lib/supabaseClient";

// GET ALL
export const getWhyCards = async () => {
  return await supabase
    .from("kadir_why_choose_us")
    .select("*")
    .order("position", { ascending: true });
};

// UPDATE
export const updateWhyCard = async (
  id: string,
  payload: any
) => {
  return await supabase
    .from("kadir_why_choose_us")
    .update({
      title: payload.title,
      description: payload.description,
      image: payload.image,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();
};