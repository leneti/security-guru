import Error500 from "@site/app/error";
import { fireEvent, render, screen } from "@site/test-utils";

describe("Error 500 page", () => {
  it("reloads page on button click", () => {
    const reset = jest.fn();
    const mockError = new Error("mock error");

    render(<Error500 reset={reset} error={mockError} />);

    expect(screen.getByText("500")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /atnaujinti/i }));

    expect(reset).toHaveBeenCalledTimes(1);
  });
});
