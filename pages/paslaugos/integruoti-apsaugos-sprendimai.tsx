import { Text } from "@mantine/core";
import { PageBackground } from "@components";
import html from "./_page_content/ias.json";
import { useServiceStyles } from "@utils";

const pageTitle = "Integruoti apsaugos sprendimai";

export default function IntegratedSecurity() {
  const { classes } = useServiceStyles();

  return (
    <PageBackground pageTitle={pageTitle} wip colorOnly>
      <Text className={classes.content} dangerouslySetInnerHTML={html} />
    </PageBackground>
  );
}
