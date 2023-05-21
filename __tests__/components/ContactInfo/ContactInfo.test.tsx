import { render } from "@testing-library/react";
import { ContactInfo } from "@site/components/ContactInfo";

jest.mock(
  "@tabler/icons",
  () =>
    new Proxy(
      {
        __esModule: true,
      },
      {
        get: (_: any, prop: string) => () => <div>mock_{prop}</div>,
      }
    )
);

describe("ContactInfo", () => {
  it("renders", () => {
    const { container } = render(<ContactInfo />);
    expect(container).toMatchSnapshot();
  });
});
