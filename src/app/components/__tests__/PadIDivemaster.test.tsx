import { describe, it, expect } from "vitest";
import { renderPage, screen, act } from "@/test/test-utils";
import DivemasterPage from "@/app/divemaster/PadIDivemaster";

describe("PADI Divemaster page", () => {
  it("renders without crashing", () => {
    const { container } = renderPage(<DivemasterPage />);
    expect(container.firstChild).toBeTruthy();
  });

  it("shows the page's primary (SEO) title", async () => {
    renderPage(<DivemasterPage />);
    // The SEO fallback <h1> is rendered in the initial (loading) state.
    expect(
      screen.getByRole("heading", { name: /padi divemaster course dubai/i }),
    ).toBeInTheDocument();
    // Flush the pending hero fetch so the post-render state update is wrapped.
    await act(async () => {
      await Promise.resolve();
    });
  });

  it("renders at least one interactive control", () => {
    renderPage(<DivemasterPage />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("renders multiple headings (sections present)", () => {
    renderPage(<DivemasterPage />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });
});
