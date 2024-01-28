import { render, screen, fireEvent } from "@site/test-utils";
import { BurgerMenu } from "@site/components/Header/BurgerMenu";
import { flatLinks } from "@site/constants/menu-links";

jest.mock("@site/components/Logo");
jest.mock("@site/components/Header/BurgerMenu/NavbarLinksGroup");

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

describe("BurgerMenu", () => {
  it("renders burger menu button", () => {
    const toggleMock = jest.fn().mockName("toggle");

    jest
      .spyOn(jest.requireActual("@mantine/hooks"), "useDisclosure")
      .mockReturnValue([
        false,
        {
          close: jest.fn().mockName("close"),
          toggle: toggleMock,
        },
      ]);

    render(<BurgerMenu />);

    const burgerMenuButton = screen.getByRole("button", { hidden: true });

    fireEvent.click(burgerMenuButton);
    expect(toggleMock).toBeCalled();
  });

  it("renders all menu links in drawer", () => {
    const closeMock = jest.fn().mockName("close");
    const toggleMock = jest.fn().mockName("toggle");
    jest
      .spyOn(jest.requireActual("@mantine/hooks"), "useDisclosure")
      .mockReturnValue([
        true,
        {
          close: closeMock,
          toggle: toggleMock,
        },
      ]);

    render(<BurgerMenu />);

    const burgerMenuButtons = screen.getAllByRole("button", { hidden: true });

    burgerMenuButtons.forEach(fireEvent.click);

    expect(closeMock).toHaveBeenCalledTimes(1);
    expect(toggleMock).toHaveBeenCalledTimes(1);

    expect(screen.getAllByRole("link", { hidden: true })).toHaveLength(
      flatLinks.length,
    );
  });
});
