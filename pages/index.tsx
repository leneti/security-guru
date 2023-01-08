import { Container, Box, Text } from "@mantine/core";
import Hero from "@site/components/Hero";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Security Guru</title>
        <meta name="description" content="Apsaugos sprendimai" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Ikona_Oranzine.png" />
      </Head>

      <Hero />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Container fluid>
          
        </Container>
      </Box>
    </>
  );
}
