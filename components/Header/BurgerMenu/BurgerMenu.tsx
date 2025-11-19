"use client";

import { Burger, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavbarLinksGroup from "@site/components/Header/BurgerMenu/NavbarLinksGroup";
import { Logo } from "@site/components/Logo";
import { menuLinks } from "@site/constants/menu-links";
import classes from "./BurgerMenu.module.css";
import type { BurgerMenuProps } from "./types";

const drawerLabel = "Naršymo meniu";
const openDrawerLabel = "Atidaryti meniu";
const closeDrawerLabel = "Uždaryti meniu";

export default function BurgerMenu(props: BurgerMenuProps) {
  const { burgerClass } = props;
  const [opened, { close, toggle }] = useDisclosure(false);

  const linksGroup = menuLinks.map((item) => (
    <NavbarLinksGroup key={item.label} {...item} closeDrawer={close} />
  ));

  return (
    <>
      <Drawer.Root opened={opened} onClose={close} hiddenFrom="md">
        <Drawer.Overlay />
        <Drawer.Content
          aria-label={drawerLabel}
          className={classes.drawerContent}
        >
          <Drawer.Header>
            <Logo size={40} onClick={close} />
            <Drawer.CloseButton
              aria-label={closeDrawerLabel}
              size="xl"
              className={classes.closeButton}
            />
          </Drawer.Header>
          <Drawer.Body mt="xs" px={0}>
            {linksGroup}
          </Drawer.Body>
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
