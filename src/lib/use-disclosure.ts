import { useCallback, useState } from "react";

export interface UseDisclosureHandlers {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export type UseDisclosureReturnValue = [boolean, UseDisclosureHandlers];

export function useDisclosure(initialState = false): UseDisclosureReturnValue {
  const [opened, setOpened] = useState(initialState);

  const open = useCallback(() => {
    setOpened((isOpened) => (!isOpened ? true : isOpened));
  }, []);

  const close = useCallback(() => {
    setOpened((isOpened) => (isOpened ? false : isOpened));
  }, []);

  const toggle = useCallback(() => (opened ? close() : open()), [close, open, opened]);

  return [opened, { open, close, toggle }];
}
