import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET COMPLETE DATA
========================================= */

export const getGoldStandardDive =
  async () => {

    /* SECTION */
    const { data: section, error: sectionError } = await supabase
      .from(
        "gold_standard_dive_section"
      )
      .select("*")
      .limit(1)
      .single();

    /* TAGS */
    const { data: tags, error: tagsError } = await supabase
      .from(
        "gold_standard_dive_tags"
      )
      .select("*")
      .order(
        "sort_order",
        {
          ascending: true,
        }
      );

    /* IMAGES */
    const { data: images, error: imagesError } = await supabase
      .from(
        "gold_standard_dive_images"
      )
      .select("*")
      .order(
        "sort_order",
        {
          ascending: true,
        }
      );

    if (sectionError) {

      console.error(
        "SECTION ERROR =>",
        sectionError
      );

    }

    if (tagsError) {

      console.error(
        "TAGS ERROR =>",
        tagsError
      );

    }

    if (imagesError) {

      console.error(
        "IMAGES ERROR =>",
        imagesError
      );

    }

    return {

      section,

      tags,

      images,

    };

  };

/* =========================================
   UPDATE SECTION
========================================= */

export const updateGoldStandardDiveSection =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
      .from(
        "gold_standard_dive_section"
      )
      .update({

        ...payload,

        updated_at:
          new Date(),

      })
      .eq("id", id)
      .select()
      .single();

    if (error) {

      console.error(error);

    }

    return {

      data,

      error,

    };

  };

/* =========================================
   UPDATE TAG
========================================= */

export const updateGoldStandardDiveTag =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
      .from(
        "gold_standard_dive_tags"
      )
      .update({

        ...payload,

        updated_at:
          new Date(),

      })
      .eq("id", id)
      .select()
      .single();

    if (error) {

      console.error(error);

    }

    return {

      data,

      error,

    };

  };

/* =========================================
   UPDATE IMAGE
========================================= */

export const updateGoldStandardDiveImage =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
      .from(
        "gold_standard_dive_images"
      )
      .update({

        ...payload,

        updated_at:
          new Date(),

      })
      .eq("id", id)
      .select()
      .single();

    if (error) {

      console.error(error);

    }

    return {

      data,

      error,

    };

  };