import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

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

const MUI_SYMBOLS = [
  "check",
  "verified_user",
  "close",
  "mail",
  "schedule",
  "location_on",
  "shield_lock",
  "shopping_cart",
  "menu",
  "keyboard_arrow_down",
  "sensors",
  "fingerprint",
  "local_fire_department",
  "videocam",
  "hub",
  "chevron_left",
  "chevron_right",
].sort();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lt">
      <head>
        <link
          href={`https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=${MUI_SYMBOLS.join(",")}&display=block`}
          type="text/css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${manrope.variable} ${geistMono.variable} antialiased bg-white text-midnight font-sans`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
