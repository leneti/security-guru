import {
  Container,
  Text,
  Center,
  Group,
  createStyles,
  Stack,
} from "@mantine/core";
import { Player } from "@lottiefiles/react-lottie-player";
import { PageTitle } from "@components";
import { useGlobalStyles } from "@constants";

const useStyles = createStyles((theme) => ({
  text: {
    color: theme.colorScheme === "dark" ? "black" : "white",
    width: "30vw",
    marginRight: 32,

    [theme.fn.smallerThan("md")]: {
      width: "50vw",
      marginRight: 0,
      marginBottom: 32,
    },

    [theme.fn.smallerThan("sm")]: {
      width: "75vw",
    },
  },
  animation: {
    height: "37.5vh",
    width: "30vw",
    marginTop: "-2rem",

    [theme.fn.smallerThan("sm")]: {
      width: "clamp(200px, 50vw, 250px)",
    },
  },
}));

const Layout = ({ ...others }) => {
  const { classes: gClasses } = useGlobalStyles();

  return (
    <>
      <Group className={gClasses.bigDisplay} {...others} />
      <Stack
        className={gClasses.smallDisplay}
        sx={{ flexDirection: "column-reverse" }}
        {...others}
      />
    </>
  );
};

export default function About() {
  const { classes } = useStyles();

  return (
    <>
      <PageTitle>Apie mus</PageTitle>

      <Container fluid p={0}>
        <Center
          sx={(theme) => ({
            minHeight: 700,
            backgroundColor: theme.fn.primaryColor(),
          })}
        >
          <Layout>
            <Text className={classes.text} align="left" size="lg">
              <b>SECURITY GURU</b> - tai įmonė, kuri užsiima priešgaisrinės
              signalizacijos, įeigos kontrolės, apsaugos signalizacijos,
              integruotų apsaugos sprendimų, vaizdo stebėjimo sistemų įdiegimu
              bei remontu. Parenkame saugos sprendimus atsižvelgiant į kliento
              poreikius, biudžetą ir pageidaujamą saugumo lygmenį.
              <br /> <br /> Turime kvalifikaciją bei patirtį fizinės apsaugos
              bei elektroninės apsaugos srityse, todėl galime garantuoti
              aukščiausio lygio aptarnavimą ir paslaugas. Mūsų įmonei
              svarbiausia <b>kokybė</b>, <b>profesionalumas</b> ir{" "}
              <b>inovatyvumas</b>.
            </Text>
            <Player
              autoplay
              loop
              src="lottie_animations/cctv.json"
              className={classes.animation}
            />
          </Layout>
        </Center>
      </Container>
    </>
  );
}
