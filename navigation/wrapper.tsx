"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

function HandleOnCompleteChild() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => nprogress.complete(), [pathname, searchParams]);
  return <NavigationProgress aria-label="Loading..." />;
}

export function NavigationProgressBar() {
  return (
    <Suspense>
      <HandleOnCompleteChild />
    </Suspense>
  );
}
