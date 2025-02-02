import { Feature, type FeatureProps } from "@site/components/Feature";
import { render } from "@site/test-utils";

describe("Feature", () => {
  it("render", () => {
    const { container } = render(
      <Feature
        title="mock-feature"
        description="mock-description"
        icon={
          jest.fn(() => <i>mock-icon</i>) as unknown as FeatureProps["icon"]
        }
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
