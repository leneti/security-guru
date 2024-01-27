import { Drawer, Burger, px } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Logo } from "@site/components/Logo";
import { menuLinks } from "@site/constants/menu-links";
import NavbarLinksGroup from "@site/components/Header/BurgerMenu/NavbarLinksGroup";
import { BurgerMenuProps } from "./types";

const drawerLabel = "Naršymo meniu";
const openDrawerLabel = "Atidaryti meniu";
const closeDrawerLabel = "Uždaryti meniu";

export default function BurgerMenu(props: BurgerMenuProps) {
  const { burgerClass } = props;
  const [opened, { close, toggle }] = useDisclosure(false);

  const linksGroup = menuLinks.map((item) => (
    <NavbarLinksGroup {...item} key={item.label} closeDrawer={close} />
  ));

  return (
    <>
      <Drawer.Root opened={opened} onClose={close} hiddenFrom="md">
        <Drawer.Overlay />
        <Drawer.Content aria-label={drawerLabel}>
          <Drawer.Header>
            <Logo size={40} onClick={close} />
            <Drawer.CloseButton
              aria-label={closeDrawerLabel}
              size={px("1.75rem")}
            />
          </Drawer.Header>
          <Drawer.Body mt="xs">{linksGroup}</Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      <Burger
        opened={opened}
        onClick={toggle}
        title={opened ? closeDrawerLabel : openDrawerLabel}
        hiddenFrom="md"
        className={burgerClass}
      />
    </>
  );
}
