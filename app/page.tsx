"use client";

import { Button, Center, Container, Divider, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { Hero } from "@site/components/Hero";
import { Services } from "@site/components/Services";
import Link from "@link";
import classes from "./home.module.css";

export default function Home() {
  return (
    <>
      <Hero />

      <Container fluid className={classes.services}>
        <Title order={2} size="h1" className={classes.title}>
          Paslaugos
        </Title>

        <Divider my="xl" />

        <Services />
      </Container>

      <Center className={classes.contactBtnBox}>
        <Button
          component={Link}
          href="/susisiekite"
          rightSection={<IconChevronRight size={20} />}
          size="lg"
          variant="subtle"
          className={classes.contactBtn}
        >
          Susisiekite
        </Button>
      </Center>
    </>
  );
}
