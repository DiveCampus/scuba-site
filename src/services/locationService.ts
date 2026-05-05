import { supabase } from "@/lib/supabaseClient";

/* ================= GET ================= */
export const getLocations = async () => {
  const { data, error } = await supabase
    .from("location_section")
    .select("*")
    .order("created_at", { ascending: true });

  console.log("📦 LOCATIONS:", data);
  console.log("❌ ERROR:", error);

  return { data, error };
};

/* ================= UPDATE ================= */
export const updateLocation = async (item: any) => {
  console.log("💾 Updating:", item);

  const { data, error } = await supabase
    .from("location_section")
    .update({
      title: item.title,
      rating: item.rating,
      reviews: item.reviews,
      address: item.address,
      email: item.email,
      phone: item.phone,
      map_url: item.map_url,
    })
    .eq("id", String(item.id))
    .select();

  console.log("✅ UPDATE RESULT:", data);
  console.log("❌ UPDATE ERROR:", error);

  return { data, error };
};

/* ================= CREATE ================= */
export const createLocation = async (item: any) => {
  const { data, error } = await supabase
    .from("location_section")
    .insert(item)
    .select();

  return { data, error };
};

/* ================= DELETE ================= */
export const deleteLocation = async (id: string) => {
  const { error } = await supabase
    .from("location_section")
    .delete()
    .eq("id", id);

  return { error };
};