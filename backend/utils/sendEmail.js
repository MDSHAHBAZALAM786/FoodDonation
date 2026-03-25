const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
  try {
    await resend.emails.send({
      from: 'Sanjeevani <onboarding@resend.dev>',
      to: options.email,
      subject: options.subject,
      html: `<h2>${options.message}</h2>`
    });

    console.log("✅ Email sent via Resend");

  } catch (error) {
    console.error("❌ Email error:", error);
    throw error;
  }
};

module.exports = sendEmail;