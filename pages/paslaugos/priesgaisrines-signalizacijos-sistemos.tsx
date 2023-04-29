import { Text } from "@mantine/core";
import { PageBackground } from "@components";
import html from "./_page_content/pss.json";
import { useServiceStyles } from "@utils";

const pageTitle = "Priešgaisrinės signalizacijos sistemos";

export default function FireAlarms() {
  const { classes } = useServiceStyles();

  return (
    <PageBackground pageTitle={pageTitle} wip colorOnly>
      <Text className={classes.content} dangerouslySetInnerHTML={html} />
    </PageBackground>
  );
}
