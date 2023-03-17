import { useState, useEffect } from "react";
import { Title, Transition, type MantineTransition } from "@mantine/core";
import { baseTheme } from "@constants";

const scaleY: MantineTransition = {
  in: {
    opacity: 1,
    transform: "scaleY(1)",
    lineHeight: 1.3,
    marginBottom: "1.5rem",
  },
  out: { opacity: 0, transform: "scaleY(0)", lineHeight: 0, marginBottom: 0 },
  common: {
    transformOrigin: "top",
    fontWeight: 900,
    marginTop: baseTheme.spacing.xs,
    paddingBottom: baseTheme.spacing.sm,
  },
  transitionProperty: "transform, opacity, line-height, margin-bottom",
};

export interface SlideDownTitleProps {
  title: string;
}

export default function SlideDownTitle(props: SlideDownTitleProps) {
  const { title } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Transition mounted={mounted} transition={scaleY} duration={200}>
      {(styles) => (
        <Title align="center" style={styles}>
          {title}
        </Title>
      )}
    </Transition>
  );
}
