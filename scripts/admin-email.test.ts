import assert from "node:assert/strict";
import { mock } from "node:test";

import sgMail from "@sendgrid/mail";
import { sendAdminWelcomeEmail } from "../src/services/email.service";

const sendMock = mock.fn(async () => ({ statusCode: 202 }));

mock.method(sgMail, "setApiKey", () => undefined);
mock.method(sgMail, "send", sendMock);

process.env.SENDGRID_API_KEY = "test-key";
process.env.SENDGRID_FROM_EMAIL = "noreply@credits.com.br";

const test = async () => {
  await sendAdminWelcomeEmail({
    email: "matheus@example.com",
    name: "Matheus",
    temporaryPassword: "1234567890",
    loginUrl: "https://credits.example.com/login",
  });

  assert.equal(sendMock.mock.calls.length, 1);
  const payload = sendMock.mock.calls[0].arguments[0];

  assert.equal(payload.to, "matheus@example.com");
  assert.equal(payload.from, "noreply@credits.com.br");
  assert.equal(payload.templateId, "d-6a5b698a089145fba2721351e8ec0f03");
  assert.equal(payload.dynamicTemplateData.email, "matheus@example.com");
  assert.equal(payload.dynamicTemplateData.temporaryPassword, "1234567890");
  assert.equal(payload.dynamicTemplateData.loginUrl, "https://credits.example.com/login");
  assert.equal(typeof payload.dynamicTemplateData.year, "number");

  console.log("admin welcome email test passed");
};

test().catch((error) => {
  console.error(error);
  process.exit(1);
});
