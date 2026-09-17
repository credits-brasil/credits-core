import { AppError } from "@/constants/auth";
import { CreateAuthAdminInput } from "@/interfaces/auth";
import { createAdmin, findAdminByEmail, findAdminByEmailOrCpf } from "@/repositories/admin.repository";
import { FriendlyError, hashPassword } from "@/utils";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function generateCpf() {
  return `${Date.now().toString().slice(-9)}${Math.random().toString().slice(2, 5)}`
    .slice(0, 11)
    .padStart(11, "0");
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

export async function authCreateAdminUseCase(
  name: string,
  email: string,
  password: string,
  cpf?: string,
) {
  const normalizedName = name?.trim();
  const normalizedEmail = normalizeEmail(email ?? "");
  const normalizedPassword = password ?? "";
  const normalizedCpf = (cpf ?? generateCpf()).trim();

  if (!normalizedName || !normalizedEmail || !normalizedPassword) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "auth.createAdmin.validation",
      code: 400,
    });
  }

  const existingAdmin = await findAdminByEmail(normalizedEmail);
  if (existingAdmin) {
    throw new FriendlyError({
      message: AppError.ADMIN_ALREADY_EXISTS,
      context: "auth.createAdmin.exists",
      code: 409,
    });
  }

  const existingCpfAdmin = await findAdminByEmailOrCpf(normalizedEmail, normalizedCpf);
  if (existingCpfAdmin && existingCpfAdmin.email !== normalizedEmail) {
    throw new FriendlyError({
      message: AppError.ADMIN_ALREADY_EXISTS,
      context: "auth.createAdmin.cpfExists",
      code: 409,
    });
  }

  const admin = await createAdmin({
    name: normalizedName,
    cpf: normalizedCpf,
    email: normalizedEmail,
    password: hashPassword(normalizedPassword),
  });

  return toAuthAdmin(admin);
}

export async function createAuthAdmin(input: CreateAuthAdminInput & { cpf?: string }) {
  return authCreateAdminUseCase(input.name, input.email, input.password, input.cpf);
}
