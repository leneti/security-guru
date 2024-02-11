import {
  Menu,
  MenuTarget,
  MenuItem,
  MenuDropdown,
  Group,
  UnstyledButton,
  Box,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { Logo } from "@site/components/Logo";
import { BurgerMenu } from "@site/components/Header/BurgerMenu";
import { menuLinks } from "@site/constants/menu-links";
import classes from "./Header.module.css";

export default function Header() {
  return (
    <Box className={classes.outer}>
      <nav className={classes.inner}>
        <Logo size={40} classNames={classes.smallDisplayOnly} />
        <Logo size={50} classNames={classes.bigDisplayOnly} />

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
