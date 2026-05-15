// =========================================
// DiveTrainingShowcaseService.ts
// =========================================

import { supabase }
from "@/lib/supabaseClient";

/* =========================================
   GET COMPLETE DATA
========================================= */

export const getDiveTrainingShowcase =
async () => {

  /* SECTION */
  const {
    data: section,
    error: sectionError,
  } = await supabase
    .from(
      "dive_training_showcase_section"
    )
    .select("*")
    .limit(1)
    .maybeSingle();

  /* TAGS */
  const {
    data: tags,
    error: tagsError,
  } = await supabase
    .from(
      "dive_training_showcase_tags"
    )
    .select("*")
    .order("sort_order", {
      ascending: true,
    });

  /* IMAGES */
  const {
    data: images,
    error: imagesError,
  } = await supabase
    .from(
      "dive_training_showcase_images"
    )
    .select("*")
    .order("sort_order", {
      ascending: true,
    });

  console.log(
    "SHOWCASE SECTION =>",
    section
  );

  console.log(
    "SHOWCASE TAGS =>",
    tags
  );

  console.log(
    "SHOWCASE IMAGES =>",
    images
  );

  if (sectionError)
    console.error(sectionError);

  if (tagsError)
    console.error(tagsError);

  if (imagesError)
    console.error(imagesError);

  return {
    section,
    tags: tags || [],
    images: images || [],
  };
};


/* =========================================
   UPDATE SECTION
========================================= */

export const updateDiveTrainingShowcaseSection =
async (
  id: string,
  payload: any
) => {

  const {
    data,
    error,
  } = await supabase
    .from(
      "dive_training_showcase_section"
    )
    .update({
      ...payload,
      updated_at:
        new Date(),
    })
    .eq("id", id)
    .select()
    .single();

  console.log(
    "UPDATED SECTION =>",
    data
  );

  if (error)
    console.error(error);

  return {
    data,
    error,
  };
};


/* =========================================
   UPDATE TAG
========================================= */

export const updateDiveTrainingTag =
async (
  id: string,
  payload: any
) => {

  const {
    data,
    error,
  } = await supabase
    .from(
      "dive_training_showcase_tags"
    )
    .update({
      ...payload,
      updated_at:
        new Date(),
    })
    .eq("id", id)
    .select()
    .single();

  console.log(
    "UPDATED TAG =>",
    data
  );

  if (error)
    console.error(error);

  return {
    data,
    error,
  };
};


/* =========================================
   UPDATE IMAGE
========================================= */

export const updateDiveTrainingImage =
async (
  id: string,
  payload: any
) => {

  const {
    data,
    error,
  } = await supabase
    .from(
      "dive_training_showcase_images"
    )
    .update({
      ...payload,
      updated_at:
        new Date(),
    })
    .eq("id", id)
    .select()
    .single();

  console.log(
    "UPDATED IMAGE =>",
    data
  );

  if (error)
    console.error(error);

  return {
    data,
    error,
  };
};