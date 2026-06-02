"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Trash2, ImageIcon, Loader2 } from "lucide-react";
import {
  uploadMedia,
  getMediaBySection,
  deleteMedia,
  MediaItem,
} from "@/services/mediaService";

const MAX_BYTES = 10 * 1024 * 1024; // 10MB (after conversion)
const WEBP_QUALITY = 0.9;

// ──────────────────────────────────────────────────────────────────
// Image helpers (module scope, no React state)
// ──────────────────────────────────────────────────────────────────

// Decode a File into something drawable. Tries createImageBitmap (fast,
// supports webp/avif/png/jpg/gif where the browser can decode), and falls
// back to an <img> element. Throws for formats the browser cannot decode
// (e.g. HEIC on most browsers) — callers handle that gracefully.
async function fileToImageSource(file: File): Promise<{
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
  cleanup: () => void;
}> {
  try {
    const bmp = await createImageBitmap(file);
    return {
      width: bmp.width,
      height: bmp.height,
      draw: (ctx) => ctx.drawImage(bmp, 0, 0),
      cleanup: () => bmp.close(),
    };
  } catch {
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = () => reject(new Error("decode failed"));
        i.src = url;
      });
      return {
        width: img.naturalWidth,
        height: img.naturalHeight,
        draw: (ctx) => ctx.drawImage(img, 0, 0),
        cleanup: () => URL.revokeObjectURL(url),
      };
    } catch (e) {
      URL.revokeObjectURL(url);
      throw e;
    }
  }
}

// Convert ANY decodable image File to a real WEBP File, preserving aspect
// ratio and transparency (WEBP supports an alpha channel). Renames to .webp.
async function convertToWebp(
  file: File,
  quality = WEBP_QUALITY
): Promise<File> {
  const src = await fileToImageSource(file);
  try {
    const canvas = document.createElement("canvas");
    canvas.width = src.width;
    canvas.height = src.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");

    src.draw(ctx);

    const blob: Blob = await new Promise((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Conversion failed"))),
        "image/webp",
        quality
      )
    );

    const baseName = file.name.replace(/\.[^./\\]+$/, "") || "image";
    return new File([blob], `${baseName}.webp`, {
      type: "image/webp",
      lastModified: Date.now(),
    });
  } finally {
    src.cleanup();
  }
}

