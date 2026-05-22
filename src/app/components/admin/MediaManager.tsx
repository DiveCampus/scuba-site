"use client";

import { useEffect, useState } from "react";
import { Upload, Trash2, ImageIcon, Loader2 } from "lucide-react";
import {
  uploadMedia,
  getMediaBySection,
  deleteMedia,
  MediaItem,
} from "@/services/mediaService";

export function MediaManager() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<MediaItem[]>([]);
  const [section, setSection] = useState("community");

  // ==========================================
  // LOAD IMAGES
  // ==========================================

  const loadImages = async () => {
    try {
      const data = await getMediaBySection(section);
      setImages(data);
    } catch (error) {
      console.error("❌ LOAD IMAGES ERROR:", error);
    }
  };

  useEffect(() => {
    loadImages();
  }, [section]);

  // ==========================================
  // FILE CHANGE
  // ==========================================

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (!selectedFiles.length) return;

    const invalidFile = selectedFiles.find(
      (file) => file.type !== "image/webp"
    );

    if (invalidFile) {
      alert(`❌ ${invalidFile.name} is not .webp`);
      return;
    }

    const largeFile = selectedFiles.find(
      (file) => file.size > 10 * 1024 * 1024
    );

    if (largeFile) {
      alert(`❌ ${largeFile.name} exceeds 10MB`);
      return;
    }

    setFiles(selectedFiles);

    const previewUrls = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews(previewUrls);
  };

  // ==========================================
  // UPLOAD IMAGES
  // ==========================================

  const handleUpload = async () => {
    if (!files.length) {
      alert("Please select images");
      return;
    }

    try {
      setLoading(true);

      const response = await uploadMedia({
        files,
        section,
      });

      if (!response.success) {
        alert(response.error);
        return;
      }

      alert(
        `✅ ${files.length} Images Uploaded Successfully`
      );

      setFiles([]);
      setPreviews([]);

      const input = document.getElementById(
        "media-upload"
      ) as HTMLInputElement;

      if (input) input.value = "";

      loadImages();
    } catch (error) {
      console.error("❌ Upload Error:", error);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // DELETE IMAGE
  // ==========================================

  const handleDelete = async (
    id: string,
    imageUrl: string
  ) => {
    const confirmDelete = confirm(
      "Delete this image?"
    );

    if (!confirmDelete) return;

    const response = await deleteMedia(
      id,
      imageUrl
    );

    if (response.success) {
      loadImages();
    }
  };

  return (
    <div className="min-h-screen bg-[#06131d] text-white p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Media Manager
        </h1>

        <p className="text-white/50 mt-2">
          Upload & Manage Website Images
        </p>
      </div>

      {/* TOP CARD */}
      <div className="bg-[#0b1d2b] border border-cyan-500/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,255,255,0.08)]">
        {/* SECTION */}
        <div className="mb-6">
          <label className="text-sm text-cyan-300 mb-2 block">
            Select Section
          </label>

          <select
            value={section}
            onChange={(e) =>
              setSection(e.target.value)
            }
            className="w-full bg-[#08141d] border border-white/10 rounded-xl px-4 py-4 outline-none"
          >
            <option value="community">
              Community
            </option>
            <option value="hero">
              Hero
            </option>
            <option value="gallery">
              Gallery
            </option>
            <option value="weekend">
              Weekend
            </option>
            <option value="location">
              Location
            </option>
          </select>
        </div>

        {/* FILE INPUT */}
        <label className="border-2 border-dashed border-cyan-500/30 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-400 transition">
          <input
            id="media-upload"
            type="file"
            accept=".webp"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />

          <Upload
            size={42}
            className="text-cyan-400 mb-4"
          />

          <p className="font-medium">
            Upload .webp Images
          </p>

          <span className="text-sm text-white/40 mt-1">
            Multiple Upload | Only .webp | Max 10MB
          </span>
        </label>

        {/* PREVIEW */}
        {previews.length > 0 && (
          <div className="mt-8">
            <p className="mb-4 text-cyan-300">
              Preview ({previews.length} Images)
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previews.map(
                (preview, index) => (
                  <div
                    key={index}
                    className="relative group"
                  >
                    {/* IMAGE */}
                    <img
                      src={preview}
                      className="w-full h-[180px] object-cover rounded-2xl border border-white/10"
                    />

                    {/* REMOVE IMAGE */}
                    <button
                      onClick={() => {
                        const updatedFiles =
                          files.filter(
                            (_, i) =>
                              i !== index
                          );

                        const updatedPreviews =
                          previews.filter(
                            (_, i) =>
                              i !== index
                          );

                        setFiles(
                          updatedFiles
                        );

                        setPreviews(
                          updatedPreviews
                        );

                        // RESET INPUT IF EMPTY
                        if (
                          updatedFiles.length ===
                          0
                        ) {
                          const input =
                            document.getElementById(
                              "media-upload"
                            ) as HTMLInputElement;

                          if (input)
                            input.value =
                              "";
                        }
                      }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:scale-110"
                    >
                      ✕
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-8 w-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl py-4 font-semibold hover:scale-[1.01] transition disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin w-5 h-5" />
              Uploading {files.length} Images...
            </div>
          ) : (
            `Upload ${files.length} Images`
          )}
        </button>
      </div>

      {/* IMAGES GRID */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-6">
          Uploaded Images ({images.length})
        </h2>

        <div className="grid md:grid-cols-4 gap-5">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-[#0b1d2b] rounded-3xl overflow-hidden border border-white/10"
            >
              <img
                src={image.image_url}
                className="w-full h-[180px] object-cover"
              />

              <div className="p-4 space-y-3">
                <p className="text-xs text-white/50 truncate">
                  {image.file_name}
                </p>

                <input
                  value={image.image_url}
                  readOnly
                  className="w-full bg-[#08141d] border border-white/10 rounded-lg px-3 py-2 text-[10px] text-cyan-300 outline-none truncate"
                />

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      image.image_url
                    );
                    alert("✅ URL Copied");
                  }}
                  className="w-full bg-cyan-500/20 hover:bg-cyan-500 transition rounded-lg py-2 text-xs text-cyan-300"
                >
                  Copy URL
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      image.id,
                      image.image_url
                    )
                  }
                  className="w-full bg-red-500/20 hover:bg-red-500 transition rounded-xl py-3 flex items-center justify-center gap-2 text-red-300"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {!images.length && (
          <div className="text-center py-20 text-white/40">
            <ImageIcon className="mx-auto mb-3" />
            No Images Found
          </div>
        )}
      </div>
    </div>
  );
}