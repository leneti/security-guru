import { createContext } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { getTheme, usePreviousRoute } from "@constants";
import { Header, Footer } from "@components";

export const PrevUrlContext = createContext("");

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const prevUrl = usePreviousRoute();

  return (
    <MantineProvider theme={getTheme()} withGlobalStyles withNormalizeCSS>
      <Head>
        <meta name="description" content="Apsaugos sprendimai" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="logo/Ikona_Oranzine.webp" />
        <title>Security Guru</title>
      </Head>

      <Notifications position="top-right" />

      <Header />

      <PrevUrlContext.Provider value={prevUrl}>
        <Component {...pageProps} />
      </PrevUrlContext.Provider>

      <Footer />
    </MantineProvider>
  );
}
