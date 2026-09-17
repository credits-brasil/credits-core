import { randomBytes, randomInt, scryptSync, timingSafeEqual } from "node:crypto";

import { AppError } from "@/constants/auth";
import { findUserByEmail } from "@/repositories/user.repository";
import { prisma } from "@/repositories/prisma";
import { sendPasswordResetCode } from "@/services/email.service";
import { FriendlyError } from "@/utils";

const RESET_CODE_EXPIRATION_MINUTES = 2;

function hashResetCode(code: string, salt = randomBytes(16).toString("hex")) {
  return `${salt}:${scryptSync(code, salt, 64).toString("hex")}`;
}

function matchesResetCode(code: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");

  if (!salt || !hash || !/^[a-f0-9]{128}$/i.test(hash)) {
    return false;
  }

  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(code, salt, 64);

  return timingSafeEqual(expected, actual);
}

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
      codeHash: hashResetCode(token),
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
    !matchesResetCode(normalizedCode, record.codeHash)
  ) {
    throw new FriendlyError({
      message: AppError.RESET_TOKEN_INVALID,
      context: "auth.user.verifyResetCode.invalidCode",
      code: 400,
    });
  }

  const consumed = await prisma.passwordResetCode.updateMany({
    where: { id: record.id, usedAt: null },
    data: { usedAt: new Date() },
  });

  if (consumed.count !== 1) {
    throw new FriendlyError({
      message: AppError.RESET_TOKEN_INVALID,
      context: "auth.user.verifyResetCode.alreadyUsed",
      code: 400,
    });
  }

  return { valid: true };
}
