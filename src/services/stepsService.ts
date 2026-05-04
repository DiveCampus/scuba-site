import { supabase } from "@/lib/supabaseClient";

export const getSteps = async () => {
  const { data: section } = await supabase
    .from("steps_section")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  const { data: list } = await supabase
    .from("steps_list")
    .select("*")
    .order("step_number", { ascending: true });

  return { section, list };
};

export const updateStepsSection = async (section: any) => {
  const { error } = await supabase
    .from("steps_section")
    .update({
      title: section.title,
      highlight: section.highlight,
      subtitle: section.subtitle,
    })
    .eq("id", section.id);

  return { error };
};

export const updateStepItem = async (item: any) => {
  const { error } = await supabase
    .from("steps_list")
    .update({
      title: item.title,
      description: item.description,
      tag: item.tag,
    })
    .eq("id", item.id);

  return { error };
};