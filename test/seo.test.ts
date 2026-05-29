import { describe, it, expect } from "vitest";
import { getRouteSeo } from "../src/app/components/seoConfig";

// Protects indexability rules: marketing pages must stay indexable with the
// right canonical; admin, transactional and unknown (404) routes must stay
// noindex. A regression here = Google indexing the admin panel or soft-404s.
describe("getRouteSeo indexability", () => {
  it("known marketing route is indexable with correct canonical + title", () => {
    const seo = getRouteSeo("/padi-open-water");
    expect(seo.noindex).toBeFalsy();
    expect(seo.canonical).toBe("/padi-open-water");
    expect(seo.title).toMatch(/open water/i);
  });

  it("home is indexable", () => {
    const seo = getRouteSeo("/");
    expect(seo.noindex).toBeFalsy();
    expect(seo.canonical).toBe("/");
  });

  it("local landing route is indexable", () => {
    expect(getRouteSeo("/scuba-diving-dubai").noindex).toBeFalsy();
  });

  it("/admin is noindex", () => {
    expect(getRouteSeo("/admin").noindex).toBe(true);
  });

  it("admin sub-routes are noindex", () => {
    expect(getRouteSeo("/admin/dashboard/courses").noindex).toBe(true);
  });

  it("booking + payment routes are noindex", () => {
    expect(getRouteSeo("/booking").noindex).toBe(true);
    expect(getRouteSeo("/payment-success").noindex).toBe(true);
    expect(getRouteSeo("/payment-cancel").noindex).toBe(true);
  });

  it("unknown route (404) is noindex", () => {
    expect(getRouteSeo("/no-such-page").noindex).toBe(true);
  });
});
