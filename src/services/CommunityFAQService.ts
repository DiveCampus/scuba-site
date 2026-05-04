import { supabase } from "@/lib/supabaseClient";

export const getFAQ = async () => {
  const { data: section, error: secErr } = await supabase
    .from("faq_section")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  const { data: items, error: itemErr } = await supabase
    .from("faq_items")
    .select("*")
    .order("created_at", { ascending: true });

  console.log("FAQ SECTION:", section);
  console.log("FAQ ITEMS:", items);

  return {
    section: section?.[0] || null,
    items,
    error: secErr || itemErr,
  };
};

export const updateFAQItem = async (item: any) => {
  console.log("🧠 TRY UPDATE ITEM:", item);

  // 🔍 STEP 1: CHECK IF ID EXISTS
  const { data: check } = await supabase
    .from("faq_items")
    .select("id")
    .eq("id", item.id);

  console.log("🧪 CHECK ID EXISTS:", check);

  // 🔥 STEP 2: FORCE STRING MATCH
  const { data, error } = await supabase
    .from("faq_items")
    .update({
      question: item.question,
      answer: item.answer,
    })
    .eq("id", String(item.id)) // ⚠️ important
    .select();

  console.log("📦 UPDATE RESULT:", data);
  console.log("❌ UPDATE ERROR:", error);

  return { data, error };
};

export const updateFAQSection = async (section: any) => {
  console.log("🧠 TRY UPDATE SECTION:", section);

  const { data: check } = await supabase
    .from("faq_section")
    .select("id")
    .eq("id", section.id);

  console.log("🧪 SECTION EXISTS:", check);

  const { data, error } = await supabase
    .from("faq_section")
    .update({
      title: section.title,
      highlight: section.highlight,
      subtitle: section.subtitle,
    })
    .eq("id", String(section.id)) // ⚠️ important
    .select();

  console.log("📦 SECTION UPDATE:", data);
  console.log("❌ SECTION ERROR:", error);

  return { data, error };
};
export const createFAQItem = async (item: any) => {
  const { data, error } = await supabase
    .from("faq_items")
    .insert({
      question: item.question,
      answer: item.answer,
    })
    .select();

  return { data, error };
};

export const deleteFAQItem = async (id: string) => {
  const { error } = await supabase
    .from("faq_items")
    .delete()
    .eq("id", id);

  return { error };
};