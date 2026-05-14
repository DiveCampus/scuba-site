import { supabase } from "@/lib/supabaseClient";

// ========================================
// GET COMPARE
// ========================================

export const getCompare = async () => {
  const { data: section } = await supabase
    .from("kadir_compare_section")
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .single();

  const { data: items } = await supabase
    .from("kadir_compare_items")
    .select("*")
    .order("position", {
      ascending: true,
    });

  return { section, items };
};

// ========================================
// UPDATE SECTION
// ========================================

export const updateCompareSection =
  async (section: any) => {
    const { error } =
      await supabase
        .from(
          "kadir_compare_section"
        )
        .update({
          title:
            section.title,

          highlight:
            section.highlight,

          subtitle:
            section.subtitle,

          updated_at:
            new Date().toISOString(),
        })
        .eq("id", section.id);

    return { error };
  };

// ========================================
// UPDATE ITEM
// ========================================

export const updateCompareItem =
  async (item: any) => {
    const { error } =
      await supabase
        .from(
          "kadir_compare_items"
        )
        .update({
          feature:
            item.feature,

          others:
            item.others,

          nemo: item.nemo,

          updated_at:
            new Date().toISOString(),
        })
        .eq("id", item.id);

    return { error };
  };