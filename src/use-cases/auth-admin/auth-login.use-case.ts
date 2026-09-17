import { randomUUID, timingSafeEqual, scryptSync } from "node:crypto";

import { AppError } from "@/constants/auth";
import { LoginAuthInput } from "@/interfaces/auth";
import { findAdminByEmail } from "@/repositories/admin.repository";
import { FriendlyError } from "@/utils";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");

  if (!salt || !hash) {
    return false;
  }

  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(password, salt, expected.length);

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function toAuthAdmin(admin: { id: string; name: string; email: string; createdAt: Date | string; updatedAt: Date | string }) {
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    createdAt: new Date(admin.createdAt).toISOString(),
    updatedAt: new Date(admin.updatedAt).toISOString(),
  };
}

function createSession(admin: { id: string; name: string; email: string; createdAt: Date | string; updatedAt: Date | string }) {
  return {
    accessToken: `auth_${randomUUID()}`,
    admin: toAuthAdmin(admin),
  };
}

export async function authLoginUseCase(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email ?? "");
  const normalizedPassword = password ?? "";

  if (!normalizedEmail || !normalizedPassword) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "auth.login.validation",
      code: 400,
    });
  }

  const admin = await findAdminByEmail(normalizedEmail);

  if (!admin || admin.status === "INACTIVE" || admin.status === "DELETED" || !verifyPassword(normalizedPassword, admin.password)) {
    throw new FriendlyError({
      message: AppError.INVALID_CREDENTIALS,
      context: "auth.login.credentials",
      code: 401,
    });
  }

  return createSession(admin);
}

export async function loginAuthAdmin(input: LoginAuthInput) {
  return authLoginUseCase(input.email, input.password);
}
