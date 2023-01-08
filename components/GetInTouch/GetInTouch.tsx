import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  createStyles,
  useMantineTheme,
  Radio,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { ContactIconsList } from "@components/ContactIcons";
import { IconSun, IconPhone, IconMapPin, IconAt } from "@tabler/icons";

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan("sm");

  return {
    wrapper: {
      display: "flex",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: 4,

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    form: {
      boxSizing: "border-box",
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: theme.spacing.xl * 2,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },

    fields: {
      marginTop: -12,
    },

    fieldInput: {
      flex: 1,

      "& + &": {
        marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: "flex",

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    contacts: {
      boxSizing: "border-box",
      position: "relative",
      borderRadius: theme.radius.lg - 2,
      backgroundColor: theme.fn.primaryColor(),
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: "1px solid transparent",
      padding: theme.spacing.xl,
      flex: "0 0 280px",

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },

    title: {
      marginBottom: theme.spacing.xl * 1.5,
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
  const theme = useMantineTheme();
  const { width } = useViewportSize();

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

  const contactData = [
    { title: "El. paštas", description: "info@securityguru.lt", icon: IconAt },
    {
      title: "Tel. Nr.",
      description: `+37060334255${
        width < theme.breakpoints.md ? " | " : " "
      }+37060283726`,
      icon: IconPhone,
    },
    {
      title: "Dirbame",
      description: "Vilniuje ir Vilniaus apskrityje",
      icon: IconMapPin,
    },
    { title: "Darbo laikas", description: "9:00 – 21:00", icon: IconSun },
  ];

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
          <Text
            size="lg"
            weight={700}
            className={classes.title}
            sx={(theme) => ({
              color: theme.colorScheme === "dark" ? "#000" : "#fff",
            })}
          >
            Kontaktai
          </Text>

          <ContactIconsList variant="white" data={contactData} />
        </div>

        <form className={classes.form} onSubmit={form.onSubmit(onSubmit)}>
          <Text size="lg" weight={700} className={classes.title}>
            Susisiekite su mumis
          </Text>

          <div className={classes.fields}>
            <Radio.Group
              name="favoriteFramework"
              label="Pasirinkite sprendimą"
              {...form.getInputProps("solution")}
            >
              <Radio value="namams" label="Namams" required />
              <Radio value="verslui" label="Verslui" required />
            </Radio.Group>

            <SimpleGrid
              mt="sm"
              cols={2}
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
