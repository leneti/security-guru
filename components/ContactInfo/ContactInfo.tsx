import { Text, Box, SimpleGrid } from "@mantine/core";
import { contactData } from "@site/constants";
import classes from "./ContactInfo.module.css";

export default function ContactInfo() {
  return (
    <SimpleGrid cols={{ base: 2, sm: 1 }} spacing="md">
      {contactData.map(({ icon: Icon, title, description }) => (
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
      ))}
    </SimpleGrid>
  );
}
