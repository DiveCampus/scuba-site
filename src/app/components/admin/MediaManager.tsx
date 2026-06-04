"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Trash2, ImageIcon, Loader2 } from "lucide-react";
import {
  uploadSingleMedia,
  getMediaBySection,
  deleteMedia,
  MediaItem,
} from "@/services/mediaService";

const MAX_BYTES = 5 * 1024 * 1024; // 10MB hard ceiling (after conversion)
const MAX_DIMENSION = 1920; // cap longest edge — keeps WEBP well under the storage bucket limit
const TARGET_MAX_BYTES = 1 * 1024 * 1024; // aim for ≤ ~2MB per upload
const WEBP_QUALITY = 0.85;
const MIN_QUALITY = 0.35;

// Per-file upload state, indexed by the file's position in `files`.
type FileStatus = "pending" | "uploading" | "done" | "error";

// Human-readable size: < 1MB → "450 KB", >= 1MB → "1.8 MB". null if unknown.
function formatSize(bytes?: number | null): string | null {
  if (!bytes || bytes <= 0) return null;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

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
  draw: (ctx: CanvasRenderingContext2D, dw: number, dh: number) => void;
  cleanup: () => void;
}> {
  try {
    const bmp = await createImageBitmap(file);
    return {
      width: bmp.width,
      height: bmp.height,
      draw: (ctx, dw, dh) => ctx.drawImage(bmp, 0, 0, dw, dh),
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
        draw: (ctx, dw, dh) => ctx.drawImage(img, 0, 0, dw, dh),
        cleanup: () => URL.revokeObjectURL(url),
      };
    } catch (e) {
      URL.revokeObjectURL(url);
      throw e;
    }
  }
}

// Scale (w,h) down so the longest edge is ≤ max, preserving aspect ratio.
// Never upscales.
function fitWithin(w: number, h: number, max: number) {
  if (w <= max && h <= max) return { width: w, height: h };
  const scale = Math.min(max / w, max / h);
  return {
    width: Math.max(1, Math.round(w * scale)),
    height: Math.max(1, Math.round(h * scale)),
  };
}

function encodeWebp(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Conversion failed"))),
      "image/webp",
      quality
    )
  );
}

// Convert ANY decodable image File to a real WEBP File. Downscales the longest
// edge to MAX_DIMENSION and steps quality down until the encoded blob is under
// TARGET_MAX_BYTES (or MIN_QUALITY is reached). This keeps every upload small
// enough for the storage bucket limit — the root fix for the 413
// "object exceeded the maximum allowed size". Aspect ratio + transparency
// (WEBP alpha channel) are preserved.
async function convertToWebp(
  file: File,
  quality = WEBP_QUALITY
): Promise<File> {
  const src = await fileToImageSource(file);
  try {
    const { width, height } = fitWithin(src.width, src.height, MAX_DIMENSION);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    src.draw(ctx, width, height);

    let q = quality;
    let blob = await encodeWebp(canvas, q);
    while (blob.size > TARGET_MAX_BYTES && q > MIN_QUALITY) {
      q = Math.max(MIN_QUALITY, q - 0.12);
      blob = await encodeWebp(canvas, q);
    }

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

  // Per-file upload status (index → status) + completed count, for progress UI.
  const [statuses, setStatuses] = useState<Record<number, FileStatus>>({});
  const [doneCount, setDoneCount] = useState(0);

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
      console.log("📦 MEDIA IMAGES:", data); // temp: confirm each row has size
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
  // Sequential queue: upload one file at a time (no giant payload), update
  // per-file status as it goes, and keep going if one image fails. Successful
  // previews are cleared; failed ones stay selected so the user can retry.
  const handleUpload = async () => {
    if (!files.length) {
      alert("Please select images");
      return;
    }

    setLoading(true);
    setDoneCount(0);
    setStatuses(() => {
      const init: Record<number, FileStatus> = {};
      files.forEach((_, i) => (init[i] = "pending"));
      return init;
    });

    const succeeded = new Set<number>();
    const failures: string[] = [];

    for (let i = 0; i < files.length; i++) {
      setStatuses((s) => ({ ...s, [i]: "uploading" }));

      const res = await uploadSingleMedia({ file: files[i], section });

      if (res.success) {
        succeeded.add(i);
        setStatuses((s) => ({ ...s, [i]: "done" }));
      } else {
        failures.push(res.error || `${files[i].name} — upload failed`);
        setStatuses((s) => ({ ...s, [i]: "error" }));
      }

      setDoneCount((d) => d + 1);
    }

    // Drop successful previews (revoking their object URLs); keep failures.
    const keptFiles: File[] = [];
    const keptPreviews: string[] = [];
    files.forEach((f, i) => {
      if (succeeded.has(i)) {
        URL.revokeObjectURL(previews[i]);
      } else {
        keptFiles.push(f);
        keptPreviews.push(previews[i]);
      }
    });
    setFiles(keptFiles);
    setPreviews(keptPreviews);
    setStatuses({});
    setDoneCount(0);
    setLoading(false);

    loadImages();

    if (failures.length) {
      alert(
        `Uploaded ${succeeded.size}/${files.length}. ${failures.length} failed:\n\n${failures.join(
          "\n"
        )}`
      );
    } else {
      alert(`✅ ${succeeded.size} Images Uploaded Successfully`);
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
                disabled={loading}
                className="text-xs text-white/50 hover:text-red-300 transition disabled:opacity-40 disabled:hover:text-white/50"
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

                  {formatSize(files[index]?.size) && (
                    <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-semibold text-cyan-200 bg-black/40 backdrop-blur-md border border-cyan-300/30 shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                      WEBP • {formatSize(files[index]?.size)}
                    </span>
                  )}

                  {!loading && (
                    <button
                      onClick={() => removePreview(index)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:scale-110"
                    >
                      ✕
                    </button>
                  )}

                  {/* PER-FILE UPLOAD STATUS OVERLAY */}
                  {statuses[index] && statuses[index] !== "pending" && (
                    <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-black/45 backdrop-blur-[1px]">
                      {statuses[index] === "uploading" && (
                        <Loader2 className="w-6 h-6 animate-spin text-cyan-300" />
                      )}
                      {statuses[index] === "done" && (
                        <span className="text-emerald-400 text-3xl font-bold">✓</span>
                      )}
                      {statuses[index] === "error" && (
                        <span className="px-2 text-center text-xs font-semibold text-red-300">
                          Failed — retry
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROGRESS BAR — shown while the queue runs */}
        {loading && files.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2 text-xs text-cyan-300/80">
              <span>Uploading…</span>
              <span>
                {doneCount} / {files.length}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
                style={{
                  width: `${Math.round((doneCount / files.length) * 100)}%`,
                }}
              />
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
              Uploading {doneCount} / {files.length}…
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
              <div className="relative">
                <img
                  src={image.image_url}
                  className="w-full h-[180px] object-cover"
                />

                {formatSize(image.size) && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold text-cyan-200 bg-black/40 backdrop-blur-md border border-cyan-300/30 shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                    WEBP • {formatSize(image.size)}
                  </span>
                )}
              </div>

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
