import { render, screen } from "@testing-library/react";
import Projects from "@site/pages/projektai";

jest.mock("@site/components/PageBackground");

describe("Projects", () => {
  it("render", () => {
    render(<Projects />);
    expect(screen.getByTestId(/projektai/i)).toBeInTheDocument();
  });
});
