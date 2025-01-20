import { Footer } from "@site/components/Footer";
import { render } from "@site/test-utils";

describe("Footer", () => {
  it("renders", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
