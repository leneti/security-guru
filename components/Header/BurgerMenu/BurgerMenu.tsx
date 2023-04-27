import { Drawer, Burger, clsx, createStyles, px } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Logo } from "@components";
import { menuLinks } from "@constants";
import { useGlobalStyles } from "@utils";
import NavbarLinksGroup from "./NavbarLinksGroup";

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
    <NavbarLinksGroup {...item} key={item.label} closeDrawer={close} />
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
            <Logo drawer onClick={close} />
            <Drawer.CloseButton size={px("1.75rem")} />
          </Drawer.Header>
          <Drawer.Body mt="xs">{linksGroup}</Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      <Burger
        opened={opened}
        onClick={toggle}
        size="md"
        className={clsx(gClasses.smallDisplay, classes.burger)}
      />
    </>
  );
}
