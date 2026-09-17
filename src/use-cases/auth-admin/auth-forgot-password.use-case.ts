import { randomInt } from "node:crypto";

import { AppError } from "@/constants/auth";
import { ForgotPasswordAuthInput } from "@/interfaces/auth";
import { findAdminByEmail } from "@/repositories/admin.repository";
import { prisma } from "@/repositories/prisma";
import { sendPasswordResetCode } from "@/services/email.service";
import { FriendlyError, hashPassword } from "@/utils";

export async function authForgotPasswordUseCase(email: string) {
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!normalizedEmail) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD, context: "auth.forgotPassword.validation", code: 400,
    });
  }

  const admin = await findAdminByEmail(normalizedEmail);
  if (!admin || admin.status !== "ACTIVE") {
    throw new FriendlyError({
      message: AppError.ADMIN_NOT_FOUND, context: "auth.forgotPassword.notFound", code: 404,
    });
  }

  const code = randomInt(0, 1_000_000).toString().padStart(6, "0");
  await sendPasswordResetCode({
    email: admin.email, userName: admin.name,
    verificationCode: code, expirationMinutes: 2,
  });

  await prisma.passwordResetCode.updateMany({
    where: { adminId: admin.id, usedAt: null },
    data: { usedAt: new Date() },
  });

  await prisma.passwordResetCode.create({
    data: {
      adminId: admin.id,
      userId: null,
      target: "ADMIN",
      code,
      resetToken: null,
      codeExpiresAt: new Date(Date.now() + 2 * 60_000),
      resetTokenExpiresAt: null,
      attempts: 0,
      usedAt: null,
    },
  });

  return { admin: { id: admin.id, name: admin.name, email: admin.email } };
}

export async function requestPasswordResetToken(input: ForgotPasswordAuthInput) {
  return authForgotPasswordUseCase(input.email);
}
