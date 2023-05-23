import { render } from "@testing-library/react";
import { Feature } from "@site/components/Feature";

describe("Feature", () => {
  it("render", () => {
    const { container } = render(
      <Feature
        title="mock-feature"
        description="mock-description"
        icon={jest.fn(() => (
          <i>mock-icon</i>
        ))}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
