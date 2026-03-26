const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Sanjeevani" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: `<h2>${options.message}</h2>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent via Nodemailer");

  } catch (error) {
    console.error("❌ Email error:", error);
    throw error;
  }
};

module.exports = sendEmail;