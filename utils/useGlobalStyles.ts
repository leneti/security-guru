import { createStyles } from "@mantine/core";

export const useGlobalStyles = createStyles((theme) => ({
  bigDisplay: {
    display: "initial",

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  smallDisplay: {
    display: "none",

    [theme.fn.smallerThan("md")]: {
      display: "initial",
    },
  },
}));
