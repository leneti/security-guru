import { useState, useEffect, useContext } from "react";
import { Title, Transition, type MantineTransition } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import { PrevUrlContext } from "@pages/_app";
import { baseTheme } from "@constants";

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

export interface SlideDownTitleProps {
  title: string;
}

export default function SlideDownTitle(props: SlideDownTitleProps) {
  const { title } = props;
  const [mounted, setMounted] = useState(false);
  const prevUrl = useContext(PrevUrlContext);
  const noMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  return prevUrl === "/" ? (
    <Transition mounted={mounted} transition={scaleY} duration={200}>
      {(styles) => (
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
      )}
    </Transition>
  ) : (
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
              transformOrigin: "left center 0px",
            }
          : {}),
      }}
    >
      {title}
    </Title>
  );
}
