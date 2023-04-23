import { Container, createStyles } from "@mantine/core";
import { PageTitle, SlideDownTitle, Services } from "@components";

const bgHeight = 700;

const useStyles = createStyles((theme) => ({
  container: {
    minHeight: bgHeight,
    backgroundColor: theme.fn.primaryColor(),
    padding: `calc(${theme.spacing.xl} * 2) calc(${theme.spacing.xl} * 4)`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const pageTitle = "Test_Paslaugos";

export default function Test() {
  const { classes } = useStyles();

  return (
    <>
      <PageTitle>{pageTitle}</PageTitle>

      <SlideDownTitle title={pageTitle} />

      <Container fluid className={classes.container}>
        <Services />
      </Container>
    </>
  );
}
