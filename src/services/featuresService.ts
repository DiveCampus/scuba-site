import { supabase } from "@/lib/supabaseClient";

export const getFeatures = async () => {
  const { data: section, error: sectionError } = await supabase
    .from("features_section")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  const { data: list, error: listError } = await supabase
    .from("features_list")
    .select("*")
    .order("created_at", { ascending: true });

  return {
    section,
    list,
    error: sectionError || listError,
  };
};

export const updateSection = async (section: any) => {
  const { error } = await supabase
    .from("features_section")
    .update({
      title: section.title,
      subtitle: section.subtitle,
      video_url: section.video_url,
      rating1: section.rating1,
      rating1_count: section.rating1_count,
      rating2: section.rating2,
      rating2_count: section.rating2_count,
    })
    .eq("id", section.id);

  return { error };
};

export const updateFeatureItem = async (item: any) => {
  const { error } = await supabase
    .from("features_list")
    .update({
      text: item.text,
      tag: item.tag,
    })
    .eq("id", item.id);

  return { error };
};