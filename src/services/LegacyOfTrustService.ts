import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET DATA
========================================= */

export const getLegacyOfTrust =
  async () => {

    const { data, error } = await supabase

      .from(
        "legacy_of_trust_section"
      )

      .select("*")

      .limit(1)

      .single();

    console.log(
      "LEGACY OF TRUST =>",
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

      section:
        data,

    };

  };

/* =========================================
   UPDATE
========================================= */

export const updateLegacyOfTrust =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "legacy_of_trust_section"
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
      "UPDATED =>",
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