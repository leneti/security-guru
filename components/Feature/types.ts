import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { Icon, IconProps } from "@tabler/icons-react";

export interface FeatureProps {
  icon: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>;
  title: React.ReactNode;
  description: React.ReactNode;
}
