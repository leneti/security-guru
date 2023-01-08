import { Container, Box, BackgroundImage } from "@mantine/core";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Apie mus | Security Guru</title>
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
            <Box sx={{ height: "75vh" }}></Box>
          </BackgroundImage>
        </Container>
      </Box>
    </>
  );
}
