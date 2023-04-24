import {
  createStyles,
  Menu,
  Group,
  ActionIcon,
  useMantineColorScheme,
  clsx,
  UnstyledButton,
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
    marginLeft: "auto",
    marginRight: "auto",

    [`@media (max-width: calc(${theme.spacing.xl} * 2 + ${theme.breakpoints.xl}))`]:
      {
        paddingLeft: `calc(${theme.spacing.xl} - ((100vw - ${theme.breakpoints.xl}) / 2))`,
        paddingRight: `calc(${theme.spacing.xl} - ((100vw - ${theme.breakpoints.xl}) / 2))`,
      },

    [theme.fn.smallerThan("xl")]: {
      paddingLeft: theme.spacing.xl,
      paddingRight: theme.spacing.xl,
    },

    [theme.fn.smallerThan("md")]: {
      height: headerHeight + 10,
    },
  },

  link: {
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
          ? theme.colors.dark[4]
          : theme.colors.gray[2],
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

  switch: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[2],
    color: theme.fn.primaryColor(),
    border: "none",
    borderRadius: 8,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3],
    },
  },

  centerHeader: {
    [theme.fn.smallerThan("md")]: {
      justifyContent: "center",
    },
  },
}));

const SHOW_THEME_SWITCH = process.env.REACT_APP_SHOW_THEME_SWITCH === "true";

export default function HeaderMenu() {
  const { classes } = useStyles();
  const { classes: gClasses } = useGlobalStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

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

  const ThemeSwitch = ({ className }: { className: string }) => (
    <ActionIcon
      variant="outline"
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      className={clsx(className, classes.switch)}
      size="lg"
    >
      {dark ? (
        <IconSun size={22} aria-label="Toggle color scheme (current: dark)" />
      ) : (
        <IconMoon size={22} aria-label="Toggle color scheme (current: light)" />
      )}
    </ActionIcon>
  );

  return (
    <nav
      className={clsx(
        classes.inner,
        !SHOW_THEME_SWITCH && classes.centerHeader
      )}
    >
      <BurgerMenu />
      <Logo />
      <Group spacing={5} className={gClasses.bigDisplay} noWrap>
        {items}
        {SHOW_THEME_SWITCH && <ThemeSwitch className={gClasses.bigDisplay} />}
      </Group>
      {SHOW_THEME_SWITCH && <ThemeSwitch className={gClasses.smallDisplay} />}
    </nav>
  );
}
