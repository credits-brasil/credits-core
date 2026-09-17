import { randomInt } from "node:crypto";

import { AppError } from "@/constants/auth";
import { findUserByEmail } from "@/repositories/user.repository";
import { prisma } from "@/repositories/prisma";
import { sendPasswordResetCode } from "@/services/email.service";
import { FriendlyError, hashPassword } from "@/utils";

const RESET_CODE_EXPIRATION_MINUTES = 2;

export async function authUserForgotPasswordUseCase(email: string) {
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!normalizedEmail) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "auth.user.forgotPassword.validation",
      code: 400,
    });
  }

  const user = await findUserByEmail(normalizedEmail);

  if (!user) {
    throw new FriendlyError({
      message: AppError.USER_NOT_FOUND,
      context: "auth.user.forgotPassword.notFound",
      code: 404,
    });
  }

  const token = randomInt(0, 1_000_000).toString().padStart(6, "0");
  const expiresAt = Date.now() + 1000 * 60 * RESET_CODE_EXPIRATION_MINUTES;

  await sendPasswordResetCode({
    email: user.email ?? normalizedEmail,
    userName: user.name,
    verificationCode: token,
    expirationMinutes: RESET_CODE_EXPIRATION_MINUTES,
  });

  await prisma.passwordResetCode.updateMany({
    where: { userId: user.id, usedAt: null },
    data: { usedAt: new Date() },
  });

  await prisma.passwordResetCode.create({
    data: {
      userId: user.id,
      code: token,
      expiresAt: new Date(expiresAt),
    },
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}

export async function verifyUserPasswordResetCode(email: string, code: string) {
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const normalizedCode = typeof code === "string" ? code.trim() : "";
  const user = await findUserByEmail(normalizedEmail);
  const record = user
    ? await prisma.passwordResetCode.findFirst({
        where: { userId: user.id, usedAt: null },
        orderBy: { createdAt: "desc" },
      })
    : null;

  if (record?.expiresAt && record.expiresAt.getTime() < Date.now()) {
    await prisma.passwordResetCode.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    });

    throw new FriendlyError({
      message: AppError.RESET_TOKEN_EXPIRED,
      context: "auth.user.verifyResetCode.expiredCode",
      code: 410,
    });
  }

  if (
    !record ||
    !/^\d{6}$/.test(normalizedCode) ||
    record.code !== normalizedCode
  ) {
    throw new FriendlyError({
      message: AppError.RESET_TOKEN_INVALID,
      context: "auth.user.verifyResetCode.invalidCode",
      code: 400,
    });
  }

  return { valid: true };
}

export async function resetUserPassword(
  email: string,
  code: string,
  newPassword: string,
) {
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const normalizedCode = typeof code === "string" ? code.trim() : "";
  const normalizedPassword = typeof newPassword === "string" ? newPassword : "";
  const user = await findUserByEmail(normalizedEmail);

  if (!user || normalizedPassword.length < 8) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "auth.user.resetPassword.validation",
      code: 400,
    });
  }

  const record = await prisma.passwordResetCode.findFirst({
    where: { userId: user.id, usedAt: null },
    orderBy: { createdAt: "desc" },
  });

  if (record?.expiresAt && record.expiresAt.getTime() < Date.now()) {
    await prisma.passwordResetCode.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    });

    throw new FriendlyError({
      message: AppError.RESET_TOKEN_EXPIRED,
      context: "auth.user.resetPassword.expiredCode",
      code: 410,
    });
  }

  if (!record || !/^\d{6}$/.test(normalizedCode) || record.code !== normalizedCode) {
    throw new FriendlyError({
      message: AppError.RESET_TOKEN_INVALID,
      context: "auth.user.resetPassword.invalidCode",
      code: 400,
    });
  }

  await prisma.$transaction(async (transaction) => {
    const consumed = await transaction.passwordResetCode.updateMany({
      where: { id: record.id, usedAt: null },
      data: { usedAt: new Date() },
    });

    if (consumed.count !== 1) {
      throw new FriendlyError({
        message: AppError.RESET_TOKEN_INVALID,
        context: "auth.user.resetPassword.alreadyUsed",
        code: 400,
      });
    }

    await transaction.user.update({
      where: { id: user.id },
      data: { password: hashPassword(normalizedPassword) },
    });
  });

  return { success: true };
}
