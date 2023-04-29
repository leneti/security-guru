import { TablerIcon } from "@tabler/icons";

export interface LinksGroupProps {
  icon: TablerIcon;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; url: string }[];
  url?: string;
  closeDrawer: () => void;
}

export interface BurgerMenuProps {
  burgerClass?: string;
}
