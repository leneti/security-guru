import NotFound from "@site/app/not-found";
import { render, screen } from "@site/test-utils";

describe("Not found page", () => {
  it("has a link back to home page", () => {
    render(<NotFound />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
