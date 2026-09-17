import { createHash } from "node:crypto";

import { AppError } from "@/constants/auth";
import { ResetPasswordAuthInput } from "@/interfaces/auth";
import { findAdminByEmail } from "@/repositories/admin.repository";
import { prisma } from "@/repositories/prisma";
import { FriendlyError, hashPassword } from "@/utils";

export async function authResetPasswordUseCase(email: string, token: string, newPassword: string) {
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const normalizedToken = typeof token === "string" ? token.trim() : "";
  if (!normalizedEmail || !normalizedToken || typeof newPassword !== "string" || newPassword.length < 8) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD, context: "auth.resetPassword.validation", code: 400,
    });
  }

  const invalid = () => new FriendlyError({
    message: AppError.RESET_TOKEN_INVALID, context: "auth.resetPassword.invalidToken", code: 400,
  });
  const admin = await findAdminByEmail(normalizedEmail);
  if (!admin || admin.status !== "ACTIVE") throw invalid();

  const password = hashPassword(newPassword);
  return prisma.$transaction(async (transaction) => {
    const record = await transaction.passwordResetCode.findFirst({
      where: {
        adminId: admin.id,
        target: "ADMIN",
        resetToken: normalizedToken,
        usedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });

    if (!record || !record.resetTokenExpiresAt || record.resetTokenExpiresAt.getTime() <= Date.now()) {
      throw invalid();
    }

    const consumed = await transaction.passwordResetCode.updateMany({
      where: { id: record.id, usedAt: null },
      data: { usedAt: new Date() },
    });

    if (consumed.count !== 1) throw invalid();

    return transaction.admin.update({
      where: { id: admin.id, status: "ACTIVE" },
      data: { password },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });
  });
}

export async function resetPassword(input: ResetPasswordAuthInput) {
  return authResetPasswordUseCase(input.email, input.token, input.newPassword);
}
