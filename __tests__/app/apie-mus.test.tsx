import { render, screen } from "@site/test-utils";
import About from "@site/app/apie-mus/page";

jest.mock("@lottiefiles/react-lottie-player", () => ({
  Player: (props: any) => <div>Mock Player {JSON.stringify(props)}</div>,
}));
jest.mock("@site/components/PageBackground");

describe("About", () => {
  it("renders animation player", () => {
    jest
      .spyOn(jest.requireActual("@mantine/hooks"), "useReducedMotion")
      .mockReturnValue(false);

    render(<About />);

    expect(screen.getByText(/mock player.*/i)).toBeInTheDocument();
  });
});
