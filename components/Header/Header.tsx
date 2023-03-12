import {
  createStyles,
  Header,
  Menu,
  Group,
  Center,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { IconChevronDown, IconSun, IconMoon } from "@tabler/icons";
import Link from "next/link";
import { Logo } from "@components";
import { menuLinks, useGlobalStyles } from "@constants";
import BurgerMenu from "./BurgerMenu";

const headerHeight = 110;

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: headerHeight,
    maxWidth: theme.breakpoints.xl,
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
    marginLeft: "auto",
    marginRight: "auto",
  },

  link: {
    cursor: "pointer",
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    },
  },

  subLink: {
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
  },

  linkLabel: {
    marginRight: 5,
  },
}));

export default function HeaderMenu() {
  const { classes } = useStyles();
  const { classes: gClasses } = useGlobalStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const items = menuLinks.map((link) => {
    if ("links" in link) {
      const menuItems = link.links.map(({ link, label }) => (
        <Link key={link} href={link} className={classes.subLink}>
          <Menu.Item>{label}</Menu.Item>
        </Link>
      ));

      return (
        <Menu key={link.label} trigger="hover">
          <Menu.Target>
            <Center className={classes.link}>
              <span className={classes.linkLabel}>{link.label}</span>
              <IconChevronDown size={12} stroke={1.5} />
            </Center>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  const ThemeSwitch = ({ className }: { className: string }) => (
    <ActionIcon
      variant="outline"
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      className={className}
      size="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.fn.primaryColor(),
        border:
          theme.colorScheme === "dark"
            ? "none"
            : `1px solid ${theme.colors.gray[3]}`,
        borderRadius: 8,
      })}
    >
      {dark ? <IconSun size={22} /> : <IconMoon size={22} />}
    </ActionIcon>
  );

  return (
    <Header height={{ base: headerHeight + 10, md: headerHeight }}>
      <nav className={classes.inner}>
        <BurgerMenu />
        <Logo />
        <Group spacing={5} className={gClasses.bigDisplay} noWrap>
          {items}
          <ThemeSwitch className={gClasses.bigDisplay} />
        </Group>
        <ThemeSwitch className={gClasses.smallDisplay} />
      </nav>
    </Header>
  );
}
