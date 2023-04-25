import { createStyles, Text } from "@mantine/core";
import { PageBackground } from "@components";
import html from "./_page_content/vss.json";

const pageTitle = "Vaizdo stebėjimo sistemos";

const useStyles = createStyles((theme) => ({
  content: {
    width: "75%",
    maxWidth: theme.breakpoints.xl,

    [theme.fn.smallerThan("md")]: {
      width: "85%",
    },

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

export default function CCTV() {
  const { classes } = useStyles();

  return (
    <PageBackground pageTitle={pageTitle} wip colorOnly>
      <Text
        variant="lightBg"
        className={classes.content}
        dangerouslySetInnerHTML={html}
      />
    </PageBackground>
  );
}
