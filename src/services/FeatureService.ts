import { supabase } from "@/lib/supabaseClient";

// GET
export const getFeatured = async () => {
  return await supabase
    .from("featured_content")
    .select("*")
    .limit(1)
    .single();
};

// UPDATE
export const updateFeatured = async (id: string, payload: any) => {
  return await supabase
    .from("featured_content")
    .update(payload)
    .eq("id", id);
};