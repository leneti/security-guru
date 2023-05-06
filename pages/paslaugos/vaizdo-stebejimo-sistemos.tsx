import { Text } from "@mantine/core";
import { PageBackground } from "@site/components/PageBackground";
import { useServiceStyles } from "@site/utils/useServiceStyles";
import html from "./_page_content/vss.json";

const pageTitle = "Vaizdo stebėjimo sistemos";

export default function CCTV() {
  const { classes } = useServiceStyles();

  return (
    <PageBackground pageTitle={pageTitle} wip colorOnly>
      <Text className={classes.content} dangerouslySetInnerHTML={html} />
    </PageBackground>
  );
}
