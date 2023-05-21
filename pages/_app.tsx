import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "@site/constants/theme";
import { Header } from "@site/components/Header";
import { Footer } from "@site/components/Footer";
import { RouterTransition } from "@site/components/RouterTransition";
import PrevUrlProvider from "@site/contexts/prevUrl";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Head>
        <meta name="description" content="Apsaugos sprendimai" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.webp" />
        <title>Security Guru</title>
      </Head>

      <Notifications />

      <RouterTransition />

      <Header />

      <PrevUrlProvider>
        <Component {...pageProps} />
      </PrevUrlProvider>

      <Footer />
    </MantineProvider>
  );
}
