import { Group, Box, Collapse, ThemeIcon, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "@link";
import type { LinksGroupProps } from "./types";
import classes from "./NavbarLinksGroup.module.css";

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
          <Group justify="space-between">
            <Box style={{ display: "flex", alignItems: "center" }}>
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

  const { url } = props;

  return (
    <UnstyledButton
      component={Link}
      href={url}
      className={classes.control}
      onClick={closeDrawer}
    >
      <Group justify="space-between">
        <Box style={{ display: "flex", alignItems: "center" }}>
          <ThemeIcon variant="light" size={40}>
            <Icon size={20} />
          </ThemeIcon>
          <Box className={classes.link}>{label}</Box>
        </Box>
      </Group>
    </UnstyledButton>
  );
}
