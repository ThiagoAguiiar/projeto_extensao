import nodemailer from "nodemailer";
import status from "./status.js";

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  password: process.env.SMTP_PASSWORD,
};

const smtpTransport = nodemailer.createTransport({
  tls: { rejectUnauthorized: false },
  host: smtpConfig.host,
  port: smtpConfig.port,
  secure: false,
  auth: {
    user: smtpConfig.user,
    pass: smtpConfig.password,
  },
});

// Envia Emails
export default async function sendEmail(to, subject, text) {
  try {
    console.log(smtpTransport);

    const result = await smtpTransport.sendMail({
      from: smtpConfig.user,
      to: to,
      subject: subject,
      text: text,
    });

    if (result.accepted.length > 0) {
      return {
        status: 200,
        message: "Email enviado com sucesso",
      };
    }

    return {
      status: 500,
      message: "Erro ao enviar email",
    };
  } catch (err) {
    throw err;
  }
}
