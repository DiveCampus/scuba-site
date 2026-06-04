import { supabase } from "@/lib/supabaseClient";

// =====================================
// GET TESTIMONIALS
// =====================================

export const getTestimonials = async () => {
  console.log("🚀 [GET TESTIMONIALS] Fetching...");

  const response = await supabase
    .from("kadir_testimonials")
    .select(
      "id, category, feature, others, dive_campus, position, section_title, section_subtitle, tab_title, created_at, updated_at"
    )
    .order("position", { ascending: true });

  if (response.error) {
    console.error(
      "❌ [GET TESTIMONIALS ERROR]",
      response.error
    );
  }

  return response;
};

// =====================================
// UPDATE TESTIMONIAL
// =====================================

export const updateTestimonial = async (
  id: string,
  payload: any
) => {
  const response = await supabase
    .from("kadir_testimonials")
    .update({
      category: payload.category,
      feature: payload.feature,
      others: payload.others,
      dive_campus: payload.dive_campus,
      section_title: payload.section_title,
      section_subtitle: payload.section_subtitle,
      tab_title: payload.tab_title,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (response.error) {
    console.error(
      "❌ [UPDATE TESTIMONIAL ERROR]",
      response.error
    );
  }

  return response;
};
