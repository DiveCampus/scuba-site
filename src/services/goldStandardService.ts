import { supabase } from "@/lib/supabaseClient";

/* ================= GET ================= */
export const getGoldStandard = async () => {
  const { data: section } = await supabase
    .from("gold_standard_section")
    .select("*")
    .limit(1);

  const { data: tags } = await supabase
    .from("gold_standard_tags")
    .select("*")
    .order("created_at", { ascending: true });

  const { data: images } = await supabase
    .from("gold_standard_images")
    .select("*");

  console.log("SECTION:", section);
  console.log("TAGS:", tags);
  console.log("IMAGES:", images);

  return {
    section: section?.[0] || null,
    tags: tags || [],
    images: images || [],
  };
};
export const updateGoldTag = async (item: any) => {
  const { data, error } = await supabase
    .from("gold_standard_tags")
    .update({
      icon: item.icon,
      text: item.text,
    })
    .eq("id", item.id)
    .select();

  console.log("UPDATE TAG:", data, error);

  return { data, error };
};
export const updateGoldImage = async (item: any) => {
  const { data, error } = await supabase
    .from("gold_standard_images")
    .update({
      image_url: item.image_url,
    })
    .eq("id", item.id)
    .select();

  console.log("UPDATE IMAGE:", data, error);

  return { data, error };
};

export const updateGoldSection = async (section: any) => {
  console.log("💾 Updating SECTION:", section);

  const { data, error } = await supabase
    .from("gold_standard_section")
    .update({
      badge: section.badge,
      title: section.title,
      highlight: section.highlight,
      description: section.description,
      card_title: section.card_title,
      card_description: section.card_description,
    })
    .eq("id", String(section.id)) // 🔥 IMPORTANT
    .select();

  console.log("📦 SECTION UPDATE:", data);
  console.log("❌ SECTION ERROR:", error);

  return { data, error };
};