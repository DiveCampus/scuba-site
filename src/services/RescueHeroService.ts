import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET SECTION
========================================= */

export const getRescueHero =
  async () => {

    const {

      data,

      error,

    } = await supabase

      .from(
        "rescue_hero_section"
      )

      .select("*")

      .limit(1)

      .single();

    console.log(
      "RESCUE HERO DATA =>",
      data
    );

    console.log(
      "RESCUE HERO ERROR =>",
      error
    );

    if (error) {

      console.error(error);

    }

    return {

      data,

      error,

    };

  };

/* =========================================
   UPDATE SECTION
========================================= */

export const updateRescueHero =
  async (

    id: string,

    payload: any

  ) => {

    const {

      data,

      error,

    } = await supabase

      .from(
        "rescue_hero_section"
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
      "UPDATED RESCUE HERO =>",
      data
    );

    console.log(
      "UPDATE ERROR =>",
      error
    );

    if (error) {

      console.error(error);

    }

    return {

      data,

      error,

    };

  };