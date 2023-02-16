import type { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";
import { ContactForm } from "@components/GetInTouch";

AWS.config.update({ region: "eu-west-2" });

let sentEmailCounter = 0;
const maxSentEmails = 200;

setInterval(() => {
  sentEmailCounter = 0;
}, 1000 * 60 * 60 * 24);

type ResponseData = {
  message: string;
};

const isContactForm = (obj: any) => {
  if (
    !("solution" in obj) ||
    !("name" in obj) ||
    !("email" in obj) ||
    !("city" in obj) ||
    !("number" in obj) ||
    !("message" in obj)
  ) {
    return false;
  }

  if (!/^(Namams|Verslui)$/.test(obj.solution)) {
    return false;
  }

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(obj.email)) {
    return false;
  }

  const numberRegex = /^+?[\d -\(\)~]+/;

  if (!numberRegex.test(obj.number)) {
    return false;
  }

  return true;
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

  return new AWS.SES().sendEmail(params).promise();
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res
      .status(403)
      .send({ message: "Serveris tik priima susisiekimo formą." });
  }

  if (!process.env.SES_EMAIL_DEV) {
    return res
      .status(500)
      .send({ message: "Serveris neturi prieigos prie el. pašto paslaugų." });
  }

  if (sentEmailCounter >= maxSentEmails) {
    return res.status(500).send({
      message:
        "Serveris šiuo metu negali atlikti veiksmų. Bandykite dar kartą rytoj.",
    });
  }

  if (!isContactForm(req.body)) {
    return res.status(400).send({
      message: `Netinkamai užpildyta forma: ${JSON.stringify(req.body)}`,
    });
  }

  return sendMail(
    process.env.SES_EMAIL_DEV,
    [process.env.SES_EMAIL_DEV],
    req.body
  )
    .then(() => {
      sentEmailCounter++;
      res.status(200).json({
        message: "Sėkmingai išsiųstas laiškas Security Guru komandai!",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(502).send({
        message: "Laiško išsiųsti nepavyko. Bandykite dar kartą vėliau.",
      });
    });
}
