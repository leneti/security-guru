import { Container, Title, Divider, Center, Button } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { Hero } from "@site/components/Hero";
import { PageTitle } from "@site/components/PageTitle";
import { Services } from "@site/components/Services";
import classes from "./index.module.css";

export default function Home() {
  return (
    <>
      <PageTitle />

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
