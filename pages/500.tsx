import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
  rem,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(120),
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colors[theme.primaryColor][1],

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),
    color: theme.white,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(540),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.white,
  },

  refreshBtn: {
    boxShadow: theme.shadows.md,

    ["&:hover"]: {
      boxShadow: theme.shadows.xs,
    },
  },
}));

export default function ServerError() {
  const { classes } = useStyles();
  const refreshPage = () => window.location.reload();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>500</div>
        <Title className={classes.title}>Kažkas ne taip...</Title>
        <Text size="lg" align="center" className={classes.description}>
          Mūsų serveriai negalėjo apdoroti jūsų užklausos. Security Guru komanda
          jau buvo informuota. Pabandykite atnaujinti puslapį.
        </Text>
        <Group position="center">
          <Button
            variant="white"
            className={classes.refreshBtn}
            size="md"
            onClick={refreshPage}
          >
            Atnaujinti puslapį
          </Button>
        </Group>
      </Container>
    </div>
  );
}
