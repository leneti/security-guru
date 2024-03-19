"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

function HandleOnCompleteChild() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => nprogress.complete(), [pathname, searchParams]);
  return <NavigationProgress />;
}

export function NavigationProgressBar() {
  return (
    <Suspense>
      <HandleOnCompleteChild />
    </Suspense>
  );
}
