import {
  createStyles,
  Header,
  Menu,
  Group,
  Center,
  Burger,
  ActionIcon,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronDown, IconSun, IconMoon } from "@tabler/icons";
import Link from "next/link";
import { HeaderSearchProps } from "@models/header";
import Logo from "@components/Logo";

const headerHeight = 110;

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: headerHeight,
    maxWidth: theme.breakpoints.xl,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    marginLeft: "auto",
    marginRight: "auto",
  },

  links: {
    cursor: "pointer",

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("md")]: {
      display: "none",
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
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },

  groupedThemeSwitch: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  nonGroupedThemeSwitch: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
}));

export default function HeaderMenu({ links }: HeaderSearchProps) {
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <Link href={link.link || "#"} className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} href={link.link || "#"} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  const ThemeSwitch = ({ className }: { className: string }) => (
    <ActionIcon
      variant="outline"
      color="brand"
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      className={className}
      size={smallScreen ? "lg" : "md"}
    >
      {dark ? (
        <IconSun size={smallScreen ? 28 : 18} />
      ) : (
        <IconMoon size={smallScreen ? 28 : 18} />
      )}
    </ActionIcon>
  );

  return (
    <Header height={headerHeight}>
      <nav className={classes.inner}>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="md"
        />
        <Logo />
        <Group spacing={5} className={classes.links} noWrap>
          {items}
          <ThemeSwitch className={classes.groupedThemeSwitch} />
        </Group>
        <ThemeSwitch className={classes.nonGroupedThemeSwitch} />
      </nav>
    </Header>
  );
}
