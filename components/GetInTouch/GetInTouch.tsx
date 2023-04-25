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
import { PhoneNumberUtil } from "google-libphonenumber";
import { IconX, IconCheck } from "@tabler/icons";

import { ContactInfo } from "@components";
import { emailRegex, numberRegex, ERROR_MESSAGES } from "@constants";

export interface ContactForm {
  solution: string;
  name: string;
  email: string;
  city: string;
  number: string;
  message: string;
}

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

export default function GetInTouch() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const phoneUtil = PhoneNumberUtil.getInstance();
  const notificationId = "form-submit";

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
          return numberRegex.test(value) &&
            phoneUtil.isValidNumber(phoneUtil.parse(value, "LT"))
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
        });

        form.reset();
      })
      .catch((err) => {
        notifications.update({
          id: notificationId,
          withCloseButton: true,
          autoClose: 5000,
          title: "Kažkas nutiko...",
          message: err.response?.data?.message ?? "Bandykite dar kartą vėliau.",
          color: "red",
          icon: <IconX />,
        });
      });
  };

  return (
    <Paper shadow="lg" radius="lg">
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
              size={smallScreen ? "md" : "sm"}
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
                placeholder="Security Guru"
                size={smallScreen ? "md" : "sm"}
                {...form.getInputProps("name")}
              />
              <TextInput
                required
                label="Miestas"
                placeholder="Miestas"
                size={smallScreen ? "md" : "sm"}
                {...form.getInputProps("city")}
              />
              <TextInput
                required
                label="El. paštas"
                placeholder="security.guru@gmail.com"
                size={smallScreen ? "md" : "sm"}
                {...form.getInputProps("email")}
              />
              <TextInput
                required
                label="Tel. Nr"
                placeholder="+37061234567"
                size={smallScreen ? "md" : "sm"}
                {...form.getInputProps("number")}
              />
            </SimpleGrid>

            <Textarea
              mt="md"
              label="Pastabos"
              placeholder="Pateikite visą svarbią informaciją"
              minRows={3}
              required
              size={smallScreen ? "md" : "sm"}
              {...form.getInputProps("message")}
            />

            <Group position="right" mt="xl">
              <Button
                type="submit"
                className={classes.button}
                size={smallScreen ? "md" : "sm"}
              >
                Siųsti laišką
              </Button>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}
