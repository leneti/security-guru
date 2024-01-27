import { Title, Text, Button, Container, Group, rem } from "@mantine/core";
import classes from "./500.module.css";

export default function ServerError() {
  const refreshPage = () => window.location.reload();

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
            onClick={refreshPage}
          >
            Atnaujinti puslapį
          </Button>
        </Group>
      </Container>
    </div>
  );
}
