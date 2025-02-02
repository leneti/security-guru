import { Box, Collapse, Group, ThemeIcon, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "@link";
import classes from "./NavbarLinksGroup.module.css";
import type { LinksGroupProps } from "./types";

export default function NavbarLinksGroup(props: LinksGroupProps) {
  const { icon: Icon, label, initiallyOpened, closeDrawer } = props;

  const [opened, { toggle }] = useDisclosure(initiallyOpened || false);

  if ("links" in props) {
    const { links } = props;
    const items = links.map((link) => (
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
          <Group justify="space-between" className={classes.controlGroup}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon
                style={{ "--ti-bg": "var(--mantine-primary-color-light)" }}
                size={40}
              >
                <Icon size={20} />
              </ThemeIcon>

              <Box className={classes.linkLabel}>{label}</Box>
            </Box>

            <IconChevronDown
              className={classes.chevron}
              size={22}
              stroke={1.5}
              style={{
                transform: opened ? `rotate(180deg)` : "none",
              }}
            />
          </Group>
        </UnstyledButton>

        <Collapse in={opened}>{items}</Collapse>
      </>
    );
  }

  const { url } = props;

  return (
    <UnstyledButton
      component={Link}
      href={url}
      className={classes.control}
      onClick={closeDrawer}
    >
      <Group className={classes.controlGroup}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <ThemeIcon
            size={40}
            style={{ "--ti-bg": "var(--mantine-primary-color-light)" }}
          >
            <Icon size={20} />
          </ThemeIcon>

          <Box className={classes.linkLabel}>{label}</Box>
        </Box>
      </Group>
    </UnstyledButton>
  );
}
