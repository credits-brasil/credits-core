import { randomUUID, scryptSync } from "node:crypto";

import { AppError } from "@/constants/auth";
import { ResetPasswordAuthInput } from "@/interfaces/auth";
import { FriendlyError } from "@/utils";

interface AuthAdminRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  resetToken?: string;
  resetTokenExpiresAt?: number;
}

const adminsByEmail = new Map<string, AuthAdminRecord>();
const REQUIRED_ADMIN_EMAIL = "admin@admin.com";
const REQUIRED_ADMIN_NAME = "admin";
const REQUIRED_ADMIN_PASSWORD = "admin";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashPassword(password: string, salt = "") {
  const actualSalt = salt || Math.random().toString(36).slice(2);
  const derivedKey = scryptSync(password, actualSalt, 64);
  return {
    salt: actualSalt,
    hash: `${actualSalt}:${derivedKey.toString("hex")}`,
  };
}

function toAuthAdmin(admin: AuthAdminRecord) {
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
  };
}

function ensureRequiredAdmin() {
  const existingAdmin = adminsByEmail.get(REQUIRED_ADMIN_EMAIL);

  if (existingAdmin) {
    return;
  }

  const { hash } = hashPassword(REQUIRED_ADMIN_PASSWORD);
  const now = new Date().toISOString();

  adminsByEmail.set(REQUIRED_ADMIN_EMAIL, {
    id: randomUUID(),
    name: REQUIRED_ADMIN_NAME,
    email: REQUIRED_ADMIN_EMAIL,
    passwordHash: hash,
    createdAt: now,
    updatedAt: now,
  });
}

export async function authResetPasswordUseCase(
  email: string,
  token: string,
  newPassword: string,
) {
  ensureRequiredAdmin();

  const normalizedEmail = normalizeEmail(email ?? "");
  const normalizedToken = token ?? "";
  const normalizedNewPassword = newPassword ?? "";

  if (!normalizedEmail || !normalizedToken || !normalizedNewPassword) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "auth.resetPassword.validation",
      code: 400,
    });
  }

  const admin = adminsByEmail.get(normalizedEmail);

  if (
    !admin ||
    admin.resetToken !== normalizedToken ||
    !admin.resetTokenExpiresAt ||
    admin.resetTokenExpiresAt < Date.now()
  ) {
    throw new FriendlyError({
      message: AppError.RESET_TOKEN_INVALID,
      context: "auth.resetPassword.invalidToken",
      code: 400,
    });
  }

  const { hash } = hashPassword(normalizedNewPassword);

  admin.passwordHash = hash;
  admin.resetToken = undefined;
  admin.resetTokenExpiresAt = undefined;
  admin.updatedAt = new Date().toISOString();

  return toAuthAdmin(admin);
}

export async function resetPassword(input: ResetPasswordAuthInput) {
  return authResetPasswordUseCase(input.email, input.token, input.newPassword);
}
