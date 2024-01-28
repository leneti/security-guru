import { render } from "@site/test-utils";
import { Logo } from "@site/components/Logo";

describe("Logo", () => {
  it.each([
    { variant: "default", props: {} },
    { variant: "icon only", props: { iconOnly: true } },
    { variant: "vertical", props: { vertical: true } },
  ])("renders $variant", ({ props }) => {
    const { container } = render(<Logo {...props} />);
    expect(container).toMatchSnapshot();
  });
});
