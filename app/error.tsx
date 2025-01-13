"use client";

import { useEffect } from "react";
import { Button, Container, Group, Text, Title } from "@mantine/core";
import classes from "./error.module.css";

interface ErrorPage {
  error: Error & { digest?: string };
  reset: () => void;
  supressConsole?: boolean;
}

export default function Error(props: ErrorPage) {
  const { error, reset, supressConsole } = props;

  useEffect(() => {
    if (!supressConsole) console.error(error);
  }, [error, supressConsole]);

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>500</div>
        <Title className={classes.title}>Kažkas ne taip...</Title>
        <Text size="lg" ta="center" className={classes.description}>
          Mūsų serveriai negalėjo apdoroti jūsų užklausos. Security Guru komanda
          jau buvo informuota. Pabandykite atnaujinti puslapį.
        </Text>
        <Group justify="center">
          <Button
            variant="white"
            className={classes.refreshBtn}
            size="md"
            onClick={reset}
          >
            Atnaujinti puslapį
          </Button>
        </Group>
      </Container>
    </div>
  );
}
