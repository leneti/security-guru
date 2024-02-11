import type { Metadata } from "next";
import { SimpleGrid } from "@mantine/core";
import { PageBackground } from "@site/components/PageBackground";
import { Feature } from "@site/components/Feature";
import { ABOUT_US_FEATURES } from "@site/constants";
import LottieAnimation from "@site/app/apie-mus/animation";
import classes from "./apie-mus.module.css";

const pageTitle = "Apie mus";

export const metadata: Metadata = {
  title: pageTitle,
};

export default function About() {
  return (
    <PageBackground pageTitle={pageTitle} colorOnly fullWidth>
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: "xl", md: 50 }}
        className={classes.grid}
      >
        {ABOUT_US_FEATURES.map((feature, index) => (
          <Feature {...feature} key={feature.title} />
        ))}
      </SimpleGrid>

      <LottieAnimation />
    </PageBackground>
  );
}
