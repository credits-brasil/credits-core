import { scryptSync, timingSafeEqual } from "node:crypto";

import { AppError } from "@/constants/auth";
import { findAdminByEmail } from "@/repositories/admin.repository";
import { prisma } from "@/repositories/prisma";
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

export async function authFirstAccessPasswordUseCase(
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
      context: "auth.firstAccess.validation",
      code: 400,
    });
  }

  const admin = await findAdminByEmail(normalizedEmail);
  if (!admin || admin.status !== "ACTIVE") {
    throw new FriendlyError({
      message: AppError.ADMIN_NOT_FOUND,
      context: "auth.firstAccess.notFound",
      code: 404,
    });
  }

  if (!verifyPassword(normalizedCurrentPassword, admin.password)) {
    throw new FriendlyError({
      message: AppError.INVALID_CREDENTIALS,
      context: "auth.firstAccess.currentPassword",
      code: 401,
    });
  }

  const updated = await prisma.admin.update({
    where: { id: admin.id },
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
