const nodemailer = require('nodemailer');
const { config } = require('../../config/config');

async function sendMail(info) {
  const transporter = nodemailer.createTransport({
    host: config.mailServer,
    secure: true,
    port: 465,
    auth: {
      user: config.mailUser,
      pass: config.mailPassword,
    },
  });
  await transporter.sendMail(info);
  return;
}

module.exports = { sendMail };
