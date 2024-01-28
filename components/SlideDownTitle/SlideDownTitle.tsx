import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Title, Transition, type MantineTransition, Text } from "@mantine/core";
import { flatLinks } from "@site/constants";
import { usePrevUrlContext } from "@site/contexts/prevUrl";
import type { SlideDownTitleProps } from "./types";
import clsx from "clsx";
import classes from "./SlideDownTitle.module.css";

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
    <Text ta="center" mb="lg" c="dimmed">
      Puslapis ruošiamas
    </Text>
  ) : null;

export default function SlideDownTitle(props: SlideDownTitleProps) {
  const { title, wip = false } = props;
  const [mounted, setMounted] = useState(false);
  const prevUrl = usePrevUrlContext();
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
          <Title ta="center" style={styles} className={classes.title}>
            {title}
          </Title>
          <WIPText wip={wip} />
        </>
      )}
    </Transition>
  ) : (
    <>
      <Title
        ta="center"
        className={clsx(
          classes.title,
          classes.horizontallyMovingTitle,
          classes[direction],
          mounted && classes.mounted,
          wip && classes.wip,
        )}
      >
        {title}
      </Title>
      <WIPText wip={wip} />
    </>
  );
}
