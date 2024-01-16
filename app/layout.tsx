import { type Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
