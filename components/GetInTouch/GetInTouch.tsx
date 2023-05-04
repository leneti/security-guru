import axios from "axios";
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
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconX, IconCheck } from "@tabler/icons";
import { ContactForm } from "@components/GetInTouch";
import { ContactInfo } from "@components/ContactInfo";
import { emailRegex, numberRegex, ERROR_MESSAGES } from "@constants";

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan("sm");

  return {
    wrapper: {
      display: "flex",
      backgroundColor: theme.colors.dark[7],
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

    button: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },
  };
});

const notificationId = "form-submit";
const labelProps = { style: { marginBottom: "0.25rem" } };

export default function GetInTouch() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(theme.fn.smallerThan("sm").substring(7));
  const fieldSize = smallScreen ? "md" : "sm";
  const btnSize = smallScreen ? "lg" : "sm";
  const notificationStyle = {
    borderColor: theme.colors.dark[4],
  };

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
        emailRegex.test(value) ? null : ERROR_MESSAGES.INCORRECT_EMAIL,
      number: (value) => {
        try {
          return numberRegex.test(value)
            ? null
            : ERROR_MESSAGES.INCORRECT_NUMBER;
        } catch (error) {
          return ERROR_MESSAGES.INCORRECT_NUMBER;
        }
      },
    },
  });

  const onSubmit = (values: ContactForm) => {
    notifications.show({
      id: notificationId,
      title: "Siunčiama...",
      message: "Siunčiame laišką Security Guru komandai, prašome palaukti.",
      loading: true,
      style: notificationStyle,
    });

    axios
      .post("/api/contact", values)
      .then((res) => {
        notifications.update({
          id: notificationId,
          withCloseButton: true,
          autoClose: 5000,
          title: "Valio!",
          message:
            res.data?.message ??
            "Sėkmingai išsiuntėme laišką Security Guru komandai!",
          color: "teal",
          icon: <IconCheck />,
          style: notificationStyle,
        });

        form.reset();
      })
      .catch((err) => {
        notifications.update({
          id: notificationId,
          withCloseButton: true,
          autoClose: 50000,
          title: "Kažkas nutiko...",
          message: err.response?.data?.message ?? "Bandykite dar kartą vėliau.",
          color: "red",
          icon: <IconX />,
          style: notificationStyle,
        });
      });
  };

  return (
    <Paper shadow="lg" radius="lg" sx={{ zIndex: "inherit" }}>
      <div className={classes.wrapper}>
        <div className={classes.contacts}>
          <Text size="lg" weight={700} className={classes.title}>
            Informacija
          </Text>

          <ContactInfo />
        </div>

        <form className={classes.form} onSubmit={form.onSubmit(onSubmit)}>
          <Text size="lg" weight={700} className={classes.title}>
            Susisiekite su mumis
          </Text>

          <div className={classes.fields}>
            <Radio.Group
              required
              name="sprendimas"
              label="Pasirinkite sprendimą"
              size={fieldSize}
              {...form.getInputProps("solution")}
            >
              <Group mt="xs">
                <Radio value="Namams" label="Namams" />
                <Radio value="Verslui" label="Verslui" />
              </Group>
            </Radio.Group>

            <SimpleGrid
              mt="sm"
              cols={2}
              spacing="md"
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            >
              <TextInput
                required
                label="Vardas / Įmonės pavadinimas"
                labelProps={labelProps}
                placeholder="Security Guru"
                size={fieldSize}
                {...form.getInputProps("name")}
              />
              <TextInput
                required
                label="Miestas"
                labelProps={labelProps}
                placeholder="Miestas"
                size={fieldSize}
                {...form.getInputProps("city")}
              />
              <TextInput
                required
                label="El. paštas"
                labelProps={labelProps}
                placeholder="security.guru@gmail.com"
                size={fieldSize}
                {...form.getInputProps("email")}
              />
              <TextInput
                required
                label="Tel. Nr"
                labelProps={labelProps}
                placeholder="+37061234567"
                size={fieldSize}
                {...form.getInputProps("number")}
              />
            </SimpleGrid>

            <Textarea
              mt="md"
              label="Pastabos"
              labelProps={labelProps}
              placeholder="Pateikite visą svarbią informaciją"
              minRows={3}
              required
              size={fieldSize}
              {...form.getInputProps("message")}
            />

            <Group position="right" mt="xl">
              <Button type="submit" className={classes.button} size={btnSize}>
                Siųsti laišką
              </Button>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}
