import { randomInt, randomUUID } from "node:crypto";

import { AppError } from "@/constants/auth";
import { ForgotPasswordAuthInput, PasswordResetToken } from "@/interfaces/auth";
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
  const derivedKey = require("node:crypto").scryptSync(password, actualSalt, 64);
  return {
    salt: actualSalt,
    hash: `${actualSalt}:${derivedKey.toString("hex")}`,
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

function toAuthAdmin(admin: AuthAdminRecord) {
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
  };
}

export async function authForgotPasswordUseCase(email: string) {
  ensureRequiredAdmin();

  const normalizedEmail = normalizeEmail(email ?? "");

  if (!normalizedEmail) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "auth.forgotPassword.validation",
      code: 400,
    });
  }

  const admin = adminsByEmail.get(normalizedEmail);

  if (!admin) {
    throw new FriendlyError({
      message: AppError.ADMIN_NOT_FOUND,
      context: "auth.forgotPassword.notFound",
      code: 404,
    });
  }

  const token = randomInt(0, 1_000_000).toString().padStart(6, "0");
  const expiresAt = Date.now() + 1000 * 60 * 30;

  admin.resetToken = token;
  admin.resetTokenExpiresAt = expiresAt;
  admin.updatedAt = new Date().toISOString();

  const resetToken: PasswordResetToken = {
    token,
    expiresAt: new Date(expiresAt).toISOString(),
  };

  return {
    admin: toAuthAdmin(admin),
    resetToken,
  };
}

export async function requestPasswordResetToken(input: ForgotPasswordAuthInput) {
  return authForgotPasswordUseCase(input.email);
}