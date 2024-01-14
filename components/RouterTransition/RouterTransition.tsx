import { useEffect } from "react";
import { useRouter } from "next/router";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";

export default function RouterTransition() {
  const router = useRouter();
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(theme.fn.smallerThan("sm").substring(7));
  const xlScreen = !useMediaQuery(theme.fn.smallerThan("xl").substring(7));

  useEffect(() => {
    const handleStart = (url: string) => url !== router.asPath && nprogress.start();
    const handleComplete = () => nprogress.complete();

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.asPath, router.events]);

  if (xlScreen) {
    return null;
  }

  return <NavigationProgress size={smallScreen ? 2 : 1} />;
}
