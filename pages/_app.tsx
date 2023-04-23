import { useState, createContext } from "react";
// import { GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
// import { getCookie, setCookie } from "cookies-next";
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { getTheme, usePreviousRoute } from "@constants";
import { Header, Footer } from "@components";

export const PrevUrlContext = createContext("");

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme || "dark"
  );
  const prevUrl = usePreviousRoute();

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    // setCookie("mantine-color-scheme", nextColorScheme);
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={getTheme(colorScheme)}
        withGlobalStyles
        withNormalizeCSS
      >
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
    </ColorSchemeProvider>
  );
}

// App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
//   colorScheme: getCookie("mantine-color-scheme", ctx) || "dark",
// });
