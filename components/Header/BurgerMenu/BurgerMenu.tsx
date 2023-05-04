import { Drawer, Burger, clsx, px } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Logo } from "@components/Logo";
import { menuLinks } from "@constants/menu-links";
import { useGlobalStyles } from "@utils/useGlobalStyles";
import NavbarLinksGroup from "./NavbarLinksGroup";
import { BurgerMenuProps } from "./types";

export default function BurgerMenu(props: BurgerMenuProps) {
  const { burgerClass } = props;
  const { classes: gClasses } = useGlobalStyles();
  const [opened, { close, toggle }] = useDisclosure(false);

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
            <Logo size={40} onClick={close} />
            <Drawer.CloseButton size={px("1.75rem")} />
          </Drawer.Header>
          <Drawer.Body mt="xs">{linksGroup}</Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      <Burger
        opened={opened}
        onClick={toggle}
        title="Atidaryti meniu"
        className={clsx(gClasses.smallDisplay, burgerClass)}
      />
    </>
  );
}
