import { MantineTheme } from "@mantine/core";

export const getBGColor = (theme: MantineTheme) =>
  theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0];
