import sgMail from "@sendgrid/mail";

const PASSWORD_RESET_TEMPLATE_ID = "d-ac26e43697384e2d92d19842a990f153";
const ADMIN_WELCOME_TEMPLATE_ID = "d-6a5b698a089145fba2721351e8ec0f03";

interface PasswordResetCodeInput {
  email: string;
  userName: string;
  verificationCode: string;
  expirationMinutes: number;
}

interface AdminWelcomeEmailInput {
  email: string;
  name?: string;
  temporaryPassword: string;
  loginUrl?: string;
}

function getSendGridConfig() {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    throw new Error("SendGrid não está configurado.");
  }

  return { apiKey, fromEmail };
}

export async function sendPasswordResetCode(input: PasswordResetCodeInput) {
  const { apiKey, fromEmail } = getSendGridConfig();

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

export async function sendAdminWelcomeEmail(input: AdminWelcomeEmailInput) {
  const { apiKey, fromEmail } = getSendGridConfig();
  const loginUrl =
    input.loginUrl ||
    `${process.env.FRONTEND_URL || "https://creditsbrasil.com.br".replace(/\/$/, "")}/`;

  sgMail.setApiKey(apiKey);

  await sgMail.send({
    to: input.email,
    from: fromEmail,
    templateId: ADMIN_WELCOME_TEMPLATE_ID,
    dynamicTemplateData: {
      email: input.email,
      name: input.name || "",
      temporaryPassword: input.temporaryPassword,
      loginUrl,
      year: new Date().getFullYear(),
    },
  });
}