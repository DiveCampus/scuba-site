import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalizes newlines in admin-editable text so multiline content renders
 * reliably with `whitespace-pre-line`.
 *
 * Converts escaped sequences ("\\n", "\\r\\n") and CRLF/CR into real "\n"
 * line feeds. Real newlines pass through unchanged, so single-line content
 * stays byte-for-byte identical.
 */
export function normalizeMultiline(value?: string | null): string {
  if (!value) return "";
  return value
    .replace(/\\r\\n|\\n|\\r/g, "\n") // literal escaped sequences
    .replace(/\r\n|\r/g, "\n"); // CRLF / lone CR -> LF
}