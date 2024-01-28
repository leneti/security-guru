import { render } from "@site/test-utils";
import { Footer } from "@site/components/Footer";

describe("Footer", () => {
  it("renders", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
