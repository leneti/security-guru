import type { SlideDownTitleProps } from "../types";

export function SlideDownTitle(props: SlideDownTitleProps) {
  const { title, wip } = props;
  return (
    <h1 className={`mock-slide-down-title${wip ? " WIP" : ""}`}>{title}</h1>
  );
}
