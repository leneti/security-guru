import { Drawer, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Logo from "@components/Logo";
import useGlobalStyles from "@constants/global-styles";
import { menuLinks } from "@site/constants/menu-links";
import { LinksGroup } from "./NavbarLinksGroup";

export default function NavbarSimple() {
  const { classes: gClasses } = useGlobalStyles();
  const [opened, { close, toggle }] = useDisclosure(true);

  const linksGroup = menuLinks.map((item) => (
    <LinksGroup {...item} key={item.label} closeDrawer={close} />
  ));

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title={<Logo />}
        className={gClasses.smallDisplay}
      >
        {linksGroup}
      </Drawer>

      <Group position="center" className={gClasses.smallDisplay}>
        <Burger opened={opened} onClick={toggle} size="md" />
      </Group>
    </>
  );
}
