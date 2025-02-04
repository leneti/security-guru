import type { Metadata } from "next/types";
import { Title } from "@mantine/core";
import { VATSwitch } from "@site/components/VATSwitch";
import pageClasses from "@site/components/PageBackground/PageBackground.module.css";

export const metadata: Metadata = {
  title: "Parduotuvė",
};

export default function Shop() {
  return (
    <main className="relative">
      <Title ta="center" className={pageClasses.title}>
        Parduotuvė
      </Title>
      <VATSwitch className="mt-xs absolute top-1 right-4 hidden sm:block" />
      <div className="max-w-breakpoint-xl px-md mx-auto"></div>
    </main>
  );
}
