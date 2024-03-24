"use client";

import { forwardRef } from "react";
import NextLink from "next/link";
import { nprogress } from "@mantine/nprogress";
import { shouldTriggerStartEvent } from "./should-start";

export default forwardRef<HTMLAnchorElement, React.ComponentProps<"a">>(
  function Link({ href, onClick, ...rest }, ref) {
    const useLink = href && href.startsWith("/");
    if (!useLink) return <a href={href} onClick={onClick} {...rest} />;

    return (
      <NextLink
        href={href}
        onClick={(event) => {
          if (shouldTriggerStartEvent(href, event)) nprogress.start();
          if (onClick) onClick(event);
        }}
        {...rest}
        ref={ref}
      />
    );
  },
);
