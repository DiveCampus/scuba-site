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
      .select("*")
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
// BULK UPLOAD MEDIA
// ==========================================

export const uploadMedia = async ({
  files,
  section,
}: {
  files: File[];
  section: string;
}) => {
  try {
    if (!files.length) {
      throw new Error(
        "No files selected"
      );
    }

    const uploadedData = [];

    for (const file of files) {
      // VALIDATION — accept any image (the admin UI converts everything to
      // JPG before calling this; keep a generic guard as a safety net).
      if (
        !file.type.startsWith("image/")
      ) {
        throw new Error(
          `${file.name} is not an image`
        );
      }

      if (
        file.size >
        10 * 1024 * 1024
      ) {
        throw new Error(
          `${file.name} exceeds 10MB`
        );
      }

      // FILE NAME — always store as .webp. The admin UI converts the bytes
      // to WEBP; forcing the extension here guarantees the storage path,
      // public URL and DB record always end in .webp regardless of source.
      const baseName =
        file.name.replace(/\.[^./\\]+$/, "").trim() ||
        "image";

      const fileName = `${Date.now()}-${baseName}.webp`;

      // STORAGE PATH
      const filePath =
        `${section}/${fileName}`;

      console.log(
        "📤 Uploading:",
        filePath
      );

      // STORAGE UPLOAD — force the webp content-type so the stored object's
      // MIME is image/webp (not inherited from the source format).
      const {
        error: uploadError,
      } = await supabase.storage
        .from("uploads")
        .upload(
          filePath,
          file,
          {
            cacheControl:
              "3600",
            upsert: false,
            contentType: "image/webp",
          }
        );

      if (uploadError) {
        throw uploadError;
      }

      // GET PUBLIC URL
      const {
        data:
          publicUrlData,
      } =
        supabase.storage
          .from("uploads")
          .getPublicUrl(
            filePath
          );

      const publicUrl =
        publicUrlData.publicUrl;

      // SAVE TO DB
      const { data, error: dbError } = await supabase
        .from(
          "media_library"
        )
        .insert([
          {
            section,
            image_url:
              publicUrl,
            file_name:
              fileName,
          },
        ])
        .select()
        .single();

      if (dbError) {
        throw dbError;
      }

      uploadedData.push(
        data
      );
    }

    return {
      success: true,
      data: uploadedData,
    };
  } catch (err: any) {
    console.error(
      "❌ BULK UPLOAD ERROR:",
      err.message
    );

    return {
      success: false,
      error:
        err.message,
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