import { randomUUID, scryptSync } from "node:crypto";

import { AppError } from "@/constants/auth";
import { ResetPasswordAuthInput } from "@/interfaces/auth";
import { FriendlyError } from "@/utils";

interface AuthUserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  resetToken?: string;
  resetTokenExpiresAt?: number;
}

const usersByEmail = new Map<string, AuthUserRecord>();
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

function toAuthUser(user: AuthUserRecord) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function ensureRequiredAdminUser() {
  const existingAdmin = usersByEmail.get(REQUIRED_ADMIN_EMAIL);

  if (existingAdmin) {
    return;
  }

  const { hash } = hashPassword(REQUIRED_ADMIN_PASSWORD);
  const now = new Date().toISOString();

  usersByEmail.set(REQUIRED_ADMIN_EMAIL, {
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
  ensureRequiredAdminUser();

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

  const user = usersByEmail.get(normalizedEmail);

  if (
    !user ||
    user.resetToken !== normalizedToken ||
    !user.resetTokenExpiresAt ||
    user.resetTokenExpiresAt < Date.now()
  ) {
    throw new FriendlyError({
      message: AppError.RESET_TOKEN_INVALID,
      context: "auth.resetPassword.invalidToken",
      code: 400,
    });
  }

  const { hash } = hashPassword(normalizedNewPassword);

  user.passwordHash = hash;
  user.resetToken = undefined;
  user.resetTokenExpiresAt = undefined;
  user.updatedAt = new Date().toISOString();

  return toAuthUser(user);
}

export async function resetPassword(input: ResetPasswordAuthInput) {
  return authResetPasswordUseCase(input.email, input.token, input.newPassword);
}