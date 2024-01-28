import { SimpleGrid } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import { Player } from "@lottiefiles/react-lottie-player";
import { PageBackground } from "@site/components/PageBackground";
import { Feature } from "@site/components/Feature";
import { ABOUT_US_FEATURES } from "@site/constants";
import classes from "./apie-mus.module.css";

const pageTitle = "Apie mus";

export default function About() {
  const noMotion = useReducedMotion();

  const features = ABOUT_US_FEATURES.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  return (
    <PageBackground pageTitle={pageTitle} colorOnly fullWidth>
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: "xl", md: 50 }}
        className={classes.grid}
      >
        {features}
      </SimpleGrid>

      <Player
        autoplay={!noMotion}
        src="lottie_animations/cctv.json"
        className={classes.animation}
      />
    </PageBackground>
  );
}
