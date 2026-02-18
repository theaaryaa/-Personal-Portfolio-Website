const nodemailer = require("nodemailer");
const { env } = require("../config/env");

function canSendEmail() {
  return Boolean(env.emailUser && env.emailPass && env.contactRecipient);
}

function getTransporter() {
  return nodemailer.createTransport({
    host: env.emailHost,
    port: env.emailPort,
    secure: env.emailPort === 465,
    auth: {
      user: env.emailUser,
      pass: env.emailPass
    }
  });
}

async function sendContactNotification({ name, email, message }) {
  if (!canSendEmail()) {
    return { skipped: true };
  }

  const transporter = getTransporter();

  await transporter.sendMail({
    from: env.emailUser,
    to: env.contactRecipient,
    replyTo: email,
    subject: `Portfolio Contact: ${name}`,
    text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  });

  return { skipped: false };
}

module.exports = { sendContactNotification, canSendEmail };
