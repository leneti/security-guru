import { createContext, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import type { IWrapper } from "./types";

export const PrevUrlContext = createContext("");

export default function PrevUrlProvider({ children }: IWrapper) {
  const { asPath } = useRouter();

  const ref = useRef<string>("/");

  useEffect(() => {
    ref.current = asPath;
  }, [asPath]);

  return (
    <PrevUrlContext.Provider value={ref.current}>
      {children}
    </PrevUrlContext.Provider>
  );
}

export const usePrevUrlContext = () => useContext(PrevUrlContext);
