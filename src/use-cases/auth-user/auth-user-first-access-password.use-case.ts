import { scryptSync, timingSafeEqual } from "node:crypto";

import { AppError } from "@/constants/auth";
import { prisma } from "@/repositories/prisma";
import { findUserByEmail } from "@/repositories/user.repository";
import { FriendlyError, hashPassword } from "@/utils";

function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");

  if (!salt || !hash) {
    return false;
  }

  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(password, salt, expected.length);

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function authUserFirstAccessPasswordUseCase(
  email: string,
  currentPassword: string,
  newPassword: string,
) {
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const normalizedCurrentPassword = typeof currentPassword === "string" ? currentPassword : "";
  const normalizedNewPassword = typeof newPassword === "string" ? newPassword : "";

  if (!normalizedEmail || !normalizedCurrentPassword || !normalizedNewPassword || normalizedNewPassword.length < 8) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "auth.user.firstAccess.validation",
      code: 400,
    });
  }

  const user = await findUserByEmail(normalizedEmail);

  if (!user) {
    throw new FriendlyError({
      message: AppError.USER_NOT_FOUND,
      context: "auth.user.firstAccess.notFound",
      code: 404,
    });
  }

  if (!verifyPassword(normalizedCurrentPassword, user.password)) {
    throw new FriendlyError({
      message: AppError.INVALID_CREDENTIALS,
      context: "auth.user.firstAccess.currentPassword",
      code: 401,
    });
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashPassword(normalizedNewPassword),
      firstAccess: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      firstAccess: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updated;
}
