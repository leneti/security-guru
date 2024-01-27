import {
  Container,
  Title,
  Divider,
  UnstyledButton,
  Center,
  Button,
  px,
} from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { Hero } from "@site/components/Hero";
import { PageTitle } from "@site/components/PageTitle";
import { Services } from "@site/components/Services";
import classes from "./index.module.css";

export default function Home() {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLHeadingElement>({
    offset: 100,
  });
  const scrollToServices = () => scrollIntoView({ alignment: "start" });

  return (
    <>
      <PageTitle />

      <Hero />

      <UnstyledButton
        title="Eiti žemyn"
        className={classes.scrollDownArrow}
        onClick={scrollToServices}
      />

      <Container fluid className={classes.services}>
        <Title ref={targetRef} order={2} size="h1" className={classes.title}>
          Paslaugos
        </Title>
        <Divider w="100%" my="xl" />
        <Services />
      </Container>

      <Center className={classes.contactBtnBox}>
        <Button
          component={Link}
          href="/susisiekite"
          rightSection={<IconChevronRight size={20} />}
          size="lg"
          variant="subtle"
        >
          Susisiekite
        </Button>
      </Center>
    </>
  );
}
