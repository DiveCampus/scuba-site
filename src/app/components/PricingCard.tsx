// src/app/components/PricingCard.tsx
//
// GLOBAL reusable pricing card — ONE identical premium glassmorphism card
// used everywhere AED pricing is shown. Reference design: Open Water Hero.
//
// Hierarchy:
//   Top    → old price (gray, line-through) — optional, only if it exists
//   Middle → AED + main price (prominent)
//
// Fully null-safe: empty values are hidden, and the whole card renders
// nothing if there is no price, old price, or supporting content.

"use client";

import type { ReactNode } from "react";

export interface PricingCardProps {
  price?: string | number;
  oldPrice?: string | number;
  className?: string;
  /** Optional page-specific supporting content (notes, tags) rendered inside the card. */
  children?: ReactNode;
}

const has = (value?: string | number): boolean =>
  value !== undefined && value !== null && String(value).trim() !== "";

export function PricingCard({
  price,
  oldPrice,
  className = "",
  children,
}: PricingCardProps) {
  const hasContent = has(price) || has(oldPrice) || Boolean(children);

  if (!hasContent) return null;

  return (
    <div
      className={`inline-flex flex-col items-center text-center rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl px-8 md:px-10 py-6 md:py-7 shadow-[0_20px_80px_rgba(0,0,0,0.4)] ${className}`}
    >
      {/* OLD PRICE */}
      {has(oldPrice) && (
        <p className="text-sm text-white/50 line-through tracking-[2px]">
          AED {oldPrice}
        </p>
      )}

      {/* MAIN PRICE */}
      {has(price) && (
        <p className="mt-1 text-4xl md:text-5xl font-bold leading-none tracking-[1px]">
          <span className="text-cyan-400 text-lg md:text-xl font-medium mr-2">
            AED
          </span>
          {price}
        </p>
      )}

      {/* OPTIONAL SUPPORTING CONTENT (notes, tags) */}
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}

export default PricingCard;
