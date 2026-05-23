import { supabase } from "@/lib/supabaseClient";

/* ================= GET ================= */

export const getGoldStandard =
  async () => {
    const {
      data: section,
    } = await supabase
      .from(
        "kadir_gold_standard_section"
      )
      .select("*")
      .limit(1);

    const { data: tags } = await supabase
        .from(
          "kadir_gold_standard_tags"
        )
        .select("*")
        .order("position", {
          ascending: true,
        });

    const {
      data: images,
    } = await supabase
      .from(
        "kadir_gold_standard_images"
      )
      .select("*");

    return {
      section:
        section?.[0] || null,

      tags: tags || [],

      images:
        images || [],
    };
  };

/* ================= UPDATE TAG ================= */

export const updateGoldTag =
  async (item: any) => {
    return await supabase
      .from(
        "kadir_gold_standard_tags"
      )
      .update({
        icon: item.icon,
        text: item.text,
      })
      .eq("id", item.id)
      .select();
  };

/* ================= UPDATE IMAGE ================= */

export const updateGoldImage =
  async (item: any) => {
    return await supabase
      .from(
        "kadir_gold_standard_images"
      )
      .update({
        image_url:
          item.image_url,
      })
      .eq("id", item.id)
      .select();
  };

/* ================= UPDATE SECTION ================= */

export const updateGoldSection =
  async (section: any) => {
    return await supabase
      .from(
        "kadir_gold_standard_section"
      )
      .update({
        badge:
          section.badge,

        title:
          section.title,

        highlight:
          section.highlight,

        description:
          section.description,

        card_title:
          section.card_title,

        card_description:
          section.card_description,

        updated_at:
          new Date().toISOString(),
      })
      .eq(
        "id",
        String(section.id)
      )
      .select();
  };