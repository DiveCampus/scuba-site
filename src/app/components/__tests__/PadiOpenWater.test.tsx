import { describe, it, expect } from "vitest";
import { renderPage, screen } from "@/test/test-utils";
import { PadiOpenWater } from "@/app/components/pages/PadiOpenWater";

describe("PadiOpenWater page", () => {
  it("renders without crashing", () => {
    const { container } = renderPage(<PadiOpenWater />);
    expect(container.firstChild).toBeTruthy();
  });

  it("shows the page's primary (SEO) title", async () => {
    renderPage(<PadiOpenWater />);
    expect(
      await screen.findByRole("heading", {
        name: /padi open water diver course dubai/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders at least one interactive control", () => {
    renderPage(<PadiOpenWater />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("renders multiple headings (sections present)", () => {
    renderPage(<PadiOpenWater />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });
});
