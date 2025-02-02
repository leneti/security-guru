import type { Metadata } from "next/types";
import { Title } from "@mantine/core";

export const metadata: Metadata = {
  title: "Parduotuvė",
};

export default function Shop() {
  return (
    <div className="mx-auto max-w-[var(--mantine-breakpoint-xl)] px-[var(--mantine-spacing-xl)]">
      <Title order={1}>Parduotuvė</Title>
    </div>
  );
}
