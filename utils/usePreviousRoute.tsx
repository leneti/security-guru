import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

export const usePreviousRoute = () => {
  const { asPath } = useRouter();

  const ref = useRef<string>("/");

  useEffect(() => {
    ref.current = asPath;
  }, [asPath]);

  return ref.current;
};
