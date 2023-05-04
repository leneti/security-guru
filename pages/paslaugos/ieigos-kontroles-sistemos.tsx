import { Text } from "@mantine/core";
import { PageBackground } from "@components/PageBackground";
import { useServiceStyles } from "@utils/serviceStyles";
import html from "./_page_content/iks.json";

const pageTitle = "Įeigos kontrolės sistemos";

export default function TrafficControl() {
  const { classes } = useServiceStyles();

  return (
    <PageBackground pageTitle={pageTitle} wip colorOnly>
      <Text className={classes.content} dangerouslySetInnerHTML={html} />
    </PageBackground>
  );
}
