"use client";

import { clsx } from "clsx";
import {
  Box,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  UnstyledButton,
} from "@mantine/core";
import { useHeadroom, useWindowScroll } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { BurgerMenu } from "@site/components/Header/BurgerMenu";
import { Logo } from "@site/components/Logo";
import { menuLinks } from "@site/constants/menu-links";
import Link from "@link";
import classes from "./Header.module.css";

export default function Header() {
  const [scroll] = useWindowScroll();
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <Box
      className={clsx(classes.outer, scroll.y > 40 && classes.outerBoxShadow)}
      style={{ translate: `0 ${pinned ? 0 : "-6.875rem"}` }}
    >
      <nav className={classes.inner}>
        <Logo size={40} className={classes.smallDisplayOnly} />
        <Logo size={50} className={classes.bigDisplayOnly} />

        <BurgerMenu />

        <Group
          className={classes.linkGroup}
          gap="xs"
          visibleFrom="md"
          wrap="nowrap"
        >
          {menuLinks.map((link) => {
            if (!("links" in link)) {
              return (
                <Link key={link.label} href={link.url} className={classes.link}>
                  {link.label}
                </Link>
              );
            }

            const { label, links } = link;

            return (
              <Menu key={label}>
                <MenuTarget>
                  <UnstyledButton className={classes.link}>
                    <span className={classes.linkLabel}>{label}</span>
                    <IconChevronDown
                      size={12}
                      stroke={1.5}
                      aria-label="Toggle menu dropdown"
                    />
                  </UnstyledButton>
                </MenuTarget>
                <MenuDropdown>
                  {links.map(({ url, label }) => (
                    <Link key={url} href={url} className={classes.subLink}>
                      <MenuItem>{label}</MenuItem>
                    </Link>
                  ))}
                </MenuDropdown>
              </Menu>
            );
          })}
        </Group>
      </nav>
    </Box>
  );
}
