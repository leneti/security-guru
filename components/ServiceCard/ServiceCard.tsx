import Image from "next/image";
import { Badge, Box, Button, Card, Group, Text, Title } from "@mantine/core";
import Link from "@link";
import classes from "./ServiceCard.module.css";
import type { ServiceCardProps } from "./types";

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
        <Image
          src={image}
          alt={title}
          fill
          className={classes.image}
          sizes="(min-width: 75em) 33vw, (min-width: 62em) 50vw, 100vw"
        />
      </Box>

      <Group justify="space-between" mt="md" mb="xs">
        <Title order={3}>{title}</Title>
        <Badge color="lime" variant="dot">
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
        color="primary.4"
        className={classes.learnMoreBtn}
      >
        Sužinoti daugiau
      </Button>
    </Card>
  );
}
