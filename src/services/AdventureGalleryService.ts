import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET COMPLETE DATA
========================================= */

export const getAdventureGallery =
  async () => {

    /* SECTION */
    const { data: section, error: sectionError } = await supabase

      .from(
        "adventure_gallery_section"
      )

      .select("*")

      .limit(1)

      .single();

    /* IMAGES */
    const { data: images, error: imagesError } = await supabase

      .from(
        "adventure_gallery_images"
      )

      .select("*")

      .order(
        "sort_order",
        {
          ascending: true,
        }
      );

    console.log(
      "SECTION =>",
      section
    );

    console.log(
      "IMAGES =>",
      images
    );

    if (
      sectionError
    ) {

      console.error(
        "SECTION ERROR =>",
        sectionError
      );

    }

    if (
      imagesError
    ) {

      console.error(
        "IMAGES ERROR =>",
        imagesError
      );

    }

    return {

      section,

      images:
        images || [],

    };

  };

/* =========================================
   UPDATE SECTION
========================================= */

export const updateAdventureGallerySection =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "adventure_gallery_section"
      )

      .update({

        ...payload,

        updated_at:
          new Date(),

      })

      .eq(
        "id",
        id
      )

      .select()

      .single();

    console.log(
      "UPDATED SECTION =>",
      data
    );

    if (
      error
    ) {

      console.error(
        error
      );

    }

    return {

      data,

      error,

    };

  };

/* =========================================
   UPDATE IMAGE
========================================= */

export const updateAdventureGalleryImage =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "adventure_gallery_images"
      )

      .update({

        ...payload,

        updated_at:
          new Date(),

      })

      .eq(
        "id",
        id
      )

      .select()

      .single();

    console.log(
      "UPDATED IMAGE =>",
      data
    );

    if (
      error
    ) {

      console.error(
        error
      );

    }

    return {

      data,

      error,

    };

  };

/* =========================================
   CREATE IMAGE
========================================= */

export const createAdventureGalleryImage =
  async (

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "adventure_gallery_images"
      )

      .insert([
        payload
      ])

      .select()

      .single();

    return {

      data,

      error,

    };

  };

/* =========================================
   DELETE IMAGE
========================================= */

export const deleteAdventureGalleryImage =
  async (

    id: string

  ) => {

    const {

      error,

    } = await supabase

      .from(
        "adventure_gallery_images"
      )

      .delete()

      .eq(
        "id",
        id
      );

    return {

      error,

    };

  };