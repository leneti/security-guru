"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

export function RouterTransition() {
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => nprogress.complete(), 200);

    return () => {
      nprogress.start();
    };
  }, [pathname]);

  return <NavigationProgress />;
}
