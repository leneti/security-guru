import { Text } from "@mantine/core";
import { PageBackground } from "@components";
import html from "./_page_content/iks.json";
import { useServiceStyles } from "@utils";

const pageTitle = "Įeigos kontrolės sistemos";

export default function TrafficControl() {
  const { classes } = useServiceStyles();

  return (
    <PageBackground pageTitle={pageTitle} wip colorOnly>
      <Text className={classes.content} dangerouslySetInnerHTML={html} />
    </PageBackground>
  );
}
