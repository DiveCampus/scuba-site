import { supabase } from "@/lib/supabaseClient";

export const getTestimonials = async () => {
  return await supabase
    .from("testimonials")
    .select("*")
    .order("position", { ascending: true });
};

export const updateTestimonial = async (id: string, payload: any) => {
  return await supabase
    .from("testimonials")
    .update({
      category: payload.category,
      feature: payload.feature,
      others: payload.others,
      dive_campus: payload.dive_campus,
    })
    .eq("id", id);
};