import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import { getCookie, setCookie } from "cookies-next";
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";
import HeaderMenu from "@components/Header";
import FooterMenu from "@site/components/Footer";

import { Link } from "@site/models/header";
import { getTheme } from "@site/constants/theme";

const links: Link[] = [
  {
    label: "Apie mus",
    link: "/apie-mus",
  },
  {
    label: "Apsaugos sprendimai",
    link: "#",
  },
  {
    label: "Kontaktai",
    link: "/kontaktai",
  },
  {
    label: "Paslaugos",
    links: [
      {
        label: "Apsaugos signalizacijos sistemos",
        link: "#",
      },
      {
        label: "Įeigos kontrolės sistemos",
        link: "#",
      },
      {
        label: "Integruoti apsaugos sprendimai",
        link: "#",
      },
      {
        label: "Priešgaisrinės signalizacijos sistemos",
        link: "#",
      },
      {
        label: "Vaizdo stebėjimo sistemos",
        link: "#",
      },
    ],
  },
];

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
        <HeaderMenu links={links} />
        <Component {...pageProps} />
        <FooterMenu />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
