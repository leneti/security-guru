import type { Metadata } from "next/types";
import { PageBackground } from "@site/components/PageBackground";
import ArticlesCardsGrid from "./articles";

const pageTitle = "Projektai";

export const metadata: Metadata = {
  title: pageTitle,
};

export default function Projects() {
  return (
    <PageBackground pageTitle={pageTitle} colorOnly wip>
      <ArticlesCardsGrid />
    </PageBackground>
  );
}
