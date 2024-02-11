// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./styles.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme, resolver } from "@site/constants/theme";
import { Header } from "@site/components/Header";
import { Footer } from "@site/components/Footer";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <MantineProvider
      theme={theme}
      cssVariablesResolver={resolver}
      forceColorScheme="dark"
    >
      <Head>
        <meta
          name="description"
          content="Aukščiausio lygio paslaugos fizinės bei elektroninės namų ir verslo apsaugos srityse."
        />
        <meta
          name="keywords"
          content="Namų apsauga,saugumas,apsauga,apsaugos sprendimai,verslo saugos sprendimai,signalizacija,signalizacijos sistemos,spynos,kameros"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.webp" />
        <title>Security Guru</title>
      </Head>

      <Notifications />

      <Header />

      <Component {...pageProps} />

      <Footer />
    </MantineProvider>
  );
}
