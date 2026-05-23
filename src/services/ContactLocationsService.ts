import { supabase } from "@/lib/supabaseClient";

/* =========================================
   GET DATA
========================================= */

export const getContactLocations =
  async () => {

    const { data, error } = await supabase

      .from(
        "contact_locations"
      )

      .select("*")

      .order(
        "sort_order",
        {
          ascending: true,
        }
      );

    console.log(
      "CONTACT LOCATIONS =>",
      data
    );

    if (
      error
    ) {

      console.error(
        error
      );

    }

    return {

      locations:
        data || [],

    };

  };

/* =========================================
   UPDATE LOCATION
========================================= */

export const updateContactLocation =
  async (

    id: string,

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "contact_locations"
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

    console.log(
      "UPDATED LOCATION =>",
      data
    );

    if (
      error
    ) {

      console.error(
        error
      );

    }

    return {

      data,

      error,

    };

  };

/* =========================================
   CREATE LOCATION
========================================= */

export const createContactLocation =
  async (

    payload: any

  ) => {

    const { data, error } = await supabase

      .from(
        "contact_locations"
      )

      .insert([
        payload
      ])

      .select()

      .single();

    return {

      data,

      error,

    };

  };

/* =========================================
   DELETE LOCATION
========================================= */

export const deleteContactLocation =
  async (

    id: string

  ) => {

    const {

      error,

    } = await supabase

      .from(
        "contact_locations"
      )

      .delete()

      .eq(
        "id",
        id
      );

    return {

      error,

    };

  };