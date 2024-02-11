import { Title, Text, Button, Container, Group, rem } from "@mantine/core";
import classes from "./error.module.css";
import { useEffect } from "react";

interface ErrorPage {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error(props: ErrorPage) {
  const { error, reset } = props;

  useEffect(() => {
    console.error(error);
  }, [error]);

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
