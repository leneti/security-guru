import { useRouter as useRouterOriginal } from "next/navigation";
import { nprogress } from "@mantine/nprogress";
import { shouldTriggerStartEvent } from "./should-start";

export function useRouter(): ReturnType<typeof useRouterOriginal> {
  const router = useRouterOriginal();

  return {
    ...router,
    push: (href, options) => {
      if (shouldTriggerStartEvent(href)) nprogress.start();
      router.push(href, options);
    },
    replace: (href, options) => {
      if (shouldTriggerStartEvent(href)) nprogress.start();
      router.replace(href, options);
    },
  };
}
