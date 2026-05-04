import { supabase } from "@/lib/supabaseClient";

export const getCompare = async () => {
  const { data: section } = await supabase
    .from("compare_section")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  const { data: items } = await supabase
    .from("compare_items")
    .select("*")
    .order("created_at", { ascending: true });

  return { section, items };
};

export const updateCompareSection = async (section: any) => {
  const { data, error } = await supabase
    .from("compare_section")
    .update({
      title: section.title,
      highlight: section.highlight,
      subtitle: section.subtitle,
    })
    .eq("id", section.id)
    .select();

  console.log("UPDATE SECTION:", data, error);

  return { error };
};
export const updateCompareItem = async (item: any) => {
  const { data, error } = await supabase
    .from("compare_items")
    .update({
      feature: item.feature,
      others: item.others,
      nemo: item.nemo,
    })
    .eq("id", item.id)
    .select();

  console.log("UPDATE ITEM:", data, error);

  return { error };
};