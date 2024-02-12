import { SES } from "@aws-sdk/client-ses";
import { PhoneNumberUtil } from "google-libphonenumber";
import type { ContactForm } from "@site/app/susisiekite/GetInTouch";
import { ErrorMessages } from "@site/constants/error-messages";
import { emailRegex } from "@site/constants/regexes";
import logger from "@site/utils/logger";

const phoneUtil = PhoneNumberUtil.getInstance();

let sentEmailCounter = 0;
const maxSentEmails = Number(process.env.REACT_APP_MAX_EMAILS ?? 200);
const resetTime = Number(
  process.env.REACT_APP_RESET_TIME ?? 1000 * 60 * 60 * 24,
);
setInterval(() => {
  sentEmailCounter = 0;
}, resetTime);

export type ResponseData = {
  message: string;
  err?: any;
};

const badContactForm = (obj: any): string => {
  if (!("solution" in obj)) {
    return ErrorMessages.WRONG_SOLUTION;
  }

  if (!("name" in obj)) {
    return ErrorMessages.NO_NAME;
  }

  if (!("email" in obj)) {
    return ErrorMessages.NO_EMAIL;
  }

  if (!("city" in obj)) {
    return ErrorMessages.NO_CITY;
  }

  if (!("number" in obj)) {
    return ErrorMessages.NO_NUMBER;
  }

  if (!("message" in obj)) {
    return ErrorMessages.NO_MESSAGE;
  }

  const { solution, email, number } = obj as ContactForm;

  if (!/^(Namams|Verslui)$/.test(solution)) {
    return ErrorMessages.WRONG_SOLUTION;
  }

  if (!emailRegex.test(email)) {
    return ErrorMessages.INCORRECT_EMAIL;
  }

  try {
    if (!phoneUtil.isValidNumber(phoneUtil.parse(number, "LT"))) {
      return ErrorMessages.INCORRECT_NUMBER;
    }
  } catch (error) {
    return ErrorMessages.INCORRECT_NUMBER;
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

export async function POST({ body }: Request) {
  if (!process.env.REACT_APP_SES_EMAIL) {
    return Response.json(
      { message: "Serveris neturi prieigos prie el. pašto paslaugų." },
      { status: 500 },
    );
  }

  if (sentEmailCounter >= maxSentEmails) {
    logger.warn(
      `Couldn't send email. Sent today: ${sentEmailCounter}/${maxSentEmails}`,
    );

    return Response.json(
      {
        message:
          "Serveris šiuo metu negali atlikti veiksmų. Parašykite mums tiesiogiai į info@securityguru.lt",
      },
      { status: 500 },
    );
  }

  const reason = badContactForm(body);

  if (reason) {
    return Response.json(
      {
        message: `[BAD_CONTACT_FORM] ${reason}`,
      },
      { status: 400 },
    );
  }

  return sendMail(
    process.env.REACT_APP_SES_EMAIL,
    [process.env.REACT_APP_SES_EMAIL],
    body as unknown as ContactForm,
  )
    .then(() => {
      sentEmailCounter++;

      logger.info(`Sent emails today: ${sentEmailCounter}/${maxSentEmails}`);

      return Response.json(undefined, { status: 200 });
    })
    .catch((err) => {
      logger.error("Couldn't send email.", err);

      return Response.json(
        {
          message: "Laiško išsiųsti nepavyko. Bandykite dar kartą vėliau.",
          err,
        },
        { status: 502 },
      );
    });
}
