import { supabase } from "@/lib/supabaseClient";

/* ================= GET ================= */

export const getWhyChoose = async () => {
  const { data: section, error: secErr } = await supabase
    .from(
      "kadir_why_choose_section"
    )
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .limit(1);

  const { data: features, error: featErr } = await supabase
    .from(
      "kadir_why_choose_features"
    )
    .select("*")
    .order("position", {
      ascending: true,
    });

  return {
    section:
      section?.[0] || null,

    features:
      features || [],

    error:
      secErr || featErr,
  };
};

/* ================= UPDATE SECTION ================= */

export const updateWhySection =
  async (section: any) => {
    const { data, error } = await supabase
        .from(
          "kadir_why_choose_section"
        )
        .update({
          tag: section.tag,

          title:
            section.title,

          highlight:
            section.highlight,

          description:
            section.description,

          image_url:
            section.image_url,

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

/* ================= UPDATE FEATURE ================= */

export const updateWhyFeature =
  async (item: any) => {
    const { data, error } = await supabase
        .from(
          "kadir_why_choose_features"
        )
        .update({
          icon: item.icon,

          title:
            item.title,

          description:
            item.description,

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

/* ================= CREATE FEATURE ================= */

export const createWhyFeature =
  async (item: any) => {
    const { data, error } = await supabase
        .from(
          "kadir_why_choose_features"
        )
        .insert({
          icon: item.icon,

          title:
            item.title,

          description:
            item.description,
        })
        .select();

    return {
      data,
      error,
    };
  };

/* ================= DELETE FEATURE ================= */

export const deleteWhyFeature =
  async (id: string) => {
    const { error } = await supabase
        .from(
          "kadir_why_choose_features"
        )
        .delete()
        .eq(
          "id",
          String(id)
        );

    return { error };
  };