import { randomUUID, timingSafeEqual, scryptSync } from "node:crypto";

import { AppError } from "@/constants/auth";
import { LoginOperatorAuthInput } from "@/interfaces/auth";
import { findOperatorByCpf } from "@/repositories/operator.repository";
import { listCompaniesByOperator } from "@/repositories/company.repository";
import { FriendlyError, hashPassword } from "@/utils";

function normalizeCpf(cpf: string) {
  return cpf?.trim().replace(/\D/g, "") ?? "";
}

function getPasswordCandidates(password: string) {
  const digits = (password ?? "").replace(/\D/g, "");
  const candidates = new Set<string>([password ?? "", digits]);

  if (digits.length === 11) {
    candidates.add(`${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`);
  }

  return [...candidates].filter(Boolean);
}

function verifyPassword(password: string, storedHash: string) {
  if (!storedHash) {
    return false;
  }

  for (const candidate of getPasswordCandidates(password)) {
    if (storedHash === candidate) {
      return true;
    }

    const [salt, hash] = storedHash.split(":");

    if (!salt || !hash) {
      continue;
    }

    const expected = Buffer.from(hash, "hex");
    const actual = scryptSync(candidate, salt, expected.length);

    if (expected.length === actual.length && timingSafeEqual(expected, actual)) {
      return true;
    }
  }

  return false;
}

function toAuthOperator(operator: {
  id: string;
  name: string;
  cpf: string;
  email?: string | null;
  phone?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}) {
  return {
    id: operator.id,
    name: operator.name,
    cpf: operator.cpf,
    email: operator.email ?? "",
    phone: operator.phone ?? "",
    createdAt: new Date(operator.createdAt).toISOString(),
    updatedAt: new Date(operator.updatedAt).toISOString(),
  };
}

async function createSession(operator: {
  id: string;
  name: string;
  cpf: string;
  email?: string | null;
  phone?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}) {
  const companies = await listCompaniesByOperator(operator.id);

  return {
    accessToken: `operator_auth_${randomUUID()}`,
    operator: {
      ...toAuthOperator(operator),
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

export async function authOperatorLoginUseCase(cpf: string, password: string) {
  const normalizedCpf = normalizeCpf(cpf ?? "");
  const normalizedPassword = (password ?? "").replace(/\D/g, "");

  if (!normalizedCpf || !normalizedPassword) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "auth.operator.login.validation",
      code: 400,
    });
  }

  const operator = await findOperatorByCpf(normalizedCpf);

  if (!operator || !verifyPassword(normalizedPassword, operator.password)) {
    throw new FriendlyError({
      message: AppError.INVALID_CREDENTIALS,
      context: "auth.operator.login.credentials",
      code: 401,
    });
  }

  return createSession(operator);
}

export async function loginOperatorAuthUser(input: LoginOperatorAuthInput) {
  return authOperatorLoginUseCase(input.cpf, input.password);
}
