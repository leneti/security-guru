import { useState, useEffect, useContext } from "react";
import { Title, Transition, type MantineTransition, Text } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import { useRouter } from "next/router";
import { PrevUrlContext } from "@pages/_app";
import { baseTheme, flatLinks } from "@constants";
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

const WIPText = ({ wip }: Pick<SlideDownTitleProps, "wip">) =>
  wip ? (
    <Text align="center" mb="lg" c="dimmed">
      Puslapis ruošiamas
    </Text>
  ) : null;

export default function SlideDownTitle(props: SlideDownTitleProps) {
  const { title, wip = false } = props;
  const [mounted, setMounted] = useState(false);
  const prevUrl = useContext(PrevUrlContext);
  const noMotion = useReducedMotion();
  const currentUrl = useRouter().asPath;
  const direction =
    flatLinks.findIndex(({ url }) => url === currentUrl) >
    flatLinks.findIndex(({ url }) => url === prevUrl)
      ? "right"
      : "left";

  useEffect(() => setMounted(true), []);

  return prevUrl === "/" ? (
    <Transition mounted={mounted} transition={scaleY} duration={200}>
      {(styles) => (
        <>
          <Title
            align="center"
            style={{
              ...styles,
              fontWeight: 900,
              marginTop: baseTheme.spacing.xs,
              marginBottom,
              paddingBottom: baseTheme.spacing.sm,
            }}
          >
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
        sx={{
          fontWeight: 900,
          marginTop: baseTheme.spacing.xs,
          marginBottom,
          paddingBottom: baseTheme.spacing.sm,
          opacity: mounted || noMotion ? 1 : 0,
          ...(!noMotion
            ? {
                transform: `scaleX(${mounted ? 1 : 0.9})`,
                transitionProperty: "opacity transform",
                transitionDuration: ".2s",
                transformOrigin: `${direction} center 0px`,
              }
            : {}),
        }}
      >
        {title}
      </Title>
      <WIPText wip={wip} />
    </>
  );
}
