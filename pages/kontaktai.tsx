import Head from "next/head";
import { Container, Box, BackgroundImage, Center } from "@mantine/core";
import GetInTouch from "@site/components/GetInTouch";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kontaktai | Security Guru</title>
        <meta name="description" content="Apsaugos sprendimai" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Ikona_Oranzine.png" />
      </Head>

      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors["brand-light-green"][3],
        })}
      >
        <Container fluid p={0}>
          <BackgroundImage src="/unsplash-houses.jpg">
            <Center py="xl" sx={{ minHeight: "75vh" }}>
              <GetInTouch />
            </Center>
          </BackgroundImage>
        </Container>
      </Box>
    </>
  );
}
