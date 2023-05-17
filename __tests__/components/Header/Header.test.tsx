import { render, screen } from "@testing-library/react";
import { Header } from "@site/components/Header";

jest.mock("@site/components/Logo");
jest.mock("@mantine/core", () => {
  const orgMantineCore = jest.requireActual("@mantine/core");
  return {
    ...orgMantineCore,
    Group: jest.fn(() => <div>Mock Group</div>),
  };
});

describe("Header", () => {
  it.each([
    { screenSize: "smaller", size: 40 },
    { screenSize: "larger", size: 50 },
  ])("renders $size logo on $size screens", ({ screenSize, size }) => {
    jest
      .spyOn(jest.requireActual("@mantine/hooks"), "useMediaQuery")
      .mockReturnValue(screenSize === "smaller");

    render(<Header />);

    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("size", size.toString());
  });

  it.each([{ scrolled: 0 }, { scrolled: 1 }])(
    "matches snapshot when scrolled $scrolled px",
    ({ scrolled }) => {
      jest
        .spyOn(jest.requireActual("@mantine/hooks"), "useWindowScroll")
        .mockReturnValue([{ y: scrolled }]);

      const { container } = render(<Header />);

      expect(container).toMatchSnapshot();
    }
  );
});
