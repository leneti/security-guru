import { PageBackground } from "@site/components/PageBackground";
import type { Metadata } from "next/types";
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
