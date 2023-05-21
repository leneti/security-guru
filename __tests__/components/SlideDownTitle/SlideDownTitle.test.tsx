import { render, screen, waitFor } from "@testing-library/react";
import { SlideDownTitle } from "@site/components/SlideDownTitle";

jest.mock("@site/contexts/prevUrl", () => ({
  __esModule: true,
  usePrevUrlContext: jest.fn(() => "/").mockName("usePrevUrlContext"),
}));
jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: () => ({
    asPath: "/mock-page",
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}));
jest.mock("@site/constants", () => ({
  flatLinks: [{ url: "/" }, { url: "/mock-page" }, { url: "/not-home-page" }],
}));

const mockTitle = "mock-title";

describe("SlideDownTitle", () => {
  it("renders title sliding from top", async () => {
    render(<SlideDownTitle title={mockTitle} />);

    const heading = screen.getByRole("heading", { name: mockTitle });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveProperty("style.transition-duration", "200ms");

    await waitFor(() => expect(heading).toHaveProperty("style.opacity", "1"));
    await waitFor(() =>
      expect(heading).toHaveProperty("style.transform", "scaleY(1)")
    );
  });

  it.each([
    { from: "/not-home-page", to: "/mock-page", side: "right" },
    { from: "/mock-page", to: "/not-home-page", side: "left" },
  ])("renders title sliding from $side", ({ from, to }) => {
    jest
      .spyOn(require("@site/contexts/prevUrl"), "usePrevUrlContext")
      .mockReturnValue(from);

    jest.spyOn(require("next/router"), "useRouter").mockImplementation(() => ({
      asPath: to,
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
    }));

    const { container } = render(<SlideDownTitle title={mockTitle} />);

    expect(
      screen.getByRole("heading", { name: mockTitle })
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders WIP text", () => {
    render(<SlideDownTitle title={mockTitle} wip />);
    expect(screen.getByText("Puslapis ruošiamas")).toBeInTheDocument();
  });

  it("renders title with no transition", () => {
    jest
      .spyOn(jest.requireActual("@mantine/hooks"), "useReducedMotion")
      .mockReturnValue(true);

    const { container } = render(<SlideDownTitle title={mockTitle} />);

    expect(container).toMatchSnapshot();
  });
});
