import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET COMPLETE DATA
========================================= */

export const getDivetry =
  async () => {

    /* SECTION */
    const { data: section, error: sectionError } = await supabase

      .from(
        "divetry_section"
      )

      .select("*")

      .limit(1)

      .single();

    /* CARDS */
    const { data: cards, error: cardsError } = await supabase

      .from(
        "divetry_cards"
      )

      .select("*")

      .order(
        "sort_order",
        {
          ascending: true,
        }
      );

    console.log(
      "DIVETRY SECTION =>",
      section
    );

    console.log(
      "DIVETRY CARDS =>",
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

export const updateDivetrySection =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "divetry_section"
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

export const updateDivetryCard =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "divetry_cards"
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