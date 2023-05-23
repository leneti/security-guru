import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "@site/pages";

jest.mock("@site/components/Hero");
jest.mock("@site/components/PageTitle");
jest.mock("@site/components/Services");

describe("Home page", () => {
  it.each([
    { state: "with animation", value: true },
    { state: "without animation", value: false },
  ])("renders scroll button $state", ({ value }) => {
    jest
      .spyOn(jest.requireActual("@mantine/hooks"), "useReducedMotion")
      .mockReturnValue(value);

    const { container } = render(<HomePage />);
    expect(container).toMatchSnapshot();
  });

  it("scrolls to services on click", () => {
    const mockScrollFn = jest.fn().mockName("scrollIntoView");
    jest
      .spyOn(jest.requireActual("@mantine/hooks"), "useScrollIntoView")
      .mockReturnValue({ scrollIntoView: mockScrollFn });

    render(<HomePage />);

    const scrollBtn = screen.getByTitle(/eiti žemyn/i);
    fireEvent.click(scrollBtn);
    expect(mockScrollFn).toHaveBeenCalled();
  });
});
