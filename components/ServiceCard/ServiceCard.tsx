import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  Title,
  Box,
  createStyles,
} from "@mantine/core";
import Image, { StaticImageData } from "next/image";

const CARD_HEIGHT = 420;
const IMAGE_HEIGHT = 200;

const useStyles = createStyles(() => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  cardImageBox: {
    position: "relative",
    margin: "-1rem -1rem 0 -1rem",
    height: IMAGE_HEIGHT,
    width: "100%",
  },

  image: {
    objectFit: "cover",
  },
}));

export interface ServiceCardProps {
  image: StaticImageData;
  title: string;
  description: string;
  price: string;
}

export default function ServiceCard({
  image,
  title,
  description,
  price,
}: ServiceCardProps) {
  const { classes } = useStyles();

  return (
    <Card
      shadow="xl"
      radius="md"
      withBorder
      h="100%"
      mih={CARD_HEIGHT}
      className={classes.card}
    >
      <Box className={classes.cardImageBox}>
        <Image src={image} alt={title} fill className={classes.image} />
      </Box>

      <Group position="apart" mt="md" mb="xs">
        <Title order={3}>{title}</Title>
        <Badge color="brand-light-green.6" variant="dot">
          {price}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {description}
      </Text>

      <Button variant="outline" fullWidth mt="md" radius="md">
        Sužinoti daugiau
      </Button>
    </Card>
  );
}
