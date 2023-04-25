import { createStyles, Menu, Group, clsx, UnstyledButton } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
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
    color: theme.colors.dark[0],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colors.dark[4],
    },
  },

  subLink: {
    textDecoration: "none",
    color: theme.colors.dark[0],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
  },

  linkLabel: {
    marginRight: 5,
  },

  switch: {
    backgroundColor: theme.colors.dark[5],
    color: theme.fn.primaryColor(),
    border: "none",
    borderRadius: 8,

    "&:hover": {
      backgroundColor: theme.colors.dark[4],
    },
  },

  centerHeader: {
    [theme.fn.smallerThan("md")]: {
      justifyContent: "center",
    },
  },
}));

export default function HeaderMenu() {
  const { classes } = useStyles();
  const { classes: gClasses } = useGlobalStyles();

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
    <nav className={clsx(classes.inner, classes.centerHeader)}>
      <BurgerMenu />
      <Logo />
      <Group spacing={5} className={gClasses.bigDisplay} noWrap>
        {items}
      </Group>
    </nav>
  );
}
