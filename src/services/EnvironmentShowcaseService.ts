import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET COMPLETE DATA
========================================= */

export const getEnvironmentShowcase =
  async () => {

    /* SECTION */
    const { data: section, error: sectionError } = await supabase
      .from(
        "environment_showcase_section"
      )
      .select("*")
      .limit(1)
      .single();

    /* CARDS */
    const { data: cards, error: cardsError } = await supabase
      .from(
        "environment_showcase_cards"
      )
      .select("*")
      .order(
        "sort_order",
        {
          ascending: true,
        }
      );

    /* FOOTER GROUPS */
    const { data: footerGroups, error: groupsError } = await supabase
      .from(
        "environment_showcase_footer_groups"
      )
      .select("*")
      .order(
        "sort_order",
        {
          ascending: true,
        }
      );

    /* FOOTER LINKS */
    const { data: footerLinks, error: linksError } = await supabase
      .from(
        "environment_showcase_footer_links"
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

    if (cardsError) {

      console.error(
        "CARDS ERROR =>",
        cardsError
      );

    }

    if (groupsError) {

      console.error(
        "GROUPS ERROR =>",
        groupsError
      );

    }

    if (linksError) {

      console.error(
        "LINKS ERROR =>",
        linksError
      );

    }

    return {

      section,

      cards,

      footerGroups,

      footerLinks,

    };

  };

/* =========================================
   UPDATE SECTION
========================================= */

export const updateEnvironmentShowcaseSection =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
      .from(
        "environment_showcase_section"
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
   UPDATE CARD
========================================= */

export const updateEnvironmentShowcaseCard =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
      .from(
        "environment_showcase_cards"
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
   UPDATE FOOTER GROUP
========================================= */

export const updateEnvironmentShowcaseFooterGroup =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
      .from(
        "environment_showcase_footer_groups"
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
   UPDATE FOOTER LINK
========================================= */

export const updateEnvironmentShowcaseFooterLink =
  async (
    id: string,
    payload: any
  ) => {

    const { data, error } = await supabase
      .from(
        "environment_showcase_footer_links"
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