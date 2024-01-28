import { render } from "@site/test-utils";
import { Services } from "@site/components/Services";

describe("Services", () => {
  it("renders", () => {
    const { container } = render(<Services />);
    expect(container).toMatchSnapshot();
  });
});
