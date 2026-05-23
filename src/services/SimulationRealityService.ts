// =========================================
// SimulationRealityService.ts
// =========================================

import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET COMPLETE DATA
========================================= */

export const getSimulationReality =
  async () => {

    /* SECTION */
    const { data: section, error: sectionError } = await supabase

      .from(
        "simulation_reality_section"
      )

      .select("*")

      .limit(1)

      .single();

    /* FEATURES */
    const { data: features, error: featuresError } = await supabase

      .from(
        "simulation_reality_features"
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
      "FEATURES =>",
      features
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

    return {

      section,

      features,

    };

  };

/* =========================================
   UPDATE SECTION
========================================= */

export const updateSimulationRealitySection =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "simulation_reality_section"
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
   UPDATE FEATURE
========================================= */

export const updateSimulationRealityFeature =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "simulation_reality_features"
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
      "UPDATED FEATURE =>",
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