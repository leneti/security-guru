import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { getCookie, setCookie } from "cookies-next";
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import HeaderMenu from "@components/Header";
import FooterMenu from "@site/components/Footer";
import { getTheme } from "@site/constants/theme";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
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
        <Notifications position="top-right" />
        <HeaderMenu />
        <Head>
          <meta name="description" content="Apsaugos sprendimai" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/Ikona_Oranzine.webp" />
          <title>Security Guru</title>
        </Head>
        <Component {...pageProps} />
        <FooterMenu />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "dark",
});
