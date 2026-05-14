import { supabase } from "@/lib/supabaseClient";

// ==============================
// ✅ GET ALL PRICING
// ==============================

export const getPricing = async () => {
  // console.log("📡 FETCHING PRICING...");

  const { data, error } = await supabase
    .from("kadir_pricing")
    .select("*")
    .order("position", { ascending: true });

  // console.log("📦 PRICING DATA:", data);
  console.log("❌ FETCH ERROR:", error);

  return { data, error };
};

// ==============================
// ✅ CREATE NEW PLAN
// ==============================

export const createPricing = async (payload: any) => {
  // console.log("🚀 CREATING PLAN:", payload);

  const { data, error } = await supabase
    .from("kadir_pricing")
    .insert([
      {
        name: payload.name || "",
        price: payload.price || "",
        period: payload.period || "per person",
        description: payload.description || "",
        features: payload.features || [],
        popular: payload.popular || false,
        position: payload.position || 1,
      },
    ])
    .select()
    .single();

  // console.log("📦 CREATE RESPONSE:", data);
  console.log("❌ CREATE ERROR:", error);

  return { data, error };
};

// ==============================
// ✅ UPDATE PLAN
// ==============================

export const updatePricing = async (
  id: string,
  payload: any
) => {
  // console.log("✏️ UPDATING PLAN:", id, payload);

  const { data, error } = await supabase
    .from("kadir_pricing")
    .update({
      name: payload.name,
      price: payload.price,
      period: payload.period,
      description: payload.description,
      features: payload.features,
      popular: payload.popular,
      position: payload.position,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  // console.log("📦 UPDATE RESPONSE:", data);
  console.log("❌ UPDATE ERROR:", error);

  return { data, error };
};

// ==============================
// ✅ DELETE PLAN
// ==============================

// export const deletePricing = async (id: string) => {
//   console.log("🗑️ DELETING PLAN:", id);

//   const { error } = await supabase
//     .from("kadir_pricing")
//     .delete()
//     .eq("id", id);

//   console.log("❌ DELETE ERROR:", error);

//   return { error };
// };

// ==============================
// ✅ TOGGLE POPULAR
// ==============================

export const togglePopular = async (
  id: string,
  value: boolean
) => {
  // console.log("⭐ TOGGLE POPULAR:", id, value);

  const { data, error } = await supabase
    .from("kadir_pricing")
    .update({
      popular: value,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

// ==============================
// ✅ REORDER
// ==============================

export const updatePosition = async (
  id: string,
  position: number
) => {
  // console.log("🔄 UPDATE POSITION:", id, position);

  const { data, error } = await supabase
    .from("kadir_pricing")
    .update({
      position,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  return { data, error };
};