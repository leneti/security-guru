import { createContext, useContext } from "react";
import { usePreviousRoute } from "@site/utils/usePreviousRoute";
import { IWrapper } from "./types";

export const PrevUrlContext = createContext("");
export const usePrevUrlContext = () => useContext(PrevUrlContext);

export default function PrevUrlProvider({ children }: IWrapper) {
  const prevUrl = usePreviousRoute();

  return (
    <PrevUrlContext.Provider value={prevUrl}>
      {children}
    </PrevUrlContext.Provider>
  );
}
