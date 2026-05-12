// =========================================
// EliteRescueComparisonService.ts
// =========================================

import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET COMPLETE DATA
========================================= */

export const getEliteRescueComparison =
  async () => {

    /* SECTION */
    const {

      data: section,

      error: sectionError,

    } = await supabase

      .from(
        "elite_rescue_comparison_section"
      )

      .select("*")

      .limit(1)

      .single();

    /* ROWS */
    const {

      data: rows,

      error: rowsError,

    } = await supabase

      .from(
        "elite_rescue_comparison_rows"
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
      "ROWS =>",
      rows
    );

    if (sectionError) {

      console.error(
        "SECTION ERROR =>",
        sectionError
      );

    }

    if (rowsError) {

      console.error(
        "ROWS ERROR =>",
        rowsError
      );

    }

    return {

      section,

      rows,

    };

  };

/* =========================================
   UPDATE SECTION
========================================= */

export const updateEliteRescueComparisonSection =
  async (

    id: string,

    payload: any

  ) => {

    const {

      data,

      error,

    } = await supabase

      .from(
        "elite_rescue_comparison_section"
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
   UPDATE ROW
========================================= */

export const updateEliteRescueComparisonRow =
  async (

    id: string,

    payload: any

  ) => {

    const {

      data,

      error,

    } = await supabase

      .from(
        "elite_rescue_comparison_rows"
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
      "UPDATED ROW =>",
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