export function MediaManager() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [converting, setConverting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [images, setImages] = useState<MediaItem[]>([]);
  const [section, setSection] = useState("community");

  const inputRef = useRef<HTMLInputElement>(null);

  // Keep latest previews for unmount cleanup (avoids stale-closure leaks).
  const previewsRef = useRef<string[]>([]);
  useEffect(() => {
    previewsRef.current = previews;
  }, [previews]);
  useEffect(
    () => () => previewsRef.current.forEach((u) => URL.revokeObjectURL(u)),
    []
  );

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
  // PROCESS FILES (convert → JPG → validate → preview). Append so
  // multiple drops / selections accumulate. Used by click AND drag-drop.
  // ==========================================
  const processFiles = async (incoming: File[]) => {
    const imageFiles = incoming.filter(
      (f) => f.type.startsWith("image/") || /\.(heic|heif)$/i.test(f.name)
    );

    if (!imageFiles.length) {
      alert("Please add image files only.");
      return;
    }

    setConverting(true);

    const newFiles: File[] = [];
    const newPreviews: string[] = [];
    const failed: string[] = [];

    for (const file of imageFiles) {
      try {
        const webp = await convertToWebp(file);

        if (webp.size > MAX_BYTES) {
          failed.push(`${file.name} — exceeds 10MB after conversion`);
          continue;
        }

        newFiles.push(webp);
        newPreviews.push(URL.createObjectURL(webp));
      } catch {
        failed.push(`${file.name} — unsupported or unreadable image`);
      }
    }

    if (newFiles.length) {
      setFiles((prev) => [...prev, ...newFiles]);
      setPreviews((prev) => [...prev, ...newPreviews]);
    }

    setConverting(false);

    if (failed.length) {
      alert(`Some files were skipped:\n\n${failed.join("\n")}`);
    }
  };

  // ==========================================
  // CLICK SELECT
  // ==========================================
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (inputRef.current) inputRef.current.value = ""; // allow re-selecting same file
    if (selected.length) await processFiles(selected);
  };

  // ==========================================
  // DRAG & DROP
  // ==========================================
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files || []);
    if (dropped.length) await processFiles(dropped);
  };

  // ==========================================
  // REMOVE A SELECTED PREVIEW
  // ==========================================
  const removePreview = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const clearSelection = () => {
    previews.forEach((u) => URL.revokeObjectURL(u));
    setFiles([]);
    setPreviews([]);
  };

  // ==========================================
  // UPLOAD
  // ==========================================
  const handleUpload = async () => {
    if (!files.length) {
      alert("Please select images");
      return;
    }

    try {
      setLoading(true);

      const response = await uploadMedia({ files, section });

      if (!response.success) {
        alert(response.error);
        return;
      }

      alert(`✅ ${files.length} Images Uploaded Successfully`);
      clearSelection();
      loadImages();
    } catch (error) {
      console.error("❌ Upload Error:", error);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // DELETE UPLOADED IMAGE
  // ==========================================
  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Delete this image?")) return;
    const response = await deleteMedia(id, imageUrl);
    if (response.success) loadImages();
  };

  return (
    <div className="min-h-screen bg-[#06131d] text-white p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Media Manager</h1>
        <p className="text-white/50 mt-2">Upload & Manage Website Images</p>
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
            onChange={(e) => setSection(e.target.value)}
            className="w-full bg-[#08141d] border border-white/10 rounded-xl px-4 py-4 outline-none"
          >
            <option value="community">Community</option>
            <option value="hero">Hero</option>
            <option value="gallery">Gallery</option>
            <option value="weekend">Weekend</option>
            <option value="location">Location</option>
          </select>
        </div>

        {/* UPLOAD ZONE — click OR drag & drop */}
        <label
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
            dragOver
              ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_45px_rgba(34,211,238,0.45)] scale-[1.01]"
              : "border-cyan-500/30 hover:border-cyan-400 hover:bg-white/[0.02]"
          }`}
        >
          <input
            id="media-upload"
            ref={inputRef}
            type="file"
            accept="image/*,.heic,.heif"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />

          <Upload
            size={42}
            className={`mb-4 transition-transform ${
              dragOver ? "text-cyan-300 scale-110 animate-bounce" : "text-cyan-400"
            }`}
          />

          <p className="font-medium">
            {converting
              ? "Converting images…"
              : dragOver
              ? "Drop images here"
              : "Click or drag images here"}
          </p>

          <span className="text-sm text-white/40 mt-1 text-center">
            Supports JPG, PNG, WEBP, AVIF, GIF, HEIC
          </span>
          <span className="text-xs text-cyan-300/70 mt-1">
            Auto converts everything to WEBP • Max 10MB each
          </span>
        </label>

        {/* PREVIEW */}
        {previews.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-cyan-300">
                Preview ({previews.length} Images)
              </p>
              <button
                onClick={clearSelection}
                className="text-xs text-white/50 hover:text-red-300 transition"
              >
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previews.map((preview, index) => (
                <div key={preview} className="relative group">
                  <img
                    src={preview}
                    className="w-full h-[180px] object-cover rounded-2xl border border-white/10"
                  />

                  <button
                    onClick={() => removePreview(index)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:scale-110"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={handleUpload}
          disabled={loading || converting || !files.length}
          className="mt-8 w-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl py-4 font-semibold hover:scale-[1.01] transition disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin w-5 h-5" />
              Uploading {files.length} Images...
            </div>
          ) : converting ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin w-5 h-5" />
              Converting…
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
                    navigator.clipboard.writeText(image.image_url);
                    alert("✅ URL Copied");
                  }}
                  className="w-full bg-cyan-500/20 hover:bg-cyan-500 transition rounded-lg py-2 text-xs text-cyan-300"
                >
                  Copy URL
                </button>

                <button
                  onClick={() => handleDelete(image.id, image.image_url)}
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
