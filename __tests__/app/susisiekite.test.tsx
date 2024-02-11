import { render } from "@site/test-utils";
import ContactUs from "@site/app/susisiekite/page";

jest.mock("@site/components/PageBackground");
jest.mock("@site/components/GetInTouch");

describe("Contact-us page", () => {
  it("renders", () => {
    const { container } = render(<ContactUs />);
    expect(container).toMatchSnapshot();
  });
});
