import { Text } from "@mantine/core";
import { PageBackground } from "@components";
import html from "./_page_content/ass.json";
import { useServiceStyles } from "@utils";

const pageTitle = "Apsaugos signalizacijos sistemos";

export default function AlarmSystems() {
  const { classes } = useServiceStyles();

  return (
    <PageBackground pageTitle={pageTitle} wip colorOnly>
      <Text className={classes.content} dangerouslySetInnerHTML={html} />
    </PageBackground>
  );
}
