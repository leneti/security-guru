import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TablerIcon, IconChevronDown } from "@tabler/icons";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colors.dark[0],
    fontSize: theme.fontSizes.md,
    borderRadius: theme.radius.md,

    "&:hover": {
      backgroundColor: theme.colors.dark[9],
      color: theme.white,
    },
  },

  link: {
    textDecoration: "none",
    marginLeft: theme.spacing.md,
    fontWeight: 500,
    fontSize: theme.fontSizes.md,
    color: theme.colors.dark[0],
  },

  subLink: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: 36,
    marginLeft: 35,
    fontSize: theme.fontSizes.md,
    color: theme.colors.dark[0],
    borderLeft: `1px solid ${theme.colors.dark[4]}`,
    borderBottomRightRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,

    "&:hover": {
      backgroundColor: theme.colors.dark[9],
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
  links?: { label: string; url: string }[];
  url?: string;
  closeDrawer: () => void;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  url,
  closeDrawer,
}: LinksGroupProps) {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(initiallyOpened || false);

  if (!url) {
    const items = (Array.isArray(links) ? links : []).map((link) => (
      <Link
        key={link.label}
        className={classes.subLink}
        href={link.url}
        onClick={closeDrawer}
      >
        {link.label}
      </Link>
    ));

    return (
      <>
        <UnstyledButton onClick={toggle} className={classes.control}>
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
      href={url}
      className={classes.control}
      onClick={closeDrawer}
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
