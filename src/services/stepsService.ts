import { supabase } from "@/lib/supabaseClient";

// ========================================
// GET STEPS
// ========================================

export const getSteps = async () => {
  const { data: section } = await supabase
    .from("kadir_steps_section")
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .single();

  const { data: list } = await supabase
    .from("kadir_steps_list")
    .select("*")
    .order("step_number", {
      ascending: true,
    });

  return { section, list };
};

// ========================================
// UPDATE SECTION
// ========================================

export const updateStepsSection =
  async (section: any) => {
    const { error } =
      await supabase
        .from(
          "kadir_steps_section"
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
// UPDATE STEP ITEM
// ========================================

export const updateStepItem =
  async (item: any) => {
    const { error } =
      await supabase
        .from(
          "kadir_steps_list"
        )
        .update({
          title: item.title,

          description:
            item.description,

          tag: item.tag,

          highlight:
            item.highlight,

          updated_at:
            new Date().toISOString(),
        })
        .eq("id", item.id);

    return { error };
  };