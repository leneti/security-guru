import { render, screen } from "@testing-library/react";
import About from "@site/pages/apie-mus";

jest.mock("@lottiefiles/react-lottie-player", () => ({
  Player: (props: any) => <div>Mock Player {JSON.stringify(props)}</div>,
}));
jest.mock("@site/components/PageBackground", () => ({
  PageBackground: (props: any) => (
    <div data-testid="Mock-PageBackground" {...props} />
  ),
}));

describe("About", () => {
  it("renders animation player", () => {
    jest
      .spyOn(jest.requireActual("@mantine/hooks"), "useReducedMotion")
      .mockReturnValue(false);

    render(<About />);

    expect(screen.getByText(/mock player.*/i)).toBeInTheDocument();
  });
});
