import { supabase } from "@/lib/supabaseClient";

// ================= GET =================

// MAIN
export const getFooter = async () => {
  return await supabase
    .from("footer_content")
    .select("*")
    .single();
};

// SOCIALS
export const getSocials = async () => {
  return await supabase
    .from("footer_socials")
    .select("*"); // ⚠️ no .single()
};

// LOCATIONS
export const getLocations = async () => {
  return await supabase
    .from("footer_locations")
    .select("*")
    .order("position");
};


// ================= UPDATE =================

export const updateFooter = async (id: string, payload: any) => {
  return await supabase
    .from("footer_content")
    .update(payload)
    .eq("id", id);
};

export const updateSocial = async (id: string, payload: any) => {
  return await supabase
    .from("footer_socials")
    .update({
      url: payload.url,
      platform: payload.platform,
    })
    .eq("id", id);
};

export const updateLocation = async (id: string, payload: any) => {
  return await supabase
    .from("footer_locations")
    .update({
      title: payload.title,
      address: payload.address,
      map_url: payload.map_url,
    })
    .eq("id", id);
};


// ================= ADD =================

export const addSocial = async (payload: any) => {
  return await supabase
    .from("footer_socials")
    .insert([payload]);
};


// ================= DELETE =================

export const deleteSocial = async (id: string) => {
  return await supabase
    .from("footer_socials")
    .delete()
    .eq("id", id);
};