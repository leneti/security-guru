import type { PageBGProps } from "../types";

export function PageBackground(props: Partial<PageBGProps>) {
  const { wip, pageTitle, children, colorOnly } = props;
  return (
    <div
      data-testid={`Mock-PageBackground${pageTitle ? ` ${pageTitle}` : ""}${
        colorOnly ? " colorOnly" : ""
      }${wip ? " WIP" : ""}`}
    >
      {children}
    </div>
  );
}
