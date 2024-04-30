import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import type { Metadata } from "next/types";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Footer } from "@site/components/Footer";
import { Header } from "@site/components/Header";
import { resolver, theme } from "@site/constants/theme";
import { NavigationProgressBar } from "@site/navigation/wrapper";
import "@site/app/global.css";

export const metadata: Metadata = {
  title: {
    template: `%s :: ${process.env.NODE_ENV === "development" ? "SG_DEV" : "Security Guru"}`,
    default: `${process.env.NODE_ENV === "development" ? "SG_DEV" : "Security Guru"}`,
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
          <NavigationProgressBar />

          <Notifications />

          <Header />

          {children}

          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
