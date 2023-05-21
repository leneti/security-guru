import { render, screen } from "@testing-library/react";
import Error404 from "@site/pages/404";

describe("Error 404 page", () => {
  it("has a link back to home page", () => {
    render(<Error404 />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
