import { MantineThemeOverride, ColorScheme } from "@mantine/core";

export const getTheme = (colorScheme: ColorScheme): MantineThemeOverride => ({
  colorScheme,

  colors: {
    brand:
      colorScheme === "dark"
        ? [
            "#FFF3EA",
            "#FFDFC6",
            "#FFCDA4",
            "#FFBC85",
            "#FFAB66",
            "#FF9B49",
            "#FF8D2F",
            "#FF8017",
            "#FF7301",
            "#EB6A00",
          ]
        : [
            "#B2E1DC",
            "#40BCAF",
            "#247A71",
            "#134F49",
            "#0A332F",
            "#05221F",
            "#021614",
            "#010808",
            "#010303",
            "#000101",
          ],
    "brand-orange": [
      "#FFF3EA",
      "#FFDFC6",
      "#FFCDA4",
      "#FFBC85",
      "#FFAB66",
      "#FF9B49",
      "#FF8D2F",
      "#FF8017",
      "#FF7301",
      "#EB6A00",
    ],
    "brand-green": [
      "#B2E1DC",
      "#40BCAF",
      "#247A71",
      "#134F49",
      "#0A332F",
      "#05221F",
      "#021614",
      "#010808",
      "#010303",
      "#000101",
    ],
    "brand-light-green": [
      "#FEFEFE",
      "#E9EBE3",
      "#D5D9CB",
      "#C3C9B5",
      "#B1B99F",
      "#A1AA8B",
      "#929D79",
      "#85916A",
      "#78825F",
      "#6C7556",
    ],
  },

  primaryShade: { light: 5, dark: 4 },
  primaryColor: "brand",

  components: {
    Button: {
      styles: (theme) => ({
        root: {
          color: theme.colorScheme === "dark" ? "#000" : "#fff",
        },
      }),
    },
  },

  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
  },

  radius: {
    xs: "0.125rem",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    xl: "2rem",
  },

  spacing: {
    xs: "0.625rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
  },

  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em",
  },

  globalStyles: (theme) => ({
    "*, *::before, *::after": {
      boxSizing: "border-box",
    },

    body: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  }),
});
