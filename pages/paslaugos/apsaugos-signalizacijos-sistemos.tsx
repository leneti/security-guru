import { Container, createStyles, Text } from "@mantine/core";
import { PageTitle, SlideDownTitle } from "@components";
import html from "./_page_content/ass.json";

const useStyles = createStyles((theme) => ({
  container: {
    minHeight: 700,
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

const pageTitle = "Apsaugos signalizacijos sistemos";

export default function AlarmSystems() {
  const { classes } = useStyles();

  return (
    <>
      <PageTitle>{pageTitle}</PageTitle>

      <SlideDownTitle title={pageTitle} />

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
