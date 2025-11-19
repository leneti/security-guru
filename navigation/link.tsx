"use client";

import NextLink from "next/link";
import { nprogress } from "@mantine/nprogress";
import { shouldTriggerStartEvent } from "./should-start";

export default function NavLink({
  ref,
  href,
  onClick,
  children,
  ...rest
}: React.ComponentProps<"a">) {
  const useLink = href && href.startsWith("/");
  if (!useLink)
    return (
      <a href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    );

  return (
    <NextLink
      href={href}
      onClick={(event) => {
        if (shouldTriggerStartEvent(href, event)) nprogress.start();
        if (onClick) onClick(event);
      }}
      {...rest}
      ref={ref}
    >
      {children}
    </NextLink>
  );
}
