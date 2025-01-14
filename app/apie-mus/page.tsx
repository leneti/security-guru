import type { Metadata } from "next/types";
import { SimpleGrid } from "@mantine/core";
// import LottieAnimation from "@site/app/apie-mus/animation";
import { Feature } from "@site/components/Feature";
import { PageBackground } from "@site/components/PageBackground";
import { ABOUT_US_FEATURES } from "@site/constants";
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
        {ABOUT_US_FEATURES.map((feature) => (
          <Feature {...feature} key={feature.title} />
        ))}
      </SimpleGrid>

      {/* <LottieAnimation /> */}
    </PageBackground>
  );
}
