import type { MouseEventHandler } from "react";

export interface LogoProps {
  iconOnly?: boolean;
  size?: number;
  vertical?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}
