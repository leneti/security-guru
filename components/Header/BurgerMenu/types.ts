import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { Icon, IconProps } from "@tabler/icons-react";

interface LinksGroupBasics {
  icon: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>;
  label: string;
  initiallyOpened?: boolean;
  closeDrawer: () => void;
}

export interface LinksGroupSingle extends LinksGroupBasics {
  url: string;
}

export interface LinksGroupDropdown extends LinksGroupBasics {
  links: { label: string; url: string }[];
}

export type LinksGroupProps = LinksGroupSingle | LinksGroupDropdown;

export interface BurgerMenuProps {
  burgerClass?: string;
}
