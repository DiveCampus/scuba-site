// =========================================
// LocationFooterService.ts
// =========================================

import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET COMPLETE DATA
========================================= */

export const getLocationFooter =
  async () => {

    /* SECTION */
    const { data: section, error: sectionError } = await supabase

      .from(
        "location_footer_section"
      )

      .select("*")

      .limit(1)

      .single();

    /* FEATURES */
    const { data: features, error: featuresError } = await supabase

      .from(
        "location_footer_features"
      )

      .select("*")

      .order(
        "sort_order",
        {
          ascending: true,
        }
      );

    /* GROUPS */
    const { data: groups, error: groupsError } = await supabase

      .from(
        "location_footer_groups"
      )

      .select("*")

      .order(
        "sort_order",
        {
          ascending: true,
        }
      );

    /* LINKS */
    const { data: links, error: linksError } = await supabase

      .from(
        "location_footer_links"
      )

      .select("*")

      .order(
        "sort_order",
        {
          ascending: true,
        }
      );

    console.log(
      "LOCATION FOOTER =>",
      {
        section,
        features,
        groups,
        links,
      }
    );

    if (sectionError) {

      console.error(
        "SECTION ERROR =>",
        sectionError
      );

    }

    if (featuresError) {

      console.error(
        "FEATURES ERROR =>",
        featuresError
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

      features,

      groups,

      links,

    };

  };

/* =========================================
   UPDATE SECTION
========================================= */

export const updateLocationFooterSection =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "location_footer_section"
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
   UPDATE FEATURE
========================================= */

export const updateLocationFooterFeature =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "location_footer_features"
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
   UPDATE GROUP
========================================= */

export const updateLocationFooterGroup =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "location_footer_groups"
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
   UPDATE LINK
========================================= */

export const updateLocationFooterLink =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "location_footer_links"
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