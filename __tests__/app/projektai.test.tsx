import Projects from "@site/app/projektai/page";
import { render, screen } from "@site/test-utils";

jest.mock("@site/components/PageBackground");

describe("Projects", () => {
  it("render", () => {
    render(<Projects />);
    expect(screen.getByTestId(/projektai/i)).toBeInTheDocument();
  });
});
