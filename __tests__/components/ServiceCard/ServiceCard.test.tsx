import { render, screen } from "@testing-library/react";
import { ServiceCard, ServiceCardProps } from "@site/components/ServiceCard";
import * as mCore from "@mantine/core";

jest.mock("@mantine/core", () => {
  const orgMantineCore = jest.requireActual("@mantine/core");
  const Btn = orgMantineCore.Button;
  return {
    ...orgMantineCore,
    Button: jest.fn((props: any) => <Btn {...props} />),
  };
});

const mockProps: ServiceCardProps = {
  image: "/img.jpg",
  title: "mock-title",
  description: "mock-description",
  price: "176",
  url: "/mock-service",
};

describe("ServiceCard", () => {
  it.each([
    { size: "lg", screenSize: "smaller" },
    { size: "md", screenSize: "larger" },
  ])("renders $size button on $screenSize screens", ({ size, screenSize }) => {
    jest
      .spyOn(jest.requireActual("@mantine/hooks"), "useMediaQuery")
      .mockReturnValue(screenSize === "smaller");
    const buttonMock = jest.spyOn(mCore, "Button");

    render(<ServiceCard {...mockProps} />);

    expect(screen.getByRole("heading", { level: 3 })).toContainHTML(
      mockProps.title
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", mockProps.url);
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByText(mockProps.price)).toBeInTheDocument();

    expect(buttonMock).toHaveBeenCalledWith(
      expect.objectContaining({ size }),
      {}
    );
  });
});
