import { render, screen } from "@testing-library/react";
import { Footer } from "@site/components/Footer";

jest.mock("@site/components/Logo");

describe("Footer", () => {
  it.each([
    {
      size: "small",
      iconSize: "28",
    },
    {
      size: "large",
      iconSize: "18",
    },
  ])("renders correctly on $size screens", ({ iconSize, size }) => {
    jest
      .spyOn(jest.requireActual("@mantine/hooks"), "useMediaQuery")
      .mockReturnValue(size === "small");

    render(<Footer />);

    screen
      .getAllByRole("link")
      .forEach((icon) =>
        expect(icon.firstElementChild).toHaveAttribute("width", iconSize)
      );
  });
});
