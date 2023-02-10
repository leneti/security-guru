import { createStyles, Text, Box, Stack, useMantineTheme } from "@mantine/core";
import contactData from "@site/constants/contact-data";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    color: theme.white,
  },

  icon: {
    marginRight: theme.spacing.md,
    backgroundColor: "transparent",
  },

  title: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.fn.primaryColor(),
    fontWeight: theme.colorScheme === "dark" ? "bold" : "normal",
  },

  description: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[9],
  },
}));

export default function ContactInfo() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const items = contactData.map(({ icon: Icon, title, description }) => (
    <div key={title} className={classes.wrapper}>
      <Box mr="md">
        <Icon size={24} color={theme.fn.primaryColor()} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  ));
  return <Stack>{items}</Stack>;
}
