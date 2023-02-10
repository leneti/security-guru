import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  createStyles,
  Radio,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import ContactInfo from "@site/components/ContactInfo";

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan("sm");

  return {
    wrapper: {
      display: "flex",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderRadius: theme.radius.lg,
      padding: 4,

      [BREAKPOINT]: {
        width: "90vw",
        flexDirection: "column",
      },
    },

    form: {
      boxSizing: "border-box",
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: `calc(${theme.spacing.xl} * 2)`,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },

    fields: {
      marginTop: -12,
    },

    contacts: {
      position: "relative",
      marginLeft: 8,
      marginRight: 8,
      padding: theme.spacing.xl,
      flex: "0 0 15rem",

      "&:before": {
        content: '""',
        position: "absolute",
        right: -1,
        top: "5%",
        height: "90%",
        borderRight: `1px solid ${theme.fn.primaryColor()}`,
      },

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
        paddingBottom: `calc(${theme.spacing.xl} * 2)`,

        "&:before": {
          content: '""',
          position: "absolute",
          bottom: -1,
          left: "5%",
          width: "90%",
          borderRight: "none",
          borderBottom: `1px solid ${theme.fn.primaryColor()}`,
        },
      },
    },

    title: {
      marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },

    control: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },
  };
});

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function GetInTouch() {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      solution: "",
      name: "",
      email: "",
      city: "",
      number: "",
      message: "",
    },

    validate: {
      email: (value) =>
        emailRegex.test(value) ? null : "Neteisingas el. paštas",
    },
  });

  const onSubmit = (values: {
    solution: string;
    name: string;
    email: string;
    city: string;
    number: string;
    message: string;
  }) => {
    console.log(values);
  };

  return (
    <Paper shadow="lg" radius="lg">
      <div className={classes.wrapper}>
        <div className={classes.contacts}>
          <Text size="lg" weight={700} className={classes.title}>
            Kontaktai
          </Text>

          <ContactInfo />
        </div>

        <form className={classes.form} onSubmit={form.onSubmit(onSubmit)}>
          <Text size="lg" weight={700} className={classes.title}>
            Susisiekite su mumis
          </Text>

          <div className={classes.fields}>
            <Radio.Group
              name="sprendimas"
              label="Pasirinkite sprendimą"
              {...form.getInputProps("solution")}
            >
              <Group>
                <Radio value="namams" label="Namams" required />
                <Radio value="verslui" label="Verslui" required />
              </Group>
            </Radio.Group>

            <SimpleGrid
              mt="sm"
              cols={2}
              spacing="md"
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            >
              <TextInput
                label="Vardas / Įmonės pavadinimas"
                placeholder="Security Guru"
                required
                {...form.getInputProps("name")}
              />
              <TextInput
                label="El. paštas"
                placeholder="security.guru@gmail.com"
                required
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Miestas"
                placeholder="Miestas"
                required
                {...form.getInputProps("city")}
              />
              <TextInput
                label="Tel. Nr"
                placeholder="Tel. Nr"
                required
                {...form.getInputProps("number")}
              />
            </SimpleGrid>

            <Textarea
              mt="md"
              label="Pastabos"
              placeholder="Pateikite visą svarbią informaciją"
              minRows={3}
              required
              {...form.getInputProps("message")}
            />

            <Group position="right" mt="md">
              <Button type="submit" className={classes.control}>
                Siųsti laišką
              </Button>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}
