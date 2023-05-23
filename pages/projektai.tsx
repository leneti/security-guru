import {
  createStyles,
  SimpleGrid,
  Card,
  Text,
  Container,
  AspectRatio,
} from "@mantine/core";
import { PageBackground } from "@site/components/PageBackground";
import Image, { ImageLoaderProps } from "next/image";

const mockdata = [
  {
    title: "Top 10 places to visit in Norway this summer",
    image:
      "photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    date: "August 18, 2022",
  },
  {
    title: "Best forests to visit in North America",
    image:
      "photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    date: "August 27, 2022",
  },
  {
    title: "Hawaii beaches review: better than you think",
    image:
      "photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    date: "September 9, 2022",
  },
  {
    title: "Mountains at night: 12 best locations to enjoy the view",
    image:
      "photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    date: "September 12, 2022",
  },
];

const unsplashLoader = ({ src, width, quality }: ImageLoaderProps) =>
  `https://images.unsplash.com/${src}&auto=format&fit=crop&w=${width}&q=${
    quality || 75
  }`;

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    backgroundColor: "transparent",
    boxShadow: theme.shadows.md,

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.xl,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

function ArticlesCardsGrid() {
  const { classes } = useStyles();

  const cards = mockdata.map(({ title, image, date }) => (
    <Card
      key={title}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
      withBorder
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image
          loader={unsplashLoader}
          src={image}
          alt={title}
          width={400}
          height={250}
        />
      </AspectRatio>

      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {date}
      </Text>

      <Text className={classes.title} mt={5}>
        {title}
      </Text>
    </Card>
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </Container>
  );
}
const pageTitle = "Projektai";

export default function Projects() {
  return (
    <PageBackground pageTitle={pageTitle} colorOnly wip>
      <ArticlesCardsGrid />
    </PageBackground>
  );
}
