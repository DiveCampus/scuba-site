import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET COMPLETE DATA
========================================= */

export const getExpertHands =
  async () => {

    /* SECTION */
    const { data: section, error: sectionError } = await supabase

      .from(
        "expert_hands_section"
      )

      .select("*")

      .limit(1)

      .single();

    /* FEATURES */
    const { data: features, error: featuresError } = await supabase

      .from(
        "expert_hands_features"
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
      "FEATURES =>",
      features
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
      featuresError
    ) {

      console.error(
        "FEATURE ERROR =>",
        featuresError
      );

    }

    return {

      section,

      features,

    };

  };

/* =========================================
   UPDATE SECTION
========================================= */

export const updateExpertHandsSection =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "expert_hands_section"
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
   UPDATE FEATURE
========================================= */

export const updateExpertHandsFeature =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "expert_hands_features"
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
      "UPDATED FEATURE =>",
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
   ADD FEATURE
========================================= */

export const createExpertHandsFeature =
  async (

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "expert_hands_features"
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
   DELETE FEATURE
========================================= */

export const deleteExpertHandsFeature =
  async (

    id: string

  ) => {

    const {

      error,

    } = await supabase

      .from(
        "expert_hands_features"
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