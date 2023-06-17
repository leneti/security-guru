import { TablerIconsProps } from "@tabler/icons-react";

interface LinksGroupBasics {
  icon: React.FC<TablerIconsProps>;
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
