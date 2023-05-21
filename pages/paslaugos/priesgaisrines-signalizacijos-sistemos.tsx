import { Text } from "@mantine/core";
import { PageBackground } from "@site/components/PageBackground";
import { useServiceStyles } from "@site/utils/useServiceStyles";
import html from "./_page_content/pss.json";

const pageTitle = "Priešgaisrinės signalizacijos sistemos";

export default function FireAlarms() {
  const { classes } = useServiceStyles();

  return (
    <PageBackground pageTitle={pageTitle} wip colorOnly>
      <Text className={classes.content} dangerouslySetInnerHTML={html} />
    </PageBackground>
  );
}
