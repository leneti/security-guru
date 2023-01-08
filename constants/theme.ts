import {
  MantineTheme,
  MantineThemeOverride,
  ColorScheme,
  ButtonStylesParams,
} from "@mantine/core";

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
      defaultProps: {
        styles: (theme: MantineTheme, params: ButtonStylesParams) => ({
          root: {
            color: params.variant === "gradient" ? "#fff" : theme.colorScheme === "dark" ? "#000" : "#fff",
          },
        }),
      },
    },
  },
  
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },

  radius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 32,
  },

  spacing: {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },

  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400,
  },

});
