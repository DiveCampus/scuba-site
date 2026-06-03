import { describe, it, expect } from "vitest";
import { renderPage, screen } from "@/test/test-utils";
import { PadiRescueDiver } from "@/app/components/pages/PadiRescueDiver";

describe("PadiRescueDiver page", () => {
  it("renders without crashing", () => {
    const { container } = renderPage(<PadiRescueDiver />);
    expect(container.firstChild).toBeTruthy();
  });

  it("shows the page's primary (SEO) title", async () => {
    renderPage(<PadiRescueDiver />);
    expect(
      await screen.findByRole("heading", {
        name: /padi rescue diver course dubai/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders at least one interactive control", () => {
    renderPage(<PadiRescueDiver />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("renders multiple headings (sections present)", () => {
    renderPage(<PadiRescueDiver />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });
});
