import { supabase } from "@/lib/supabaseClient";

// ==========================================
// TYPES
// ==========================================

export interface MediaItem {
  id: string;
  section: string;
  image_url: string;
  file_name: string;
  position: number;
  created_at: string;
  size: number | null; // final converted (webp) size in bytes
}

// ==========================================
// GET MEDIA BY SECTION
// ==========================================

export const getMediaBySection = async (
  section: string
): Promise<MediaItem[]> => {
  try {
    const { data, error } = await supabase
      .from("media_library")
      .select(
        "id, section, image_url, file_name, position, created_at, size"
      )
      .eq("section", section)
      .order("position", {
        ascending: true,
      });

    if (error) {
      console.error(
        "❌ GET MEDIA ERROR:",
        error.message
      );

      return [];
    }

    return data || [];
  } catch (err) {
    console.error(
      "❌ GET MEDIA CATCH ERROR:",
      err
    );

    return [];
  }
};

// ==========================================
// UPLOAD A SINGLE MEDIA FILE (queue unit)
// ==========================================
//
// One file → one direct Supabase Storage upload (File/Blob, never base64) →
// one DB row. Never throws: returns a per-file result so the caller can drive
// a queue and keep going when one image fails. The admin UI converts +
// downscales to a small WEBP before calling this, which keeps each object well
// under the storage bucket's size limit (the source of the historical
// "object exceeded the maximum allowed size" 413).

export interface UploadResult {
  success: boolean;
  data?: MediaItem;
  error?: string;
}

export const uploadSingleMedia = async ({
  file,
  section,
}: {
  file: File;
  section: string;
}): Promise<UploadResult> => {
  try {
    // VALIDATION — safety net; the UI already converts everything to WEBP.
    if (!file.type.startsWith("image/")) {
      return { success: false, error: `${file.name} is not an image` };
    }

    if (file.size > 10 * 1024 * 1024) {
      return { success: false, error: `${file.name} exceeds 10MB` };
    }

    // FILE NAME — always store as .webp so the storage path, public URL and
    // DB record stay consistent regardless of the source format.
    const baseName =
      file.name.replace(/\.[^./\\]+$/, "").trim() || "image";

    const fileName = `${Date.now()}-${baseName}.webp`;
    const filePath = `${section}/${fileName}`;

    // STORAGE UPLOAD — direct File/Blob, forced image/webp content-type.
    const { error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: "image/webp",
      });

    if (uploadError) {
      // Translate the storage size-limit 413 into a human-readable hint.
      const raw = uploadError.message || "upload failed";
      const friendly = /maximum allowed size|payload too large|413/i.test(raw)
        ? "file is larger than the storage bucket allows"
        : raw;
      return { success: false, error: `${file.name} — ${friendly}` };
    }

    // GET PUBLIC URL
    const { data: publicUrlData } = supabase.storage
      .from("uploads")
      .getPublicUrl(filePath);

    // SAVE TO DB
    const { data, error: dbError } = await supabase
      .from("media_library")
      .insert([
        {
          section,
          image_url: publicUrlData.publicUrl,
          file_name: fileName,
          size: file.size, // final converted (webp) size in bytes
        },
      ])
      .select()
      .single();

    if (dbError) {
      // Roll back the just-uploaded object so storage and DB stay in sync.
      await supabase.storage.from("uploads").remove([filePath]);
      return { success: false, error: `${file.name} — ${dbError.message}` };
    }

    return { success: true, data };
  } catch (err: any) {
    return {
      success: false,
      error: `${file.name} — ${err?.message || "upload failed"}`,
    };
  }
};

// ==========================================
// DELETE MEDIA
// ==========================================

export const deleteMedia =
  async (
    id: string,
    imageUrl: string
  ) => {
    try {
      const splitUrl =
        imageUrl.split(
          "/uploads/"
        );

      const filePath =
        splitUrl[1];

      const {
        error:
          storageError,
      } = await supabase.storage
          .from("uploads")
          .remove([
            filePath,
          ]);

      if (
        storageError
      ) {
        throw storageError;
      }

      const {
        error: dbError,
      } = await supabase
        .from(
          "media_library"
        )
        .delete()
        .eq("id", id);

      if (dbError) {
        throw dbError;
      }

      return {
        success: true,
      };
    } catch (err: any) {
      return {
        success: false,
        error:
          err.message,
      };
    }
  };