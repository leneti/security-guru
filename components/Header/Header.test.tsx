import { Header } from "@site/components/Header";
import { render } from "@site/test-utils";

jest.mock("@site/components/Logo");
jest.mock("@mantine/core", () => {
  const orgMantineCore = jest.requireActual("@mantine/core");
  return {
    ...orgMantineCore,
    Group: jest.fn(() => <div>Mock Group</div>),
  };
});

describe("Header", () => {
  it.each([{ scrolled: 0 }, { scrolled: 41 }, { scrolled: 120 }])(
    "matches snapshot when scrolled $scrolled px",
    ({ scrolled }) => {
      jest
        .spyOn(jest.requireActual("@mantine/hooks"), "useWindowScroll")
        .mockReturnValue([{ y: scrolled }]);
      jest
        .spyOn(jest.requireActual("@mantine/hooks"), "useHeadroom")
        .mockReturnValue(scrolled < 120);

      const { container } = render(<Header />);

      expect(container).toMatchSnapshot();
    },
  );
});
