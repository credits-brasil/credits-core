import { randomUUID, timingSafeEqual, scryptSync } from "node:crypto";

import { AppError } from "@/constants/auth";
import { LoginUserAuthInput } from "@/interfaces/auth";
import { findUserByEmail } from "@/repositories/user.repository";
import { listCompaniesByUser } from "@/repositories/company.repository";
import { FriendlyError } from "@/utils";

function verifyPassword(password: string, storedHash: string) {
  const [salt, hash, extra] = storedHash.split(":");
  if (!salt || !hash || extra !== undefined || !/^[a-f0-9]{128}$/i.test(hash)) {
    return false;
  }
  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(password, salt, 64);
  return timingSafeEqual(expected, actual);
}

function toAuthUser(user: {
  id: string;
  name: string;
  cpf: string;
  email?: string | null;
  phone?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}) {
  return {
    id: user.id,
    name: user.name,
    cpf: user.cpf,
    email: user.email ?? "",
    phone: user.phone ?? "",
    createdAt: new Date(user.createdAt).toISOString(),
    updatedAt: new Date(user.updatedAt).toISOString(),
  };
}

async function createSession(user: {
  id: string;
  name: string;
  cpf: string;
  email?: string | null;
  phone?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}) {
  const companies = await listCompaniesByUser(user.id);

  return {
    accessToken: `user_auth_${randomUUID()}`,
    user: {
      ...toAuthUser(user),
      companies: companies.map((company) => ({
        id: company.id,
        name: company.name,
        cnpj: company.cnpj,
        role: company.role,
        companyStatus: company.companyStatus,
      })),
    },
  };
}

export async function authUserLoginUseCase(email: string, password: string) {
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const normalizedPassword = typeof password === "string" ? password : "";

  if (!normalizedEmail || !normalizedPassword) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "auth.user.login.validation",
      code: 400,
    });
  }

  const user = await findUserByEmail(normalizedEmail);

  if (!user || !verifyPassword(normalizedPassword, user.password)) {
    throw new FriendlyError({
      message: AppError.INVALID_CREDENTIALS,
      context: "auth.user.login.credentials",
      code: 401,
    });
  }

  if (user.firstAccess) {
    throw new FriendlyError({
      message: "Primeiro acesso: altere sua senha para continuar.",
      context: "auth.user.login.firstAccess",
      code: 403,
    });
  }

  return createSession(user);
}

export async function loginAuthUser(input: LoginUserAuthInput) {
  return authUserLoginUseCase(input.email, input.password);
}
