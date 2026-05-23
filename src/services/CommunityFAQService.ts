import { supabase } from "@/lib/supabaseClient";

// ========================================
// GET FAQ
// ========================================

export const getFAQ = async () => {
  const { data: section, error: secErr } = await supabase
      .from(
        "kadir_community_faq_section"
      )
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(1);

  const { data: items, error: itemErr } = await supabase
      .from(
        "kadir_community_faq_items"
      )
      .select("*")
      .order("position", {
        ascending: true,
      });

  return {
    section:
      section?.[0] || null,
    items,
    error:
      secErr || itemErr,
  };
};

// ========================================
// UPDATE FAQ ITEM
// ========================================

export const updateFAQItem =
  async (item: any) => {
    const { data, error } = await supabase
        .from(
          "kadir_community_faq_items"
        )
        .update({
          question:
            item.question,

          answer:
            item.answer,

          updated_at:
            new Date().toISOString(),
        })
        .eq(
          "id",
          String(item.id)
        )
        .select();

    return {
      data,
      error,
    };
  };

// ========================================
// UPDATE FAQ SECTION
// ========================================

export const updateFAQSection =
  async (section: any) => {
    const { data, error } = await supabase
        .from(
          "kadir_community_faq_section"
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
        .eq(
          "id",
          String(
            section.id
          )
        )
        .select();

    return {
      data,
      error,
    };
  };

// ========================================
// CREATE FAQ ITEM
// ========================================

export const createFAQItem =
  async (item: any) => {
    const { data, error } = await supabase
        .from(
          "kadir_community_faq_items"
        )
        .insert({
          question:
            item.question,

          answer:
            item.answer,
        })
        .select();

    return {
      data,
      error,
    };
  };

// ========================================
// DELETE FAQ ITEM
// ========================================

export const deleteFAQItem =
  async (id: string) => {
    const { error } = await supabase
        .from(
          "kadir_community_faq_items"
        )
        .delete()
        .eq("id", id);

    return { error };
  };