import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET COMPLETE DATA
========================================= */
export const getRescueFAQ =
async () => {

  const [

    { data: section, error: sectionError },

    { data: reviews, error: reviewsError },

    { data: faqs, error: faqError },

  ] = await Promise.all([

    supabase
      .from("rescue_faq_section")
      .select("*")
      .single(),

    supabase
      .from("rescue_faq_reviews")
      .select("*")
      .order("sort_order"),

    supabase
      .from("rescue_faq_items")
      .select("*")
      .order("sort_order"),

  ]);

  if (sectionError)
    console.error(sectionError);

  if (reviewsError)
    console.error(reviewsError);

  if (faqError)
    console.error(faqError);

  return {

    section,

    reviews: reviews || [],

    faqs: faqs || [],

  };

};


/* =========================================
   UPDATE SECTION
========================================= */
export const updateRescueFAQSection =
async (
  id: string,
  payload: any
) => {

  return await supabase
    .from("rescue_faq_section")
    .update({
      ...payload,
      updated_at: new Date(),
    })
    .eq("id", id)
    .select()
    .single();

};


/* =========================================
   UPDATE REVIEW
========================================= */
export const updateRescueFAQReview =
async (
  id: string,
  payload: any
) => {

  return await supabase
    .from("rescue_faq_reviews")
    .update({
      ...payload,
      updated_at: new Date(),
    })
    .eq("id", id)
    .select()
    .single();

};


/* =========================================
   UPDATE FAQ
========================================= */
export const updateRescueFAQItem =
async (
  id: string,
  payload: any
) => {

  return await supabase
    .from("rescue_faq_items")
    .update({
      ...payload,
      updated_at: new Date(),
    })
    .eq("id", id)
    .select()
    .single();

};