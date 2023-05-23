import { ThemeIcon, Title, useMantineTheme, Text } from "@mantine/core";
import { FeatureProps } from "@site/components/Feature";
import { useBGColor } from "@site/utils/useBGColor";

export default function Feature({
  icon: Icon,
  title,
  description,
}: FeatureProps) {
  const theme = useMantineTheme();

  return (
    <div>
      <ThemeIcon variant="filled" color={useBGColor()} size={40} radius={40}>
        <Icon size="1.25rem" stroke={1.5} color={theme.fn.primaryColor()} />
      </ThemeIcon>
      <Title order={2} my="sm" variant="lightBg">
        {title}
      </Title>
      <Text size="sm" color="dimmed" sx={{ lineHeight: 1.6 }} variant="lightBg">
        {description}
      </Text>
    </div>
  );
}
