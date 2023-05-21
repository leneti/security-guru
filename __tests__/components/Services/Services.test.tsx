import { render } from "@testing-library/react";
import { Services } from "@site/components/Services";

jest.mock("@site/components/ServiceCard");

describe("Services", () => {
  it("renders", () => {
    const { container } = render(<Services />);
    expect(container).toMatchSnapshot();
  });
});
