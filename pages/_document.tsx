import Document, { Head, Html, Main, NextScript } from "next/document";
import { createGetInitialProps } from "@mantine/next";
import { ColorSchemeScript } from "@mantine/core";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="lt">
        <Head>
          <ColorSchemeScript forceColorScheme="dark" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
