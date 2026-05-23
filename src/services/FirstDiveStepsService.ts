import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET COMPLETE DATA
========================================= */

export const getFirstDiveSteps =
  async () => {

    /* SECTION */
    const { data: section, error: sectionError } = await supabase

      .from(
        "first_dive_steps_section"
      )

      .select("*")

      .limit(1)

      .single();

    /* CARDS */
    const { data: cards, error: cardsError } = await supabase

      .from(
        "first_dive_steps_cards"
      )

      .select("*")

      .order(
        "sort_order",
        {
          ascending: true,
        }
      );

    console.log(
      "FIRST DIVE SECTION =>",
      section
    );

    console.log(
      "FIRST DIVE CARDS =>",
      cards
    );

    if (sectionError) {

      console.error(
        "SECTION ERROR =>",
        sectionError
      );

    }

    if (cardsError) {

      console.error(
        "CARDS ERROR =>",
        cardsError
      );

    }

    return {

      section,

      cards,

    };

  };

/* =========================================
   UPDATE SECTION
========================================= */

export const updateFirstDiveStepsSection =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "first_dive_steps_section"
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

    if (error) {

      console.error(error);

    }

    return {

      data,

      error,

    };

  };

/* =========================================
   UPDATE CARD
========================================= */

export const updateFirstDiveStepsCard =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "first_dive_steps_cards"
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
      "UPDATED CARD =>",
      data
    );

    if (error) {

      console.error(error);

    }

    return {

      data,

      error,

    };

  };