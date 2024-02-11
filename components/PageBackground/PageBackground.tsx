import Image from "next/image";
import { Overlay, Center, Box, Container, Title, Text } from "@mantine/core";
import houses from "@site/assets/unsplash-houses.webp";
import type { PageBGProps } from "./types";
import classes from "./PageBackground.module.css";
import clsx from "clsx";

export default function PageBackground(props: PageBGProps) {
  const { pageTitle, colorOnly, wip, fullWidth, children } = props;

  return (
    <>
      <Title ta="center" className={classes.title}>
        {pageTitle}
      </Title>

      {wip && (
        <Text ta="center" mb="lg" c="dimmed">
          Puslapis ruošiamas
        </Text>
      )}

      {colorOnly ? (
        <Container
          fluid
          className={clsx(
            fullWidth ? classes.fullWidthColorOnly : classes.colorOnly,
            wip && classes.wip,
          )}
        >
          {children}
        </Container>
      ) : (
        <Box className={classes.container}>
          <Image
            src={houses}
            alt="Row of houses in a secure neighbourhood"
            fill
            className={classes.image}
            priority
          />
          <Overlay opacity={0.1} zIndex={0} blur={1} />
          <Center p="xl" className={classes.content}>
            {children}
          </Center>
        </Box>
      )}
    </>
  );
}
