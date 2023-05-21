import { FeatureProps } from "../types";

export function Feature({ title }: Partial<FeatureProps>) {
  return <div data-testid={title}>Mock Feature</div>;
}
