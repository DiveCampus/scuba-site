import { describe, it, expect } from "vitest";
import { COURSE_DATA, type CourseSlug } from "../src/data/courseData";
import { COURSE_MAP } from "../supabase/functions/create-checkout-session/index";

// Prices live in two runtimes: the client (AED whole units, shown to the user)
// and the Stripe edge function (fils = AED × 100, the amount actually charged).
// These tests fail loudly if the two ever drift — i.e. if a user could be
// shown one price and charged another.
describe("price parity: client courseData vs Stripe edge COURSE_MAP", () => {
  const slugs = Object.keys(COURSE_DATA) as CourseSlug[];

  it("both sources define the exact same set of course slugs", () => {
    expect([...slugs].sort()).toEqual(Object.keys(COURSE_MAP).sort());
  });

  it.each(slugs)(
    "%s: charged amount === displayed price × 100 (AED → fils)",
    (slug) => {
      expect(COURSE_MAP[slug].amount).toBe(COURSE_DATA[slug].price * 100);
    }
  );

  it.each(slugs)("%s: currency is AED on both sides", (slug) => {
    expect(COURSE_DATA[slug].currency).toBe("AED");
    expect(COURSE_MAP[slug].currency).toBe("AED");
  });

  it.each(slugs)("%s: course title matches across sources", (slug) => {
    expect(COURSE_MAP[slug].title).toBe(COURSE_DATA[slug].title);
  });
});
