"use client";

import type { SwitchProps } from "@mantine/core";
import { Switch } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

export const LOCAL_STORAGE_KEY = "vat-switch";

export function VATSwitch(props: SwitchProps) {
  const [showVAT, setShowVAT] = useLocalStorage({
    key: LOCAL_STORAGE_KEY,
    defaultValue: true,
  });

  return (
    <Switch
      label="Su PVM"
      size="md"
      checked={showVAT}
      onChange={(e) => setShowVAT(e.target.checked)}
      {...props}
    />
  );
}
