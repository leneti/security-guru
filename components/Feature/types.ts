import type { TablerIconsProps } from "@tabler/icons-react";

export interface FeatureProps {
  icon: (props: TablerIconsProps) => React.JSX.Element;
  title: React.ReactNode;
  description: React.ReactNode;
}
