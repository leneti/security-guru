import { Hero } from "@site/components/Hero";
import { render } from "@site/test-utils";

describe("Hero", () => {
  it("renders", () => {
    const { container } = render(<Hero />);
    expect(container).toMatchSnapshot();
  });
});
