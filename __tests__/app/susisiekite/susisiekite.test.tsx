import ContactUs from "@site/app/susisiekite/page";
import { render } from "@site/test-utils";

jest.mock("@site/components/PageBackground");
jest.mock("@site/app/susisiekite/GetInTouch");

describe("Contact-us page", () => {
  it("renders", () => {
    const { container } = render(<ContactUs />);
    expect(container).toMatchSnapshot();
  });
});
