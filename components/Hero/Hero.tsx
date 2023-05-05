import { useEffect, useState } from "react";
import {
  createStyles,
  Overlay,
  Container,
  Title,
  Button,
  Text,
  useMantineTheme,
  clsx,
} from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { bgImgHeight } from "@site/constants";
import houses from "@site/assets/unsplash-houses.webp";

const leftPadding = "60px";
const overlayGradient =
  "linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .5) 40%)";

const useStyles = createStyles((theme) => ({
  dynamicHeight: {
    minHeight: bgImgHeight,

    [theme.fn.smallerThan("md")]: {
      minHeight: `calc(${bgImgHeight} - 6.25rem)`,
    },

    [theme.fn.smallerThan("sm")]: {
      minHeight: `calc(${bgImgHeight} - 6.25rem * 2)`,
    },
  },

  hero: {
    position: "relative",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    zIndex: 1,
    paddingBottom: `calc(${theme.spacing.xl} * 8)`,
    paddingRight: `clamp(
      ${theme.spacing.md},
      calc(100vw - ${theme.breakpoints.md}),
      calc(${theme.breakpoints.xl} - ${theme.breakpoints.md})
    )`,
    paddingLeft: theme.spacing.md,

    [theme.fn.smallerThan("xl")]: {
      paddingRight: `clamp(
        ${theme.spacing.md},
        calc(100vw - ${theme.breakpoints.md}),
        calc(${theme.breakpoints.xl} - ${theme.breakpoints.md} - ${leftPadding})
      )`,
      paddingLeft: `clamp(
        ${theme.spacing.md},
        calc(100vw - ${theme.breakpoints.md}),
        ${leftPadding}
      )`,
    },

    [theme.fn.smallerThan("md")]: {
      paddingRight: `clamp(
        ${theme.spacing.md},
        calc(100vw - ${theme.breakpoints.md}),
        calc(${theme.breakpoints.xl} - ${theme.breakpoints.md})
      )`,
      paddingLeft: theme.spacing.md,
    },

    [theme.fn.smallerThan("sm")]: {
      paddingBottom: `calc(${theme.spacing.xl} * 6)`,
    },

    [theme.fn.smallerThan("xs")]: {
      paddingBottom: `calc(${theme.spacing.xl} * 5)`,
    },
  },

  title: {
    color: theme.white,
    fontSize: "clamp(2.125rem, 6vw, 4rem)",
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan("sm")]: {
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan("xs")]: {
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: "37.5rem",
    fontSize: "clamp(1rem, 2vw, 1.5rem)",

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  CTA: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },

  image: {
    objectFit: "cover",
  },
}));

export default function Hero() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className={clsx(classes.hero, classes.dynamicHeight)}>
      <Image
        src={houses}
        alt="houses"
        fill
        className={classes.image}
        priority
      />
      <Overlay
        gradient={mounted ? overlayGradient : undefined}
        opacity={mounted ? 1 : 0}
        zIndex={0}
        blur={1}
      >
        <Container
          className={clsx(classes.content, classes.dynamicHeight)}
          size={theme.breakpoints.xl}
        >
          <Title className={classes.title}>
            Namų ir verslo apsaugos sprendimai
          </Title>
          <Text className={clsx(classes.description)} mt="xl" weight={600}>
            Aukščiausio lygio paslaugos fizinės bei elektroninės apsaugos
            srityse
          </Text>

          <Button
            component={Link}
            href="/susisiekite"
            size="xl"
            radius="xl"
            className={classes.CTA}
          >
            Susisiekite su mumis
          </Button>
        </Container>
      </Overlay>
    </div>
  );
}
