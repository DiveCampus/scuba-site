import { supabase } from "@/lib/supabaseClient";

/* ================= GET ================= */

export const getLocations =
  async () => {
    const { data, error } =
      await supabase
        .from(
          "kadir_locations"
        )
        .select("*")
        .order(
          "created_at",
          {
            ascending: true,
          }
        );

    return {
      data,
      error,
    };
  };

/* ================= UPDATE ================= */

export const updateLocation =
  async (item: any) => {
    return await supabase
      .from(
        "kadir_locations"
      )
      .update({
        title: item.title,

        rating:
          item.rating,

        reviews:
          item.reviews,

        address:
          item.address,

        email:
          item.email,

        phone:
          item.phone,

        map_url:
          item.map_url,

        updated_at:
          new Date().toISOString(),
      })
      .eq(
        "id",
        String(item.id)
      )
      .select();
  };

/* ================= CREATE ================= */

export const createLocation =
  async (item: any) => {
    return await supabase
      .from(
        "kadir_locations"
      )
      .insert(item)
      .select();
  };

/* ================= DELETE ================= */

export const deleteLocation =
  async (id: string) => {
    return await supabase
      .from(
        "kadir_locations"
      )
      .delete()
      .eq("id", id);
  };