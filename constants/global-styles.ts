import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
  bigDisplay: {
    display: "flex",

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  smallDisplay: {
    display: "none",

    [theme.fn.smallerThan("md")]: {
      display: "flex",
    },
  },
}));
