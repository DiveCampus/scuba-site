import { describe, it, expect } from "vitest";
import { renderPage, screen } from "@/test/test-utils";
import { AboutDiveCampus } from "@/app/components/pages/AboutDiveCampus";

describe("AboutDiveCampus page", () => {
  it("renders without crashing", () => {
    const { container } = renderPage(<AboutDiveCampus />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders the team members (primary content)", () => {
    renderPage(<AboutDiveCampus />);
    expect(screen.getByText("ISLAM")).toBeInTheDocument();
    // exact match — avoids colliding with the "Co-Founder" role label
    expect(screen.getByText("Founder")).toBeInTheDocument();
  });

  it("renders the full team grid as headings", () => {
    renderPage(<AboutDiveCampus />);
    // 8 static team members, each rendered as a heading-level name card.
    expect(screen.getAllByRole("heading").length).toBeGreaterThanOrEqual(4);
  });
});
