import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Title,
  Transition,
  type MantineTransition,
  Text,
  createStyles,
  clsx,
} from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import { flatLinks } from "@site/constants";
import { usePrevUrlContext } from "@site/contexts/prevUrl";
import { SlideDownTitleProps } from "./types";

const marginBottom = "1.5rem";

const scaleY: MantineTransition = {
  in: {
    opacity: 1,
    transform: "scaleY(1)",
    marginBottom,
    height: "100%",
  },
  out: {
    opacity: 0,
    transform: "scaleY(0)",
    marginBottom: 0,
    height: 0,
  },
  common: {
    transformOrigin: "top",
    overflow: "hidden",
  },
  transitionProperty: "transform, opacity, margin-bottom height",
};

const useStyles = createStyles(
  (
    theme,
    {
      noMotion,
      mounted,
      direction,
    }: { noMotion: boolean; mounted: boolean; direction: "right" | "left" }
  ) => ({
    title: {
      fontWeight: 900,
      marginTop: theme.spacing.xs,
      marginBottom,
      paddingBottom: theme.spacing.sm,
      paddingLeft: theme.spacing.xl,
      paddingRight: theme.spacing.xl,
    },

    horizontallyMovingTitle: {
      opacity: mounted || noMotion ? 1 : 0,
      ...(!noMotion
        ? {
            transform: `scaleX(${mounted ? 1 : 0.9})`,
            transitionProperty: "opacity transform",
            transitionDuration: ".2s",
            transformOrigin: `${direction} center 0px`,
          }
        : {}),
    },
  })
);

const WIPText = ({ wip }: Pick<SlideDownTitleProps, "wip">) =>
  wip ? (
    <Text align="center" mb="lg" c="dimmed">
      Puslapis ruošiamas
    </Text>
  ) : null;

export default function SlideDownTitle(props: SlideDownTitleProps) {
  const { title, wip = false } = props;
  const noMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const prevUrl = usePrevUrlContext();
  const currentUrl = useRouter().asPath;
  const direction =
    flatLinks.findIndex(({ url }) => url === currentUrl) >
    flatLinks.findIndex(({ url }) => url === prevUrl)
      ? "right"
      : "left";
  const { classes } = useStyles({ noMotion, mounted, direction });

  useEffect(() => setMounted(true), []);

  return prevUrl === "/" ? (
    <Transition mounted={mounted} transition={scaleY} duration={200}>
      {(styles) => (
        <>
          <Title align="center" style={styles} className={classes.title}>
            {title}
          </Title>
          <WIPText wip={wip} />
        </>
      )}
    </Transition>
  ) : (
    <>
      <Title
        align="center"
        className={clsx(classes.title, classes.horizontallyMovingTitle)}
      >
        {title}
      </Title>
      <WIPText wip={wip} />
    </>
  );
}
