import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { theme, resolver } from "@site/constants/theme";
import { Notifications } from "@mantine/notifications";
import { Header } from "@site/components/Header";
import { Footer } from "@site/components/Footer";
import { RouterTransition } from "@site/components/RouterTransition";

export const metadata: Metadata = {
  title: {
    template: "%s | Security Guru",
    default: "Security Guru",
  },
  description:
    "Aukščiausio lygio paslaugos fizinės bei elektroninės namų ir verslo apsaugos srityse.",
  keywords:
    "Namų apsauga,saugumas,apsauga,apsaugos sprendimai,verslo saugos sprendimai,signalizacija,signalizacijos sistemos,spynos,kameros",
  icons: {
    icon: "/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lt">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider
          theme={theme}
          cssVariablesResolver={resolver}
          forceColorScheme="dark"
        >
          <Notifications />

          <RouterTransition />

          <Header />

          {children}

          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
