import { Text, Box, SimpleGrid } from "@mantine/core";
import { contactData } from "@site/constants";
import classes from "./ContactInfo.module.css";

export default function ContactInfo() {
  const items = contactData.map(({ icon: Icon, title, description }) => (
    <div key={title} className={classes.wrapper}>
      <Box mr="md">
        <Icon size={24} className={classes.icon} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  ));

  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
      {items}
    </SimpleGrid>
  );
}
