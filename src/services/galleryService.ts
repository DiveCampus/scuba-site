import { supabase } from "@/lib/supabaseClient";

// =====================================
// GET GALLERY
// =====================================

export const getGallery = async () => {
  // console.log("🚀 [GET GALLERY] Fetching gallery...");

  const response = await supabase
    .from("kadir_gallery")
    .select("*")
    .order("position", { ascending: true });

  // console.log("📦 [GET GALLERY RESULT]", response);

  if (response.error) {
    console.error(
      "❌ [GET GALLERY ERROR]",
      response.error
    );
  }

  return response;
};

// =====================================
// UPDATE GALLERY IMAGE
// =====================================

export const updateGalleryImage = async (
  id: string,
  url: string
) => {
  // console.log("🚀 [UPDATE GALLERY IMAGE]", {
  //   id,
  //   url,
  // });

  const response = await supabase
    .from("kadir_gallery")
    .update({
      image_url: url,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  // console.log(
  //   "📦 [UPDATE GALLERY RESULT]",
  //   response
  // );

  if (response.error) {
    console.error(
      "❌ [UPDATE GALLERY ERROR]",
      response.error
    );
  }

  return response;
};