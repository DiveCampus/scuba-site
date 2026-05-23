import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET COMPLETE DATA
========================================= */

export const getTryDiveFooter =
  async () => {

    /* SECTION */
    const { data: section, error: sectionError } = await supabase

      .from(
        "try_dive_footer_section"
      )

      .select("*")

      .limit(1)

      .single();

    /* LINKS */
    const { data: links, error: linksError } = await supabase

      .from(
        "try_dive_footer_links"
      )

      .select("*")

      .order(
        "sort_order",
        {
          ascending: true,
        }
      );

    /* SOCIALS */
    const { data: socials, error: socialsError } = await supabase

      .from(
        "try_dive_footer_socials"
      )

      .select("*")

      .order(
        "sort_order",
        {
          ascending: true,
        }
      );

    if (
      sectionError
    ) {

      console.error(
        sectionError
      );

    }

    if (
      linksError
    ) {

      console.error(
        linksError
      );

    }

    if (
      socialsError
    ) {

      console.error(
        socialsError
      );

    }

    return {

      section,

      links:
        links || [],

      socials:
        socials || [],

    };

  };

/* =========================================
   UPDATE SECTION
========================================= */

export const updateTryDiveFooterSection =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "try_dive_footer_section"
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
   UPDATE LINK
========================================= */

export const updateTryDiveFooterLink =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "try_dive_footer_links"
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
   UPDATE SOCIAL
========================================= */

export const updateTryDiveFooterSocial =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "try_dive_footer_socials"
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