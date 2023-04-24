import { PageTitle, SlideDownTitle } from "@components";
import { createStyles, Container, Text } from "@mantine/core";
import html from "./_page_content/vss.json";

const pageTitle = "Vaizdo stebėjimo sistemos";

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

export default function CCTV() {
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
