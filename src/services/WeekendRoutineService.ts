import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET COMPLETE DATA
========================================= */

export const getWeekendRoutine =
  async () => {

    /* SECTION */
    const {

      data: section,

      error: sectionError,

    } = await supabase

      .from(
        "weekend_routine_section"
      )

      .select("*")

      .limit(1)

      .single();

    /* IMAGES */
    const {

      data: images,

      error: imagesError,

    } = await supabase

      .from(
        "weekend_routine_images"
      )

      .select("*")

      .order(
        "sort_order",
        {
          ascending: true,
        }
      );

    /* GIFT CARD */
    const {

      data: giftCard,

      error: giftError,

    } = await supabase

      .from(
        "weekend_routine_gift_card"
      )

      .select("*")

      .limit(1)

      .single();

    console.log(
      "SECTION =>",
      section
    );

    console.log(
      "IMAGES =>",
      images
    );

    console.log(
      "GIFT CARD =>",
      giftCard
    );

    if (sectionError) {

      console.error(
        "SECTION ERROR =>",
        sectionError
      );

    }

    if (imagesError) {

      console.error(
        "IMAGES ERROR =>",
        imagesError
      );

    }

    if (giftError) {

      console.error(
        "GIFT ERROR =>",
        giftError
      );

    }

    return {

      section,

      images,

      giftCard,

    };

  };

/* =========================================
   UPDATE SECTION
========================================= */

export const updateWeekendRoutineSection =
  async (

    id: string,

    payload: any

  ) => {

    const {

      data,

      error,

    } = await supabase

      .from(
        "weekend_routine_section"
      )

      .update({

        ...payload,

        updated_at:
          new Date(),

      })

      .eq("id", id)

      .select()

      .single();

    return {

      data,

      error,

    };

  };

/* =========================================
   UPDATE IMAGE
========================================= */

export const updateWeekendRoutineImage =
  async (

    id: string,

    payload: any

  ) => {

    const {

      data,

      error,

    } = await supabase

      .from(
        "weekend_routine_images"
      )

      .update({

        ...payload,

        updated_at:
          new Date(),

      })

      .eq("id", id)

      .select()

      .single();

    return {

      data,

      error,

    };

  };

/* =========================================
   UPDATE GIFT CARD
========================================= */

export const updateWeekendRoutineGiftCard =
  async (

    id: string,

    payload: any

  ) => {

    const {

      data,

      error,

    } = await supabase

      .from(
        "weekend_routine_gift_card"
      )

      .update({

        ...payload,

        updated_at:
          new Date(),

      })

      .eq("id", id)

      .select()

      .single();

    return {

      data,

      error,

    };

  };