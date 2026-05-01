import { supabase } from "@/lib/supabaseClient";

export const getFaqs = async () => {
  return await supabase
    .from("faq")
    .select("*")
    .order("position", { ascending: true });
};

export const updateFaq = async (id: string, payload: any) => {
  return await supabase
    .from("faq")
    .update({
      question: payload.question,
      answer: payload.answer,
    })
    .eq("id", id);
};