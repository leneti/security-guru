import "./globals.css";

import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getPayloadClient } from "@/lib/payload-client";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Security Guru",
  description:
    "Profesionalūs apsaugos sprendimai jūsų namams ir verslui. Kokybė, profesionalumas ir inovatyvumas.",
};

const DEFAULT_MUI_SYMBOLS = [
  "call",
  "check",
  "verified_user",
  "close",
  "mail",
  "schedule",
  "location_on",
  "shield_lock",
  "menu",
  "keyboard_arrow_down",
  "chevron_left",
  "chevron_right",
  "production_quantity_limits",
];

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient();
  const serviceIcons = await payload
    .find({ collection: "services", limit: 0 })
    .then(({ docs }) => docs.map(({ icon }) => icon));

  const muiSymbolsToLoad = [...new Set([...DEFAULT_MUI_SYMBOLS, ...serviceIcons])].sort();

  return (
    <html lang="lt">
      <head>
        <link
          href={`https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=${muiSymbolsToLoad.join(",")}&display=block`}
          type="text/css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${manrope.variable} ${geistMono.variable} bg-white font-sans text-midnight antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
