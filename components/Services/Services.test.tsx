import { Services } from "@site/components/Services";
import { render } from "@site/test-utils";

describe("Services", () => {
  it("renders", () => {
    const { container } = render(<Services />);
    expect(container).toMatchSnapshot();
  });
});
