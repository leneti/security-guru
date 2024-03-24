import type { Metadata } from "next/types";
import { GetInTouch } from "@site/app/susisiekite/GetInTouch";
import { PageBackground } from "@site/components/PageBackground";

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
