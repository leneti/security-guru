import { render, screen } from "@site/test-utils";
import { MantineProvider } from "@mantine/core";
import { theme } from "@site/constants/theme";
import About from "@site/pages/apie-mus";

jest.mock("@lottiefiles/react-lottie-player", () => ({
  Player: (props: any) => <div>Mock Player {JSON.stringify(props)}</div>,
}));
jest.mock("@site/components/PageBackground");

describe("About", () => {
  it("renders animation player", () => {
    jest
      .spyOn(jest.requireActual("@mantine/hooks"), "useReducedMotion")
      .mockReturnValue(false);

    render(
      <MantineProvider theme={theme}>
        <About />
      </MantineProvider>,
    );

    expect(screen.getByText(/mock player.*/i)).toBeInTheDocument();
  });
});
