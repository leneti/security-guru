import { Card, Text, Badge, Button, Group, Title, Box } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { ServiceCardProps } from "./types";
import classes from "./ServiceCard.module.css";

const CARD_HEIGHT = 420;

export default function ServiceCard({
  image,
  title,
  description,
  price,
  url,
}: ServiceCardProps) {
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

      <Group justify="space-between" mt="md" mb="xs">
        <Title order={3}>{title}</Title>
        <Badge color="brand-light-green.6" variant="dot">
          {price}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {description}
      </Text>

      <Button
        component={Link}
        href={url}
        variant="outline"
        fullWidth
        mt="md"
        radius="md"
        className={classes.learnMoreBtn}
      >
        Sužinoti daugiau
      </Button>
    </Card>
  );
}
