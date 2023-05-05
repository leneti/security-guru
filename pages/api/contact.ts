import type { NextApiRequest, NextApiResponse } from "next";
import { SES } from "@aws-sdk/client-ses";
import { PhoneNumberUtil } from "google-libphonenumber";
import { ContactForm } from "@site/components/GetInTouch";
import { ERROR_MESSAGES } from "@site/constants/error-messages";
import { emailRegex } from "@site/constants/regexes";
import logger from "@site/utils/logger";

const phoneUtil = PhoneNumberUtil.getInstance();

let sentEmailCounter = 0;
const maxSentEmails = Number(process.env.REACT_APP_MAX_EMAILS ?? 200);
const resetTime = Number(
  process.env.REACT_APP_RESET_TIME ?? 1000 * 60 * 60 * 24
);
setInterval(() => {
  sentEmailCounter = 0;
}, resetTime);

type ResponseData = {
  message: string;
  err?: any;
};

const badContactForm = (obj: any): string => {
  if (!("solution" in obj)) {
    return ERROR_MESSAGES.WRONG_SOLUTION;
  }

  if (!("name" in obj)) {
    return ERROR_MESSAGES.NO_NAME;
  }

  if (!("email" in obj)) {
    return ERROR_MESSAGES.NO_EMAIL;
  }

  if (!("city" in obj)) {
    return ERROR_MESSAGES.NO_CITY;
  }

  if (!("number" in obj)) {
    return ERROR_MESSAGES.NO_NUMBER;
  }

  if (!("message" in obj)) {
    return ERROR_MESSAGES.NO_MESSAGE;
  }

  const { solution, email, number } = obj as ContactForm;

  if (!/^(Namams|Verslui)$/.test(solution)) {
    return ERROR_MESSAGES.WRONG_SOLUTION;
  }

  if (!emailRegex.test(email)) {
    return ERROR_MESSAGES.INCORRECT_EMAIL;
  }

  if (!phoneUtil.isValidNumber(phoneUtil.parse(number, "LT"))) {
    return ERROR_MESSAGES.INCORRECT_NUMBER;
  }

  return "";
};

const htmlTemplate = (data: ContactForm) => {
  const { name, city, number, email, solution, message } = data;

  return `
  <p><strong>Sprendimas:</strong> ${solution}</p>
  <p><strong>Vardas:</strong> ${name}</p>
  <p><strong>El. paštas:</strong> <a href="mailto:${email}">${email}</a></p>
  <p><strong>Miestas:</strong> <a href="https://www.google.com/maps/search/?api=1&query=${city}">${city}</a></p>
  <p><strong>Tel. nr:</strong> <a href="tel:${number}">${number}</a></p>
  <p><strong>Pastabos:</strong> ${message}</p>
  `;
};

const sendMail = (sender: string, receivers: string[], data: ContactForm) => {
  const { name, city } = data;

  const params = {
    Destination: {
      ToAddresses: receivers,
    },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: `Kliento užklausa - ${name} - ${city}`,
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlTemplate(data),
        },
      },
    },
    Source: sender,
  };

  let credentials;

  if (
    process.env.REACT_APP_ACCESS_KEY &&
    process.env.REACT_APP_SECRET_ACCESS_KEY
  ) {
    credentials = {
      accessKeyId: process.env.REACT_APP_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    };
  }

  return new SES({ region: "eu-west-2", credentials }).sendEmail(params);
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res
      .status(403)
      .send({ message: "Serveris priima tik susisiekimo formą." });
  }

  if (!process.env.REACT_APP_SES_EMAIL) {
    return res
      .status(500)
      .send({ message: "Serveris neturi prieigos prie el. pašto paslaugų." });
  }

  if (sentEmailCounter >= maxSentEmails) {
    logger.warn(
      `Couldn't send email. Sent today: ${sentEmailCounter}/${maxSentEmails}`
    );

    return res.status(500).send({
      message:
        "Serveris šiuo metu negali atlikti veiksmų. Parašykite mums tiesiogiai į info@securityguru.lt",
    });
  }

  const reason = badContactForm(req.body);

  if (reason) {
    return res.status(400).send({
      message: `Netinkamai užpildyta forma. ${reason}`,
    });
  }

  return sendMail(
    process.env.REACT_APP_SES_EMAIL,
    [process.env.REACT_APP_SES_EMAIL],
    req.body
  )
    .then(() => {
      sentEmailCounter++;

      logger.info(`Sent emails today: ${sentEmailCounter}/${maxSentEmails}`);

      res.status(200).json({
        message: "Sėkmingai išsiuntėme laišką Security Guru komandai!",
      });
    })
    .catch((err) => {
      logger.error("Couldn't send email.", err);

      res.status(502).send({
        message: "Laiško išsiųsti nepavyko. Bandykite dar kartą vėliau.",
        err,
      });
    });
}
