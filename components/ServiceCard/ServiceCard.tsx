import { Card, Image, Text, Badge, Button, Group, Title } from "@mantine/core";

const CARD_HEIGHT = 420;
const IMAGE_HEIGHT = 200;

export default function ServiceCard({
  image,
  title,
  description,
  price,
}: {
  image: string;
  title: string;
  description: string;
  price: string;
}) {
  return (
    <Card
      shadow="xl"
      radius="md"
      withBorder
      h="100%"
      mih={CARD_HEIGHT}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Card.Section>
        <Image src={image} height={IMAGE_HEIGHT} alt={title} />
      </Card.Section>

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
