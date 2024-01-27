import { useEffect, useState } from "react";
import {
  Overlay,
  Container,
  Title,
  Button,
  Text,
  useMantineTheme,
} from "@mantine/core";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import houses from "@site/assets/unsplash-houses.webp";
import classes from "./Hero.module.css";

const overlayGradient =
  "linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .5) 40%)";

export default function Hero() {
  const theme = useMantineTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className={clsx(classes.hero, classes.dynamicHeight)}>
      <Image
        src={houses}
        alt="houses"
        fill
        className={classes.image}
        priority
      />
      <Overlay
        gradient={mounted ? overlayGradient : undefined}
        opacity={mounted ? 1 : 0}
        zIndex={0}
        blur={1}
      >
        <Container
          className={clsx(classes.content, classes.dynamicHeight)}
          size={theme.breakpoints.xl}
        >
          <Title className={classes.title}>
            Namų ir verslo apsaugos sprendimai
          </Title>
          <Text className={clsx(classes.description)} mt="xl" fw={600}>
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
