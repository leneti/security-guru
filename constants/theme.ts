"use client";

import {
  createTheme,
  type CSSVariablesResolver,
  darken,
  defaultVariantColorsResolver,
  Divider,
  parseThemeColor,
  rgba,
  Text,
  Title,
  type VariantColorsResolver,
} from "@mantine/core";
import textClasses from "@site/constants/variants/text.module.css";
import titleClasses from "@site/constants/variants/title.module.css";

export const resolver: CSSVariablesResolver = () => ({
  variables: {
    "--mantine-primary-color": "#FFAB66",
    "--mantine-primary-color-light": "rgba(255, 171, 102, 0.6)",
    "--mantine-primary-color-0": "#FFF3EA",
    "--mantine-primary-color-1": "#FFDFC6",
    "--mantine-primary-color-2": "#FFCDA4",
    "--mantine-primary-color-3": "#FFBC85",
    "--mantine-primary-color-4": "#FFAB66",
    "--mantine-primary-color-5": "#FF9B49",
    "--mantine-primary-color-6": "#FF8D2F",
    "--mantine-primary-color-7": "#FF8017",
    "--mantine-primary-color-8": "#FF7301",
    "--mantine-primary-color-9": "#EB6A00",
    "--mantine-spacing-xs": "0.625rem",
    "--mantine-spacing-sm": "0.75rem",
    "--mantine-spacing-md": "1rem",
    "--mantine-spacing-lg": "1.25rem",
    "--mantine-spacing-xl": "1.5rem",
    "--mantine-spacing-xxl": "2rem",
    "--bg-image-height": "43.75rem",
    "--hero-left-pading": "60px",
    "--service-card-image-height": "200px",
    "--header-height": "5rem",
    "--mantine-color-background": "var(--mantine-color-dark-7)", // "#021614",
  },
  light: {
    "--mantine-primary-color": "#05221F",
    "--mantine-primary-color-0": "#C3C9C9",
    "--mantine-primary-color-1": "#718986",
    "--mantine-primary-color-2": "#425B58",
    "--mantine-primary-color-3": "#243E3C",
    "--mantine-primary-color-4": "#112D2A",
    "--mantine-primary-color-5": "#05221F",
    "--mantine-primary-color-6": "#040C0B",
    "--mantine-primary-color-7": "#020404",
    "--mantine-primary-color-8": "#010202",
    "--mantine-primary-color-9": "#000101",
  },
  dark: {
    "--mantine-primary-color": "#FFAB66",
    "--mantine-primary-color-light": "rgba(255, 171, 102, 0.75)",
    "--mantine-primary-color-0": "#FFF3EA",
    "--mantine-primary-color-1": "#FFDFC6",
    "--mantine-primary-color-2": "#FFCDA4",
    "--mantine-primary-color-3": "#FFBC85",
    "--mantine-primary-color-4": "#FFAB66",
    "--mantine-primary-color-5": "#FF9B49",
    "--mantine-primary-color-6": "#FF8D2F",
    "--mantine-primary-color-7": "#FF8017",
    "--mantine-primary-color-8": "#FF7301",
    "--mantine-primary-color-9": "#EB6A00",
  },
});

export const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  // Override some properties for variant
  if (
    parsedColor.isThemeColor &&
    parsedColor.color === "primary" &&
    input.variant === "filled"
  ) {
    return {
      ...defaultResolvedColors,
      color: "var(--mantine-color-black)",
      hoverColor: "var(--mantine-color-black)",
    };
  }

  // Completely override variant
  if (input.variant === "light") {
    return {
      background: rgba(parsedColor.value, 0.1),
      hover: rgba(parsedColor.value, 0.15),
      border: `1px solid ${parsedColor.value}`,
      color: darken(parsedColor.value, 0.1),
    };
  }

  // Add new variants support
  if (input.variant === "danger") {
    return {
      background: "var(--mantine-color-red-9)",
      hover: "var(--mantine-color-red-8)",
      color: "var(--mantine-color-white)",
      border: "none",
    };
  }

  return defaultResolvedColors;
};

export const theme = createTheme({
  colors: {
    primary: [
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
    "primary-orange": [
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
    "primary-green": [
      "#C3C9C9",
      "#718986",
      "#425B58",
      "#243E3C",
      "#112D2A",
      "#05221F",
      "#040C0B",
      "#020404",
      "#010202",
      "#000101",
    ],
    "primary-light-green": [
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
  primaryColor: "primary",

  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em",
  },

  components: {
    Text: Text.extend({ classNames: textClasses }),
    Title: Title.extend({ classNames: titleClasses }),
    Divider: Divider.extend({ defaultProps: { color: "dark.4" } }),
  },

  cursorType: "pointer",

  headings: {
    sizes: {
      h1: { fontSize: "1.5rem", lineHeight: "1.2" },
      h2: { fontSize: "1.25rem", lineHeight: "1.2" },
      h3: { fontSize: "1.125rem", lineHeight: "1.2" },
      h4: { fontSize: "1rem", lineHeight: "1.2" },
      h5: { fontSize: "0.875rem", lineHeight: "1.2" },
      h6: { fontSize: "0.75rem", lineHeight: "1.2" },
    },
  },

  variantColorResolver,
});
