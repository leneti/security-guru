import "@mantine/core/styles.layer.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import { cookies } from "next/headers";
import type { Metadata } from "next/types";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { AnnouncementBar } from "@site/components/AnnouncementBar";
import { CookieDisclaimer } from "@site/components/CookieDisclaimer/CookieDisclaimer";
import { Footer } from "@site/components/Footer";
import { Header } from "@site/components/Header";
import { Cookies } from "@site/constants/cookies";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  async function setCookieConsented() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.set(Cookies.Consent, "1");
  }
  const cookieStore = await cookies();
  return (
    <html lang="lt" {...mantineHtmlProps}>
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

          <AnnouncementBar />

          <Header />

          {children}

          <CookieDisclaimer
            consentCookie={cookieStore.get(Cookies.Consent)?.value}
            setCookieConsented={setCookieConsented}
          />

          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
