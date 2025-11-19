import { clsx } from "clsx";
import Image from "next/image";
import { Button, Container, Overlay, Text, Title } from "@mantine/core";
import houses from "@site/assets/unsplash-houses.webp";
import Link from "@link";
import classes from "./Hero.module.css";

const overlayGradient =
  "linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .5) 40%)";

export default function Hero() {
  return (
    <div className={clsx(classes.hero, classes.dynamicHeight)}>
      <Image
        src={houses}
        alt="houses"
        fill
        className={classes.image}
        priority
      />
      <Overlay gradient={overlayGradient} blur={1}>
        <Container className={clsx(classes.content, classes.dynamicHeight)}>
          <Title className={classes.title}>
            Namų ir verslo apsaugos sprendimai
          </Title>
          <Text className={classes.description} mt="xl" fw={600}>
            Aukščiausio lygio paslaugos fizinės bei elektroninės apsaugos
            srityse
          </Text>

          <Button
            component={Link}
            href="/susisiekite"
            size="xl"
            radius="xl"
            className={classes.CTA}
          >
            Susisiekite su mumis
          </Button>
        </Container>
      </Overlay>
    </div>
  );
}
