import { Drawer, Burger, clsx, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Logo } from "@components";
import { useGlobalStyles, menuLinks } from "@constants";
import { LinksGroup } from "./NavbarLinksGroup";

const useStyles = createStyles((theme) => ({
  burger: {
    position: "absolute",
    left: theme.spacing.md,
  },
}));

export default function NavbarSimple() {
  const { classes: gClasses } = useGlobalStyles();
  const [opened, { close, toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const linksGroup = menuLinks.map((item) => (
    <LinksGroup {...item} key={item.label} closeDrawer={close} />
  ));

  return (
    <>
      <Drawer.Root
        opened={opened}
        onClose={close}
        aria-label="Navigation drawer"
        className={gClasses.smallDisplay}
      >
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Logo drawer />
            <Drawer.CloseButton size="lg" />
          </Drawer.Header>
          <Drawer.Body mt="xs">{linksGroup}</Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      <Burger
        opened={opened}
        onClick={toggle}
        size="md"
        className={clsx(
          gClasses.smallDisplay,
          process.env.REACT_APP_SHOW_THEME_SWITCH === "false" && classes.burger
        )}
      />
    </>
  );
}
