"use client";

import { Button, CloseButton, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCookie } from "@tabler/icons-react";
import { COOKIE_MESSAGE } from "@site/constants/cookies";
import classes from "./CookieDisclaimer.module.css";
import { CookieSettings } from "./CookieSettings";

export interface CookieDisclaimerProps {
  consentCookie?: string;
  setCookieConsented(): Promise<void>;
}

export function CookieDisclaimer(props: CookieDisclaimerProps) {
  const { consentCookie, setCookieConsented } = props;
  const [isOpen, { close }] = useDisclosure(!consentCookie);

  if (!isOpen) return null;

  return (
    <div className={classes.outer}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <IconCookie
            color="var(--mantine-primary-color)"
            width={40}
            height={40}
          />
          <Text pl={4}>{COOKIE_MESSAGE}</Text>
          <CloseButton className={classes.closeButton} onClick={close} />
        </div>
        <div className={classes.actions}>
          <Button
            variant="filled"
            size="xs"
            onClick={() => {
              setCookieConsented();
              close();
            }}
          >
            Sutinku
          </Button>
          <CookieSettings hasConsent={consentCookie == "1"} onClose={close} />
        </div>
      </div>
    </div>
  );
}
