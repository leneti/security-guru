import { ContactInfo } from "@site/components/ContactInfo";
import { render } from "@site/test-utils";

jest.mock(
  "@tabler/icons-react",
  () =>
    new Proxy(
      {
        __esModule: true,
      },
      {
        get: (_: any, prop: string) => () => <div>mock_{prop}</div>,
      },
    ),
);

describe("ContactInfo", () => {
  it("renders", () => {
    const { container } = render(<ContactInfo />);
    expect(container).toMatchSnapshot();
  });
});
