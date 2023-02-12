import type { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";
import { ContactForm } from "@site/components/GetInTouch/GetInTouch";

AWS.config.update({ region: "eu-west-2" });

type Data = {
  name: string;
};

const htmlTemplate = (data: ContactForm) => {
  return `
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>City:</strong> ${data.city}</p>
    <p><strong>Number:</strong> ${data.number}</p>
    <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
    <p><strong>Solution:</strong> ${data.solution}</p>
    <p><strong>Message:</strong> ${data.message}</p>
  `;
};

const sendMail = (sender: string, receivers: string[], data: ContactForm) => {
  const params = {
    Destination: {
      ToAddresses: receivers,
    },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: "Kliento užklausa",
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

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "POST") {
    sendMail("d.gudauskas1@gmail.com", ["d.gudauskas1@gmail.com"], req.body)
      .then(() => res.status(200).json(req.body))
      .catch((reason) => res.status(502).send(reason));
  } else {
    res.status(200).json(req.body);
  }
};
