import NavbarLinksGroup from "@site/components/Header/BurgerMenu/NavbarLinksGroup";
import { fireEvent, render, screen } from "@site/test-utils";

const mockUrl = "/mock";
const mockLabel = "mock_label";
const mockLinks = [
  { label: `${mockLabel}_1`, url: `${mockUrl}_1` },
  { label: `${mockLabel}_2`, url: `${mockUrl}_2` },
];

describe("NavbarLinksGroup", () => {
  it("renders link", () => {
    render(
      <NavbarLinksGroup
        icon={(() => <div>Mock Icon</div>) as any}
        url={mockUrl}
        label={mockLabel}
        closeDrawer={jest.fn()}
      />,
    );

    expect(screen.getByText("Mock Icon")).toBeInTheDocument();
    expect(screen.getByText(mockLabel)).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", mockUrl);
  });

  it("renders link group", async () => {
    render(
      <NavbarLinksGroup
        icon={(() => <div>Mock Icon</div>) as any}
        links={mockLinks}
        label={mockLabel}
        closeDrawer={jest.fn()}
      />,
    );

    const dropdownButton = screen.getByRole("button");
    fireEvent.click(dropdownButton);

    const renderedLinks = await screen.findAllByRole("link");

    renderedLinks.forEach((link, index) => {
      expect(link).toHaveAttribute("href", mockLinks[index].url);
      expect(link).toHaveTextContent(mockLinks[index].label);
    });
  });
});
