import About from "@site/app/apie-mus/page";
import { render } from "@site/test-utils";

jest.mock("@site/components/PageBackground");

describe("About", () => {
  it("renders animation player", () => {
    jest
      .spyOn(jest.requireActual("@mantine/hooks"), "useReducedMotion")
      .mockReturnValue(false);

    render(<About />);
  });
});
