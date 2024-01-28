import { render, screen, fireEvent } from "@site/test-utils";
import Error500 from "@site/pages/500";

describe("Error 500 page", () => {
  const original = window.location;

  beforeAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: original,
    });
  });

  it("reloads page on button click", () => {
    render(<Error500 />);

    expect(screen.getByText("500")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /atnaujinti.*/i }));

    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
