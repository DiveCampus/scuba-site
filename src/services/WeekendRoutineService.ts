import { supabase } from "@/lib/supabaseClient";

/* =========================================================
   WEEKEND ROUTINE — SERVICE LAYER
   Tables:
     - weekend_routine_section     (single row)
     - weekend_routine_images      (many rows, ordered by sort_order)
     - weekend_routine_gift_card   (single row)
   NOTE: the active/inactive toggle needs an `is_active` column:
     ALTER TABLE weekend_routine_images
       ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;
========================================================= */

const now = () => new Date().toISOString();

/* =========================================================
   GET COMPLETE DATA
   Returns ALL images (active + inactive) so the admin can
   manage them. The public component filters inactive ones.
========================================================= */
export const getWeekendRoutine = async () => {
  /* SECTION */
  const { data: section, error: sectionError } = await supabase
    .from("weekend_routine_section")
    .select("*")
    .limit(1)
    .single();

  /* IMAGES */
  const { data: images, error: imagesError } = await supabase
    .from("weekend_routine_images")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  /* GIFT CARD */
  const { data: giftCard, error: giftError } = await supabase
    .from("weekend_routine_gift_card")
    .select("*")
    .limit(1)
    .single();

  if (sectionError) console.error("SECTION ERROR =>", sectionError);
  if (imagesError) console.error("IMAGES ERROR =>", imagesError);
  if (giftError) console.error("GIFT ERROR =>", giftError);

  return { section, images: images || [], giftCard };
};

/* =========================================================
   UPDATE SECTION
========================================================= */
export const updateWeekendRoutineSection = async (
  id: string,
  payload: {
    title?: string;
    highlighted_title?: string;
    description?: string;
    cta_button?: string;
    cta_link?: string;
  }
) => {
  const { data, error } = await supabase
    .from("weekend_routine_section")
    .update({ ...payload, updated_at: now() })
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

/* =========================================================
   UPDATE GIFT CARD
========================================================= */
export const updateWeekendRoutineGiftCard = async (
  id: string,
  payload: {
    emoji?: string;
    title?: string;
    description?: string;
    notice?: string;
    button_text?: string;
    button_link?: string;
  }
) => {
  const { data, error } = await supabase
    .from("weekend_routine_gift_card")
    .update({ ...payload, updated_at: now() })
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

/* =========================================================
   IMAGES — CRUD
========================================================= */

/* CREATE */
export const createWeekendRoutineImage = async (payload: {
  image_url?: string;
  image_alt?: string;
  sort_order?: number;
  is_active?: boolean;
}) => {
  const { data, error } = await supabase
    .from("weekend_routine_images")
    .insert({
      image_url: payload.image_url ?? "",
      image_alt: payload.image_alt ?? "",
      sort_order: payload.sort_order ?? 0,
      is_active: payload.is_active ?? true,
    })
    .select()
    .single();

  return { data, error };
};

/* UPDATE */
export const updateWeekendRoutineImage = async (
  id: string,
  payload: {
    image_url?: string;
    image_alt?: string;
    sort_order?: number;
    is_active?: boolean;
  }
) => {
  const { data, error } = await supabase
    .from("weekend_routine_images")
    .update({ ...payload, updated_at: now() })
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

/* DELETE */
export const deleteWeekendRoutineImage = async (id: string) => {
  const { error } = await supabase
    .from("weekend_routine_images")
    .delete()
    .eq("id", id);

  return { error };
};

/* REORDER
   Accepts the images in their desired order and rewrites
   sort_order = 1..n so ordering is stable and unique. */
export const reorderWeekendRoutineImage = async (
  orderedImages: { id: string }[]
) => {
  const results = await Promise.all(
    orderedImages.map((img, index) =>
      supabase
        .from("weekend_routine_images")
        .update({ sort_order: index + 1, updated_at: now() })
        .eq("id", img.id)
    )
  );

  const error = results.find((r) => r.error)?.error ?? null;
  return { error };
};
