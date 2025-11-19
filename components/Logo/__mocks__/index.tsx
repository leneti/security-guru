import type { LogoProps } from "../types";

export function Logo({ iconOnly, ...rest }: LogoProps) {
  return (
    <a data-testid="logo" {...rest}>
      Mocked Logo{iconOnly ? <span> IconOnly</span> : null}
    </a>
  );
}
