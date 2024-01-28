import { Menu, Group, UnstyledButton, Box } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { Logo } from "@site/components/Logo";
import { BurgerMenu } from "@site/components/Header/BurgerMenu";
import { menuLinks } from "@site/constants/menu-links";
import classes from "./Header.module.css";

export default function Header() {
  const [{ y }] = useWindowScroll();
  const isScrolled = y > 0;

  const items = menuLinks.map((link) => {
    if ("links" in link) {
      const menuItems = link.links.map(({ url, label }) => (
        <Link key={url} href={url} className={classes.subLink}>
          <Menu.Item>{label}</Menu.Item>
        </Link>
      ));

      return (
        <Menu key={link.label}>
          <Menu.Target>
            <UnstyledButton className={classes.link}>
              <span className={classes.linkLabel}>{link.label}</span>
              <IconChevronDown
                size={12}
                stroke={1.5}
                aria-label="Toggle menu dropdown"
              />
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} href={link.url} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  return (
    <Box
      style={{ boxShadow: isScrolled ? "var(--mantine-shadow-xl)" : "none" }}
      className={classes.outer}
    >
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
          {items}
        </Group>
      </nav>
    </Box>
  );
}
