import { supabase } from "@/lib/supabaseClient";

/* ================= GET ================= */
export const getFooter = async () => {
  const { data: section } = await supabase
    .from("footer_section")
    .select("*")
    .limit(1);

  const { data: links } = await supabase
    .from("footer_links")
    .select("*");

  const { data: socials } = await supabase
    .from("footer_socials")
    .select("*");

  const { data: apps } = await supabase
    .from("footer_apps")
    .select("*");

  console.log("FOOTER SECTION:", section);
  console.log("LINKS:", links);
  console.log("SOCIALS:", socials);
  console.log("APPS:", apps);

  return {
    section: section?.[0] || null,
    links: links || [],
    socials: socials || [],
    apps: apps || [],
  };
};

/* ================= UPDATE SECTION ================= */
export const updateFooterSection = async (section: any) => {
  const { data, error } = await supabase
    .from("footer_section")
    .update({
      whatsapp_text: section.whatsapp_text,
      subscribe_placeholder: section.subscribe_placeholder,
      copyright: section.copyright,
    })
    .eq("id", section.id)
    .select();

  console.log("UPDATE SECTION:", data, error);

  return { data, error };
};


/* ================= UPDATE LINK ================= */
export const updateFooterLink = async (item: any) => {
  const { data, error } = await supabase
    .from("footer_links")
    .update({
      label: item.label,
      category: item.category,
    })
    .eq("id", item.id)
    .select();

  return { data, error };
};


/* ================= UPDATE SOCIAL ================= */
export const updateFooterSocial = async (item: any) => {
  const { data, error } = await supabase
    .from("footer_social")
    .update({
      platform: item.platform,
      url: item.url,
    })
    .eq("id", item.id)
    .select();

  return { data, error };
};

/* ================= UPDATE APP ================= */
export const updateFooterApp = async (item: any) => {
  const { data, error } = await supabase
    .from("footer_apps")
    .update({
      name: item.name,
      link: item.link,
    })
    .eq("id", item.id)
    .select();

  return { data, error };
};