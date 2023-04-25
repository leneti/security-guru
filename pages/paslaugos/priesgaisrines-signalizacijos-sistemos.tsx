import { createStyles, Container, Text } from "@mantine/core";
import { PageTitle, SlideDownTitle } from "@components";
import { bgImgHeight } from "@constants";
import html from "./_page_content/pss.json";

const pageTitle = "Priešgaisrinės signalizacijos sistemos";

const useStyles = createStyles((theme) => ({
  container: {
    minHeight: bgImgHeight,
    backgroundColor: theme.fn.primaryColor(),
    padding: `calc(${theme.spacing.xl} * 2) calc(${theme.spacing.xl} * 4)`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    [theme.fn.smallerThan("md")]: {
      padding: `calc(${theme.spacing.xl} * 2) calc(${theme.spacing.xl} * 3)`,
    },

    [theme.fn.smallerThan("sm")]: {
      padding: `calc(${theme.spacing.xl} * 2) ${theme.spacing.xl}`,
    },
  },

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
    <>
      <PageTitle>{pageTitle}</PageTitle>

      <SlideDownTitle title={pageTitle} wip />

      <Container fluid className={classes.container}>
        <Text
          variant="lightBg"
          className={classes.content}
          dangerouslySetInnerHTML={html}
        />
      </Container>
    </>
  );
}
