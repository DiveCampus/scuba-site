import { supabase } from "@/lib/supabaseClient";

/* ================= GET ================= */

export const getAdvancedProtocol =
  async () => {

    const [{ data: section }, { data: cards }] =
      await Promise.all([

        supabase
          .from("advanced_protocol_section")
          .select("*")
          .limit(1)
          .single(),

        supabase
          .from("advanced_protocol_cards")
          .select("*")
          .order("sort_order"),

      ]);

    return {
      section,
      cards: cards || [],
    };
  };

/* ================= UPDATE SECTION ================= */

export const updateAdvancedProtocolSection =
  async (id: string, payload: any) => {

    return await supabase
      .from("advanced_protocol_section")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
  };

/* ================= UPDATE CARD ================= */

export const updateAdvancedProtocolCard =
  async (id: string, payload: any) => {

    return await supabase
      .from("advanced_protocol_cards")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
  };

/* ================= CREATE CARD ================= */

export const createAdvancedProtocolCard =
  async (payload: any) => {

    return await supabase
      .from("advanced_protocol_cards")
      .insert([payload])
      .select()
      .single();
  };

/* ================= DELETE CARD ================= */

export const deleteAdvancedProtocolCard =
  async (id: string) => {

    return await supabase
      .from("advanced_protocol_cards")
      .delete()
      .eq("id", id);
  };