import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/notifications/styles.css";
import "@site/app/global.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next/types";
import { theme, resolver } from "@site/constants/theme";
import { Notifications } from "@mantine/notifications";
import { Header } from "@site/components/Header";
import { Footer } from "@site/components/Footer";
import { RouterTransition } from "./navigation";

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
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>

      <body>
        <MantineProvider
          theme={theme}
          cssVariablesResolver={resolver}
          forceColorScheme="dark"
        >
          <RouterTransition />

          <Notifications />

          <Header />

          {children}

          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
