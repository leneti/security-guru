"use client";

import {
  ActionIcon,
  Button,
  Modal,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCookie } from "@tabler/icons-react";
import classes from "./CookieSettings.module.css";
import { toggleCookieConsent } from "./toggle-consent";

export interface CookieSettingsProps {
  iconProps?: { actionClassName?: string; iconClassName?: string };
  hasConsent: boolean;
  onClose?: () => void;
}

export function CookieSettings(props: CookieSettingsProps) {
  const { iconProps, hasConsent, onClose } = props;
  const [isOpen, { open, close }] = useDisclosure(false);

  return (
    <>
      {iconProps ? (
        <ActionIcon
          className={iconProps.actionClassName}
          title="Slapukų pasirinkimai"
          variant="subtle"
          onClick={open}
        >
          <IconCookie className={iconProps.iconClassName} stroke={1.5} />
        </ActionIcon>
      ) : (
        <Button variant="outline" size="xs" color="primary.3" onClick={open}>
          Keisti mano pasirinkimus
        </Button>
      )}

      <Modal.Root
        opened={isOpen}
        onClose={() => {
          close();
          onClose?.();
        }}
        size="lg"
        centered
      >
        <Modal.Overlay />
        <Modal.Content className={classes.modal}>
          <Modal.Header>
            <Modal.Title fz="1.25rem" fw={600}>
              Slapukų pasirinkimai
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>

          <Modal.Body className={classes.modalBody}>
            <Stack>
              <Title order={3} fw={600}>
                Jūsų privatumas
              </Title>
              <Text size="sm">
                Slapukai - tai labai maži tekstiniai failai, kurie išsaugomi
                jūsų kompiuteryje, kai lankotės svetainėje. Slapukus naudojame
                įvairiais tikslais siekdami pagerinti jūsų internetinę patirtį
                mūsų svetainėje (pavyzdžiui, kad įsimintume, ar uždarėte
                naujienų skiltį puslapių viršuje). Naršydami mūsų svetainėje
                galite pakeisti savo nuostatas ir atsisakyti, kad tam tikri
                slapukai būtų saugomi jūsų kompiuteryje.
              </Text>
            </Stack>
            <Stack>
              <Title order={3} fw={600}>
                &quot;Slapukų nuostatų&quot; slapukai
              </Title>
              <Text size="sm">
                Norėdami įsiminti jūsų slapukų nuostatas, turime naudoti
                slapukus. Išjungę šį slapuką svetainėje, neturėsime galimybės
                sekti jūsų nuostatų ir svetainėje visada bus rodomas atsakomybės
                atsisakymas.
              </Text>
              <Switch
                label="Slapukų nuostatos"
                size="md"
                classNames={{
                  body: classes.switchBody,
                  label: classes.switchLabel,
                }}
                checked={hasConsent}
                onChange={toggleCookieConsent}
              />
            </Stack>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
