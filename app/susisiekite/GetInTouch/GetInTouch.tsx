"use client";

import axios from "axios";
import {
  Button,
  Group,
  Paper,
  Radio,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { ContactInfo } from "@site/components/ContactInfo";
import { emailRegex, ErrorMessages, numberRegex } from "@site/constants";
import logger from "@site/utils/logger";
import classes from "./GetInTouch.module.css";
import type { ContactForm } from "./types";

const notificationId = "form-submit";
const labelProps = { style: { marginBottom: "0.25rem" } };

export default function GetInTouch() {
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
        emailRegex.test(value) ? null : ErrorMessages.INCORRECT_EMAIL,
      number: (value) =>
        numberRegex.test(value) ? null : ErrorMessages.INCORRECT_NUMBER,
      name: (value) =>
        /^[^\w\d]+$/.test(value) ? ErrorMessages.INCORRECT_NAME : null,
    },
  });

  const onSubmit = (values: ContactForm) => {
    notifications.show({
      id: notificationId,
      title: "Siunčiama...",
      message: "Siunčiame laišką Security Guru komandai, prašome palaukti.",
      loading: true,
      className: classes.notification,
      autoClose: false,
    });

    axios
      .post("/api/contact", values)
      .then(({ data: { message } }) => {
        notifications.update({
          id: notificationId,
          withCloseButton: true,
          autoClose: 5000,
          title: "Valio!",
          message,
          color: "teal",
          icon: <IconCheck />,
          className: classes.notification,
          loading: false,
        });

        form.reset();
      })
      .catch((err) => {
        logger.error(err);
        let title = "Kažkas nutiko...";
        let message: string =
          err?.response?.data?.message ?? "Bandykite dar kartą vėliau.";

        if (message.startsWith("[BAD_CONTACT_FORM]")) {
          message = message.replace("[BAD_CONTACT_FORM] ", "");
          title = "Netinkamai užpildyta forma";
        }

        notifications.update({
          id: notificationId,
          withCloseButton: true,
          autoClose: 5000,
          title,
          message,
          color: "red",
          icon: <IconX />,
          className: classes.notification,
          loading: false,
        });
      });
  };

  return (
    <Paper shadow="lg" radius="lg" style={{ zIndex: "inherit" }}>
      <div className={classes.wrapper}>
        <div className={classes.contacts}>
          <Text size="lg" className={classes.title}>
            Informacija
          </Text>

          <ContactInfo />
        </div>

        <form className={classes.form} onSubmit={form.onSubmit(onSubmit)}>
          <Text size="lg" className={classes.title}>
            Susisiekite su mumis
          </Text>

          <div className={classes.fields}>
            <Radio.Group
              required
              name="sprendimas"
              label="Pasirinkite sprendimą"
              {...form.getInputProps("solution")}
            >
              <Group mt="xs">
                <Radio
                  value="Namams"
                  label="Namams"
                  variant="outline"
                  size="md"
                  color="orange.4"
                />
                <Radio
                  value="Verslui"
                  label="Verslui"
                  variant="outline"
                  size="md"
                  color="orange.4"
                />
              </Group>
            </Radio.Group>

            <SimpleGrid mt="sm" cols={{ base: 1, sm: 2 }} spacing="md">
              <TextInput
                required
                label="Vardas / Įmonės pavadinimas"
                labelProps={labelProps}
                placeholder="Security Guru"
                className={classes.input}
                size="md"
                type="text"
                {...form.getInputProps("name")}
              />
              <TextInput
                required
                label="Miestas"
                labelProps={labelProps}
                placeholder="Miestas"
                className={classes.input}
                size="md"
                type="text"
                {...form.getInputProps("city")}
              />
              <TextInput
                required
                label="El. paštas"
                labelProps={labelProps}
                placeholder="info@securityguru.lt"
                className={classes.input}
                size="md"
                type="email"
                {...form.getInputProps("email")}
              />
              <TextInput
                required
                label="Tel. Nr"
                labelProps={labelProps}
                placeholder="+37061234567"
                className={classes.input}
                size="md"
                type="tel"
                {...form.getInputProps("number")}
              />
            </SimpleGrid>

            <Textarea
              mt="md"
              label="Pastabos"
              minRows={2}
              autosize
              labelProps={labelProps}
              placeholder="Pateikite visą svarbią informaciją"
              required
              className={classes.input}
              {...form.getInputProps("message")}
            />

            <Group justify="flex-end" mt="xl">
              <Button type="submit" className={classes.button}>
                Siųsti laišką
              </Button>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}
