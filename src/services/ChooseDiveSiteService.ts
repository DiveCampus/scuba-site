import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET COMPLETE DATA
========================================= */

export const getChooseDiveSite =
  async () => {

    /* SECTION */
    const { data: section, error: sectionError } = await supabase

      .from(
        "choose_dive_site_section"
      )

      .select("*")

      .limit(1)

      .single();

    /* CARDS */
    const { data: cards, error: cardsError } = await supabase

      .from(
        "choose_dive_site_cards"
      )

      .select("*")

      .order(
        "sort_order",
        {
          ascending: true,
        }
      );

    /* ITEMS */
    const { data: items, error: itemsError } = await supabase

      .from(
        "choose_dive_site_items"
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
      "CARDS =>",
      cards
    );

    console.log(
      "ITEMS =>",
      items
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

    if (itemsError) {

      console.error(
        "ITEMS ERROR =>",
        itemsError
      );

    }

    return {

      section,

      cards,

      items,

    };

  };

/* =========================================
   UPDATE SECTION
========================================= */

export const updateChooseDiveSiteSection =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "choose_dive_site_section"
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

    return {

      data,

      error,

    };

  };

/* =========================================
   UPDATE CARD
========================================= */

export const updateChooseDiveSiteCard =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "choose_dive_site_cards"
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

    return {

      data,

      error,

    };

  };

/* =========================================
   UPDATE ITEM
========================================= */

export const updateChooseDiveSiteItem =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "choose_dive_site_items"
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

    return {

      data,

      error,

    };

  };