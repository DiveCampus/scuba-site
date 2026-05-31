// ────────────────────────────────────────────────────────────────
// WhatsAppButton — the single source of truth for EVERY WhatsApp
// touchpoint on the site (floating action buttons, course-page CTAs,
// footer icons). It standardizes icon, brand green, sizing, spacing,
// border radius, hover effect and reduced-motion behaviour so no two
// WhatsApp buttons ever look different.
//
// Performance-safe by design:
//   • one shared glyph (react-icons FaWhatsapp) — no images, no Lottie
//   • CSS-only hover (transform/opacity → GPU), no animation libraries
//   • respects prefers-reduced-motion
//   • no layout shift / no SEO impact (purely presentational)
// ────────────────────────────────────────────────────────────────

import type { ReactNode } from "react";
import { FaWhatsapp } from "react-icons/fa";

// Official WhatsApp brand green — used everywhere for instant recognition.
// (Exported for inline-style use; Tailwind classes below use literal hexes.)
export const WHATSAPP_GREEN = "#25D366";

type WhatsAppVariant = "floating" | "outline" | "solid";

interface WhatsAppButtonProps {
  /** WhatsApp link (wa.me / api.whatsapp). Omit to render a non-linked button. */
  href?: string;
  /** Visual style. `floating` = circular icon FAB; `outline`/`solid` = pill with label. */
  variant?: WhatsAppVariant;
  /** Label text for `outline` / `solid` variants. */
  children?: ReactNode;
  /** Accessible label — required for the icon-only `floating` variant. */
  ariaLabel?: string;
  /** Extra classes from the caller (e.g. margins / positioning). */
  className?: string;
  /** Click handler for non-linked buttons. */
  onClick?: () => void;
}

// Shared icon — import this anywhere a custom-styled element still needs the
// standard WhatsApp glyph, so the icon source stays in exactly one place.
export function WhatsAppIcon({ className }: { className?: string }) {
  return <FaWhatsapp className={className} aria-hidden="true" />;
}

// NOTE: Tailwind scans source for *literal* class strings, so the brand
// green is written out as literal arbitrary values below (not interpolated
// from WHATSAPP_GREEN, which the scanner cannot see). WHATSAPP_GREEN stays
// exported for inline-style use. Keep these hexes in sync: #25D366 / #20bd5a.
const BASE =
  "inline-flex items-center justify-center transition duration-300 motion-reduce:transition-none";

const VARIANTS: Record<WhatsAppVariant, string> = {
  // Circular icon button (floating CTAs / footer). 44px touch target.
  floating: `${BASE} h-11 w-11 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 hover:scale-110 hover:bg-[#20bd5a] active:scale-95 motion-reduce:hover:scale-100`,
  // Green outline pill with icon + label → fills green on hover.
  outline: `${BASE} gap-2 rounded-full border border-[#25D366] px-7 py-3.5 text-[12px] tracking-[1px] text-[#25D366] hover:bg-[#25D366] hover:text-white`,
  // Filled green pill with icon + label (white content).
  solid: `${BASE} gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-[12px] tracking-[1px] text-white shadow-md hover:scale-105 hover:bg-[#20bd5a] active:scale-95 motion-reduce:hover:scale-100`,
};

const ICON_SIZE: Record<WhatsAppVariant, string> = {
  floating: "text-xl",
  outline: "text-lg",
  solid: "text-lg",
};

export default function WhatsAppButton({
  href,
  variant = "floating",
  children,
  ariaLabel,
  className = "",
  onClick,
}: WhatsAppButtonProps) {
  const classes = `${VARIANTS[variant]} ${className}`.trim();
  const label = ariaLabel ?? (variant === "floating" ? "Chat with us on WhatsApp" : undefined);

  const content = (
    <>
      <WhatsAppIcon className={ICON_SIZE[variant]} />
      {children}
    </>
  );

  // Render as a link when an href exists, otherwise a button (preserves the
  // existing non-linked buttons without inventing a number).
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={classes}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" aria-label={label} className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
