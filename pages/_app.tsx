import { createContext } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "@constants/theme";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { RouterTransition } from "@components/RouterTransition";
import { usePreviousRoute } from "@utils/usePreviousRoute";

export const PrevUrlContext = createContext("");

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const prevUrl = usePreviousRoute();

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Head>
        <meta name="description" content="Apsaugos sprendimai" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.webp" />
        <title>Security Guru</title>
      </Head>

      <Notifications position="top-right" />

      <RouterTransition />

      <Header />

      <PrevUrlContext.Provider value={prevUrl}>
        <Component {...pageProps} />
      </PrevUrlContext.Provider>

      <Footer />
    </MantineProvider>
  );
}
