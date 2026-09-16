import { randomUUID, timingSafeEqual, scryptSync } from "node:crypto";

import { AppError } from "@/constants/auth";
import { LoginAuthInput } from "@/interfaces/auth";
import { findUserByEmail } from "@/repositories/user.repository";
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

function toAuthUser(user: { id: string; name: string; email: string; createdAt: Date | string; updatedAt: Date | string }) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toISOString(),
    updatedAt: new Date(user.updatedAt).toISOString(),
  };
}

function createSession(user: { id: string; name: string; email: string; createdAt: Date | string; updatedAt: Date | string }) {
  return {
    accessToken: `auth_${randomUUID()}`,
    user: toAuthUser(user),
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

  const user = await findUserByEmail(normalizedEmail);

  if (!user || user.status === "INACTIVE" || user.status === "DELETED" || !verifyPassword(normalizedPassword, user.password)) {
    throw new FriendlyError({
      message: AppError.INVALID_CREDENTIALS,
      context: "auth.login.credentials",
      code: 401,
    });
  }

  return createSession(user);
}

export async function loginAuthUser(input: LoginAuthInput) {
  return authLoginUseCase(input.email, input.password);
}