import { describe, it, expect } from "vitest";
import { COURSE_MAP } from "../supabase/functions/create-checkout-session/index";

// The checkout endpoint resolves `COURSE_MAP[courseSlug]`; an unknown/empty
// slug yields no course and the handler returns 400. These tests pin that
// validation data so a bad edit can't introduce a free/zero-priced or
// unknown-course checkout. (Full HTTP-status branch testing would require
// exporting the request handler; intentionally out of this minimal scope.)
const EXPECTED_SLUGS = [
  "open-diver",
  "try-dive",
  "advanced-open-water",
  "padi-open-water",
  "padi-scuba-diver",
  "padi-rescue-diver",
  "padi-divemaster",
];

// Mirrors the guard in the handler: `slug ? COURSE_MAP[slug] : null`.
function resolveCourse(slug?: string) {
  return slug && slug in COURSE_MAP
    ? COURSE_MAP[slug as keyof typeof COURSE_MAP]
    : null;
}

describe("checkout course validation", () => {
  it("exposes exactly the expected course slugs", () => {
    expect(Object.keys(COURSE_MAP).sort()).toEqual([...EXPECTED_SLUGS].sort());
  });

  it("rejects unknown / empty / missing slugs (→ 400 path)", () => {
    expect(resolveCourse("hacked-course")).toBeNull();
    expect(resolveCourse("")).toBeNull();
    expect(resolveCourse(undefined)).toBeNull();
  });

  it.each(EXPECTED_SLUGS)(
    "%s resolves to a positive integer amount in fils",
    (slug) => {
      const course = resolveCourse(slug);
      expect(course).not.toBeNull();
      expect(Number.isInteger(course!.amount)).toBe(true);
      expect(course!.amount).toBeGreaterThan(0);
    }
  );

  it("never exposes a zero/negative price (no free or charge-back checkout)", () => {
    for (const slug of EXPECTED_SLUGS) {
      // smallest real product is the Try Dive at AED 350 = 35000 fils
      expect(resolveCourse(slug)!.amount).toBeGreaterThanOrEqual(35000);
    }
  });
});
