import { randomUUID } from "node:crypto";

import { AppError } from "@/constants/auth";
import { ForgotPasswordAuthInput, PasswordResetToken } from "@/interfaces/auth";
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
  const derivedKey = require("node:crypto").scryptSync(password, actualSalt, 64);
  return {
    salt: actualSalt,
    hash: `${actualSalt}:${derivedKey.toString("hex")}`,
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

function toAuthUser(user: AuthUserRecord) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function authForgotPasswordUseCase(email: string) {
  ensureRequiredAdminUser();

  const normalizedEmail = normalizeEmail(email ?? "");

  if (!normalizedEmail) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "auth.forgotPassword.validation",
      code: 400,
    });
  }

  const user = usersByEmail.get(normalizedEmail);

  if (!user) {
    throw new FriendlyError({
      message: AppError.USER_NOT_FOUND,
      context: "auth.forgotPassword.notFound",
      code: 404,
    });
  }

  const token = randomUUID();
  const expiresAt = Date.now() + 1000 * 60 * 30;

  user.resetToken = token;
  user.resetTokenExpiresAt = expiresAt;
  user.updatedAt = new Date().toISOString();

  const resetToken: PasswordResetToken = {
    token,
    expiresAt: new Date(expiresAt).toISOString(),
  };

  return {
    user: toAuthUser(user),
    resetToken,
  };
}

export async function requestPasswordResetToken(input: ForgotPasswordAuthInput) {
  return authForgotPasswordUseCase(input.email);
}