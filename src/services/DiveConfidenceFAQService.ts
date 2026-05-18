import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET COMPLETE DATA
========================================= */

export const getDiveConfidenceFAQ =
  async () => {

    /* SECTION */
    const {

      data: section,

      error: sectionError,

    } = await supabase

      .from(
        "dive_confidence_section"
      )

      .select("*")

      .limit(1)

      .single();

    /* REVIEWS */
    const {

      data: reviews,

      error: reviewError,

    } = await supabase

      .from(
        "dive_confidence_reviews"
      )

      .select("*")

      .order(
        "sort_order",
        {
          ascending: true,
        }
      );

    /* FAQS */
    const {

      data: faqs,

      error: faqError,

    } = await supabase

      .from(
        "dive_confidence_faqs"
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
      "REVIEWS =>",
      reviews
    );

    console.log(
      "FAQS =>",
      faqs
    );

    if (sectionError) {

      console.error(
        "SECTION ERROR =>",
        sectionError
      );

    }

    if (reviewError) {

      console.error(
        "REVIEW ERROR =>",
        reviewError
      );

    }

    if (faqError) {

      console.error(
        "FAQ ERROR =>",
        faqError
      );

    }

    return {

      section,

      reviews,

      faqs,

    };

  };

/* =========================================
   UPDATE SECTION
========================================= */

export const updateDiveConfidenceSection =
  async (

    id: string,

    payload: any

  ) => {

    const {

      data,

      error,

    } = await supabase

      .from(
        "dive_confidence_section"
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
   UPDATE REVIEW
========================================= */

export const updateDiveConfidenceReview =
  async (

    id: string,

    payload: any

  ) => {

    const {

      data,

      error,

    } = await supabase

      .from(
        "dive_confidence_reviews"
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
   UPDATE FAQ
========================================= */

export const updateDiveConfidenceFAQItem =
  async (

    id: string,

    payload: any

  ) => {

    const {

      data,

      error,

    } = await supabase

      .from(
        "dive_confidence_faqs"
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