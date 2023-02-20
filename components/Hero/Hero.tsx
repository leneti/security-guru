import {
  createStyles,
  Overlay,
  Container,
  Title,
  Button,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";

const leftPadding = "60px";

const useStyles = createStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage: "url(/unsplash-houses.webp)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  container: {
    position: "relative",
    height: 700,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    zIndex: 1,
    paddingBottom: `calc(${theme.spacing.xl} * 8)`,
    paddingRight: `clamp(
      ${theme.spacing.md},
      calc(100vw - ${theme.breakpoints.md}),
      calc(${theme.breakpoints.xl} - ${theme.breakpoints.md})
    )`,
    paddingLeft: theme.spacing.md,

    [theme.fn.smallerThan("xl")]: {
      paddingRight: `clamp(
        ${theme.spacing.md},
        calc(100vw - ${theme.breakpoints.md}),
        calc(${theme.breakpoints.xl} - ${theme.breakpoints.md} - ${leftPadding})
      )`,
      paddingLeft: `clamp(
        ${theme.spacing.md},
        calc(100vw - ${theme.breakpoints.md}),
        ${leftPadding}
      )`,
    },

    [theme.fn.smallerThan("md")]: {
      paddingRight: `clamp(
        ${theme.spacing.md},
        calc(100vw - ${theme.breakpoints.md}),
        calc(${theme.breakpoints.xl} - ${theme.breakpoints.md})
      )`,
      paddingLeft: theme.spacing.md,
    },

    [theme.fn.smallerThan("sm")]: {
      height: 500,
      paddingBottom: `calc(${theme.spacing.xl} * 6)`,
    },
  },

  title: {
    color: theme.white,
    fontSize: "clamp(34px, 6vw, 60px)",
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan("sm")]: {
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan("xs")]: {
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,
    fontSize: "clamp(14px, 2vw, 20px)",

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

export default function HeroContentLeft() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .5) 40%)"
        opacity={1}
        zIndex={0}
        blur={1}
      />
      <Container className={classes.container} size={theme.breakpoints.xl}>
        <Title className={classes.title}>
          Namų ir verslo apsaugos sprendimai
        </Title>
        <Text className={classes.description} mt="xl">
          Aukščiausio lygio paslaugos fizinės bei elektroninės apsaugos srityse
        </Text>

        <Button
          component={Link}
          href="/kontaktai"
          variant="gradient"
          gradient={{ from: "orange", to: "yellow" }}
          size="xl"
          radius="xl"
          className={classes.control}
        >
          Susisiekite su mumis
        </Button>
      </Container>
    </div>
  );
}
