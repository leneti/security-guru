import { PageBackground } from "@site/components/PageBackground";
import { GetInTouch } from "@site/app/susisiekite/GetInTouch";
import type { Metadata } from "next/types";

const pageTitle = "Susisiekite";

export const metadata: Metadata = {
  title: pageTitle,
};

export default function Contacts() {
  return (
    <PageBackground pageTitle={pageTitle}>
      <GetInTouch />
    </PageBackground>
  );
}
