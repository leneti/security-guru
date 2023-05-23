import { TablerIcon } from "@tabler/icons";

interface LinksGroupBasics {
  icon: TablerIcon;
  label: string;
  initiallyOpened?: boolean;
  closeDrawer: () => void;
}

interface LinksGroupSingle extends LinksGroupBasics {
  url: string;
}

interface LinksGroupDropdown extends LinksGroupBasics {
  links: { label: string; url: string }[];
}

export type LinksGroupProps = LinksGroupSingle | LinksGroupDropdown;

export interface BurgerMenuProps {
  burgerClass?: string;
}
