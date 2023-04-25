import { createStyles, Text } from "@mantine/core";
import { PageBackground } from "@components";
import html from "./_page_content/pss.json";

const pageTitle = "Priešgaisrinės signalizacijos sistemos";

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

export default function FireAlarms() {
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
