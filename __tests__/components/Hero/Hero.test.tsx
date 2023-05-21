import { render } from "@testing-library/react";
import { Hero } from "@site/components/Hero";

describe("Hero", () => {
  it("renders", () => {
    const { container } = render(<Hero />);
    expect(container).toMatchSnapshot();
  });
});
