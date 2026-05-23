import { supabase } from "@/lib/supabaseClient";

/* ================= GET ================= */

export const getFooter =
  async () => {
    const {
      data: section,
    } = await supabase
      .from(
        "kadir_footer_section"
      )
      .select("*")
      .limit(1);

    const { data: links } = await supabase
        .from(
          "kadir_footer_links"
        )
        .select("*");

    const {
      data: socials,
    } = await supabase
      .from(
        "kadir_footer_socials"
      )
      .select("*");

    const { data: apps } = await supabase
        .from(
          "kadir_footer_apps"
        )
        .select("*");

    return {
      section:
        section?.[0] || null,

      links: links || [],

      socials:
        socials || [],

      apps: apps || [],
    };
  };

/* ================= UPDATE SECTION ================= */

export const updateFooterSection =
  async (section: any) => {
    return await supabase
      .from(
        "kadir_footer_section"
      )
      .update({
        whatsapp_text:
          section.whatsapp_text,

        subscribe_placeholder:
          section.subscribe_placeholder,

        copyright:
          section.copyright,

        updated_at:
          new Date().toISOString(),
      })
      .eq(
        "id",
        section.id
      )
      .select();
  };

/* ================= UPDATE LINK ================= */

export const updateFooterLink =
  async (item: any) => {
    return await supabase
      .from(
        "kadir_footer_links"
      )
      .update({
        label:
          item.label,

        category:
          item.category,
      })
      .eq("id", item.id)
      .select();
  };

/* ================= UPDATE SOCIAL ================= */

export const updateFooterSocial =
  async (item: any) => {
    return await supabase
      .from(
        "kadir_footer_socials"
      )
      .update({
        platform:
          item.platform,

        url: item.url,
      })
      .eq("id", item.id)
      .select();
  };

/* ================= UPDATE APP ================= */

export const updateFooterApp =
  async (item: any) => {
    return await supabase
      .from(
        "kadir_footer_apps"
      )
      .update({
        name:
          item.name,

        link:
          item.link,
      })
      .eq("id", item.id)
      .select();
  };