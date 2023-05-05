import { Text } from "@mantine/core";
import { PageBackground } from "@components/PageBackground";
import { useServiceStyles } from "@utils/serviceStyles";
import html from "./_page_content/ass.json";

const pageTitle = "Apsaugos signalizacijos sistemos";

export default function AlarmSystems() {
  const { classes } = useServiceStyles();

  return (
    <PageBackground pageTitle={pageTitle} wip colorOnly>
      <Text className={classes.content} dangerouslySetInnerHTML={html} />
    </PageBackground>
  );
}
