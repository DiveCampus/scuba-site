// =========================================
// MasterScubaCTAService.ts
// =========================================

import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET DATA
========================================= */

export const getMasterScubaCTA =
  async () => {

    const { data, error } = await supabase

      .from(
        "master_scuba_cta"
      )

      .select("*")

      .limit(1)

      .single();

    console.log(
      "MASTER SCUBA CTA =>",
      data
    );

    if (error) {

      console.error(
        "MASTER SCUBA CTA ERROR =>",
        error
      );

    }

    return {

      data,

      error,

    };

  };

/* =========================================
   UPDATE DATA
========================================= */

export const updateMasterScubaCTA =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "master_scuba_cta"
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
      "UPDATED CTA =>",
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