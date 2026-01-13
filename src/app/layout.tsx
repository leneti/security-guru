import "./globals.css";

import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CartProvider } from "@/lib/cart-context";

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
  "call",
  "check",
  "verified_user",
  "close",
  "mail",
  "schedule",
  "location_on",
  "shield_lock",
  "add_shopping_cart",
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
  "production_quantity_limits",
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
        className={`${manrope.variable} ${geistMono.variable} bg-white font-sans text-midnight antialiased`}
      >
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
