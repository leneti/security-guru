import {
  createStyles,
  Overlay,
  Container,
  Title,
  Button,
  Text,
} from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage: "url(/unsplash-houses.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  container: {
    height: 700,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: theme.spacing.xl * 6,
    zIndex: 1,
    position: "relative",

    [theme.fn.smallerThan("sm")]: {
      height: 500,
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
    marginTop: theme.spacing.xl * 1.5,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

export default function HeroContentLeft() {
  const { classes } = useStyles();

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .5) 40%)"
        opacity={1}
        zIndex={0}
        blur={1}
      />
      <Container className={classes.container}>
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
