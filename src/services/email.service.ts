import sgMail from "@sendgrid/mail";

const PASSWORD_RESET_TEMPLATE_ID = "d-ac26e43697384e2d92d19842a990f153";

interface PasswordResetCodeInput {
  email: string;
  userName: string;
  verificationCode: string;
  expirationMinutes: number;
}

export async function sendPasswordResetCode(input: PasswordResetCodeInput) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    throw new Error("SendGrid não está configurado.");
  }

  sgMail.setApiKey(apiKey);

  await sgMail.send({
    to: input.email,
    from: fromEmail,
    templateId: PASSWORD_RESET_TEMPLATE_ID,
    dynamicTemplateData: {
      userName: input.userName,
      verificationCode: input.verificationCode,
      expirationMinutes: input.expirationMinutes,
      year: new Date().getFullYear(),
    },
  });
}