import { MouseEventHandler } from "react";

export interface LogoProps {
  iconOnly?: boolean;
  size?: number;
  drawer?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}
