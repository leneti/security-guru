import { ThemeIcon, Title, Text } from "@mantine/core";
import { FeatureProps } from "@site/components/Feature";
import classes from "./Feature.module.css";

export default function Feature({
  icon: Icon,
  title,
  description,
}: FeatureProps) {
  return (
    <div>
      <ThemeIcon variant="filled" color="dark.6" size={40} radius={40}>
        <Icon size="1.25rem" stroke={1.5} className={classes.icon} />
      </ThemeIcon>

      <Title order={2} my="sm" variant="lightBg">
        {title}
      </Title>

      <Text size="sm" c="dimmed" lh={1.6} variant="lightBg">
        {description}
      </Text>
    </div>
  );
}
