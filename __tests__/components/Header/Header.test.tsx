import { render, screen } from "@site/test-utils";
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
  it.each([{ scrolled: 0 }, { scrolled: 1 }])(
    "matches snapshot when scrolled $scrolled px",
    ({ scrolled }) => {
      jest
        .spyOn(jest.requireActual("@mantine/hooks"), "useWindowScroll")
        .mockReturnValue([{ y: scrolled }]);

      const { container } = render(<Header />);

      expect(container).toMatchSnapshot();
    },
  );
});
