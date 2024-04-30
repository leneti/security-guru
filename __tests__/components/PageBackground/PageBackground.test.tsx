import { PageBackground, PageBGProps } from "@site/components/PageBackground";
import { render, screen } from "@site/test-utils";

const mockTitle = "Test title";
const mockContent = "Mock content";
const wipText = "Puslapis ruošiamas";

const testProps: { toRender: string; props: Omit<PageBGProps, "pageTitle"> }[] =
  [
    { toRender: "content and image background", props: {} },
    { toRender: "content on colored background", props: { colorOnly: true } },
    {
      toRender: "wip content on colored background",
      props: { colorOnly: true, wip: true },
    },
    {
      toRender: "content on colored background and full width",
      props: { colorOnly: true, fullWidth: true },
    },
  ];

describe("PageBackground", () => {
  it.each(testProps)("renders $toRender", ({ props }) => {
    render(
      <PageBackground {...props} pageTitle={mockTitle}>
        {mockContent}
      </PageBackground>,
    );

    const { wip, colorOnly } = props;
    const heading = screen.getByRole("heading");

    expect(heading).toHaveTextContent(mockTitle);

    if (wip) {
      expect(screen.getByText(wipText)).toBeInTheDocument();
    } else {
      expect(screen.queryByText(wipText)).not.toBeInTheDocument();
    }

    if (colorOnly) {
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    } else {
      expect(screen.getByRole("img")).toBeInTheDocument();
    }

    expect(screen.getByText(mockContent)).toBeInTheDocument();
  });
});
