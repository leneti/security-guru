import { render, screen } from "@testing-library/react";
import { PageBackground } from "@site/components/PageBackground";

jest.mock("@site/components/PageTitle");
jest.mock("@site/components/SlideDownTitle");

const mockTitle = "Test title";
const mockContent = "Mock content";

describe("PageBackground", () => {
  it.each([
    { toRender: "content and image background", props: {} },
    { toRender: "content on colored background", props: { colorOnly: true } },
    {
      toRender: "wip content on colored background",
      props: { colorOnly: true, wip: true },
    },
  ])("renders $toRender", ({ props }) => {
    render(
      <PageBackground {...props} pageTitle={mockTitle}>
        {mockContent}
      </PageBackground>
    );

    const { wip, colorOnly } = props;
    const heading = screen.getByRole("heading");

    expect(heading).toHaveTextContent(mockTitle);

    if (wip) {
      expect(heading).toHaveClass("WIP");
    } else {
      expect(heading).not.toHaveClass("WIP");
    }

    if (colorOnly) {
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    } else {
      expect(screen.getByRole("img")).toBeInTheDocument();
    }

    expect(screen.getByText(mockContent)).toBeInTheDocument();
  });
});
