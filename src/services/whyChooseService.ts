import { supabase } from "@/lib/supabaseClient";

/* ================= GET ================= */
export const getWhyChoose = async () => {
  console.log("🚀 Fetching Why Choose data...");

  const { data: section, error: secErr } = await supabase
    .from("why_choose_section")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  const { data: features, error: featErr } = await supabase
    .from("why_choose_features")
    .select("*")
    .order("created_at", { ascending: true });

  console.log("📦 SECTION:", section);
  console.log("📦 FEATURES:", features);
  console.log("❌ ERROR:", secErr || featErr);

  return {
    section: section?.[0] || null,
    features: features || [],
    error: secErr || featErr,
  };
};

/* ================= UPDATE SECTION ================= */
export const updateWhySection = async (section: any) => {
  console.log("💾 Updating section:", section);

  const { data, error } = await supabase
    .from("why_choose_section")
    .update({
      tag: section.tag,
      title: section.title,
      highlight: section.highlight,
      description: section.description,
      image_url: section.image_url,
    })
    .eq("id", String(section.id))
    .select();

  console.log("📦 SECTION UPDATE:", data);
  console.log("❌ SECTION ERROR:", error);

  return { data, error };
};

/* ================= UPDATE FEATURE ================= */
export const updateWhyFeature = async (item: any) => {
  console.log("💾 Updating feature:", item);

  const { data, error } = await supabase
    .from("why_choose_features")
    .update({
      icon: item.icon,
      title: item.title,
      description: item.description,
    })
    .eq("id", String(item.id))
    .select();

  console.log("📦 FEATURE UPDATE:", data);
  console.log("❌ FEATURE ERROR:", error);

  return { data, error };
};

/* ================= CREATE FEATURE ================= */
export const createWhyFeature = async (item: any) => {
  console.log("➕ Creating feature:", item);

  const { data, error } = await supabase
    .from("why_choose_features")
    .insert({
      icon: item.icon,
      title: item.title,
      description: item.description,
    })
    .select();

  console.log("📦 CREATED FEATURE:", data);
  console.log("❌ CREATE ERROR:", error);

  return { data, error };
};

/* ================= DELETE FEATURE (OPTIONAL) ================= */
export const deleteWhyFeature = async (id: string) => {
  console.log("🗑️ Deleting feature ID:", id);

  const { error } = await supabase
    .from("why_choose_features")
    .delete()
    .eq("id", String(id));

  console.log("❌ DELETE ERROR:", error);

  return { error };
};