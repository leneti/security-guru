import {
  createStyles,
  Menu,
  Group,
  clsx,
  UnstyledButton,
  Box,
} from "@mantine/core";
import { useMediaQuery, useWindowScroll } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons";
import Link from "next/link";
import { Logo } from "@site/components/Logo";
import { BurgerMenu } from "@site/components/Header/BurgerMenu";
import { menuLinks } from "@site/constants/menu-links";
import { headerHeight } from "@site/constants/measurements";
import { getBGColor } from "@site/utils/getBGColor";
import { useGlobalStyles } from "@site/utils/useGlobalStyles";

const useStyles = createStyles(
  (theme, { isScrolled }: { isScrolled: boolean }) => ({
    outer: {
      width: "100%",
      backgroundColor: getBGColor(theme),
      position: "sticky",
      top: 0,
      zIndex: 2,
      boxShadow: isScrolled ? theme.shadows.md : "none",
      height: headerHeight,
    },

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
    },

    linkGroup: {
      display: "flex",
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
  })
);

export default function Header() {
  const [{ y }] = useWindowScroll();
  const { classes, theme } = useStyles({ isScrolled: y > 0 });
  const { classes: gClasses } = useGlobalStyles();
  const extraSmallScreen = useMediaQuery(
    theme.fn.smallerThan("xs").substring(7)
  );

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
    <Box className={classes.outer}>
      <nav className={classes.inner}>
        <Logo size={extraSmallScreen ? 40 : 50} />
        <BurgerMenu />
        <Group
          spacing={5}
          className={clsx(gClasses.bigDisplay, classes.linkGroup)}
          noWrap
        >
          {items}
        </Group>
      </nav>
    </Box>
  );
}
