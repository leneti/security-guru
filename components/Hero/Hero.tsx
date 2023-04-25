import { useEffect, useState } from "react";
import {
  createStyles,
  Overlay,
  Container,
  Title,
  Button,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { bgImgHeight } from "@constants";
import houses from "@assets/unsplash-houses.webp";

const leftPadding = "60px";
const overlayGradient = {
  dark: "linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .5) 40%)",
  light:
    "linear-gradient(90deg, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, .1) 100%)",
};

const useStyles = createStyles((theme) => ({
  hero: {
    position: "relative",
    height: bgImgHeight,
  },

  content: {
    height: bgImgHeight,
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
      height: 600,
      paddingRight: `clamp(
        ${theme.spacing.md},
        calc(100vw - ${theme.breakpoints.md}),
        calc(${theme.breakpoints.xl} - ${theme.breakpoints.md})
      )`,
      paddingLeft: theme.spacing.md,
    },

    [theme.fn.smallerThan("sm")]: {
      height: 500,
      paddingBottom: `calc(${theme.spacing.xl} * 6)`,
    },
  },

  title: {
    color:
      theme.colorScheme === "dark"
        ? theme.white
        : theme.colors.dark[theme.fn.primaryShade()],
    fontSize: "clamp(34px, 6vw, 60px)",
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
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    maxWidth: 600,
    fontSize: "clamp(14px, 2vw, 20px)",

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

export default function Hero() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className={classes.hero}>
      <Image
        src={houses}
        alt="houses"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <Overlay
        gradient={mounted ? overlayGradient[theme.colorScheme] : undefined}
        opacity={mounted ? 1 : 0}
        zIndex={0}
        blur={theme.colorScheme === "dark" ? 1 : 2}
      >
        <Container className={classes.content} size={theme.breakpoints.xl}>
          <Title className={classes.title}>
            Namų ir verslo apsaugos sprendimai
          </Title>
          <Text className={classes.description} mt="xl" weight={600}>
            Aukščiausio lygio paslaugos fizinės bei elektroninės apsaugos
            srityse
          </Text>

          <Button
            component={Link}
            href="/susisiekite"
            size="xl"
            radius="xl"
            className={classes.control}
          >
            Susisiekite su mumis
          </Button>
        </Container>
      </Overlay>
    </div>
  );
}
