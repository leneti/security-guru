import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  TablerIcon,
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
} from "@tabler/icons";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.md,
    borderRadius: theme.radius.md,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    textDecoration: "none",
    marginLeft: theme.spacing.md,
    fontWeight: 500,
    fontSize: theme.fontSizes.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
  },

  subLink: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: 36,
    marginLeft: 35,
    fontSize: theme.fontSizes.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    borderBottomRightRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[0],
    },
  },

  chevron: {
    transition: "transform 300ms ease",
  },
}));

interface LinksGroupProps {
  icon: TablerIcon;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  link?: string;
  closeDrawer: () => void;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link,
  closeDrawer,
}: LinksGroupProps) {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, { toggle }] = useDisclosure(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Link
      key={link.label}
      className={classes.subLink}
      href={link.link}
      onClick={() => closeDrawer()}
    >
      {link.label}
    </Link>
  ));

  if (!link) {
    return (
      <>
        <UnstyledButton onClick={() => toggle()} className={classes.control}>
          <Group position="apart">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon variant="light" size={40}>
                <Icon size={20} />
              </ThemeIcon>
              <Box className={classes.link}>{label}</Box>
            </Box>
            <IconChevronDown
              className={classes.chevron}
              size={22}
              stroke={1.5}
              style={{
                transform: opened ? `rotate(-180deg)` : "none",
              }}
            />
          </Group>
        </UnstyledButton>
        <Collapse in={opened}>{items}</Collapse>
      </>
    );
  }

  return (
    <UnstyledButton
      component={Link}
      href={link}
      className={classes.control}
      onClick={() => closeDrawer()}
    >
      <Group position="apart">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ThemeIcon variant="light" size={40}>
            <Icon size={20} />
          </ThemeIcon>
          <Box className={classes.link}>{label}</Box>
        </Box>
      </Group>
    </UnstyledButton>
  );
}
