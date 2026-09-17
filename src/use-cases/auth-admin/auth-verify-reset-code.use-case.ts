import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

import { AppError } from "@/constants/auth";
import { findAdminByEmail } from "@/repositories/admin.repository";
import { prisma } from "@/repositories/prisma";
import { FriendlyError, hashPassword } from "@/utils";

export async function verifyAdminPasswordResetCode(email: string, code: string) {
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const normalizedCode = typeof code === "string" ? code.trim() : "";
  const invalid = () => new FriendlyError({
    message: AppError.RESET_TOKEN_INVALID, context: "auth.verifyResetCode.invalid", code: 400,
  });
  if (!normalizedEmail || !/^\d{6}$/.test(normalizedCode)) throw invalid();

  const admin = await findAdminByEmail(normalizedEmail);
  if (!admin || admin.status !== "ACTIVE") throw invalid();

  const record = await prisma.passwordResetCode.findFirst({
    where: { adminId: admin.id, usedAt: null, target: "ADMIN" },
    orderBy: { createdAt: "desc" },
  });

  if (!record || record.attempts >= 5) throw invalid();
  if (record.codeExpiresAt.getTime() <= Date.now()) {
    throw new FriendlyError({
      message: AppError.RESET_TOKEN_EXPIRED, context: "auth.verifyResetCode.expired", code: 410,
    });
  }

  if (record.code !== normalizedCode) {
    await prisma.passwordResetCode.updateMany({
      where: { id: record.id, usedAt: null, target: "ADMIN" },
      data: { attempts: { increment: 1 } },
    });
    throw invalid();
  }

  const resetToken = randomBytes(32).toString("base64url");
  const claimed = await prisma.passwordResetCode.updateMany({
    where: {
      id: record.id,
      adminId: admin.id,
      target: "ADMIN",
      usedAt: null,
      attempts: { lt: 5 },
      codeExpiresAt: { gt: new Date() },
    },
    data: {
      resetToken,
      resetTokenExpiresAt: new Date(Date.now() + 10 * 60_000),
      attempts: 0,
    },
  });

  if (claimed.count !== 1) throw invalid();
  return { valid: true, resetToken };
}
