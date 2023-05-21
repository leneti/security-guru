import {
  createStyles,
  Text,
  Box,
  useMantineTheme,
  SimpleGrid,
} from "@mantine/core";
import { contactData } from "@site/constants";

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
    color: theme.colors.dark[0],
    fontWeight: "bold",
  },

  description: {
    color: theme.colors.dark[2],
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

  return (
    <SimpleGrid
      cols={1}
      spacing="md"
      breakpoints={[
        { maxWidth: "sm", cols: 2 },
        { maxWidth: "xs", cols: 1 },
      ]}
    >
      {items}
    </SimpleGrid>
  );
}
