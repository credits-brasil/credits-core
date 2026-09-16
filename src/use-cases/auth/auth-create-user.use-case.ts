import { AppError } from "@/constants/auth";
import { CreateAuthUserInput } from "@/interfaces/auth";
import { createUser, findUserByEmail, findUserByEmailOrCpf } from "@/repositories/user.repository";
import { FriendlyError, hashPassword } from "@/utils";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function generateCpf() {
  return `${Date.now().toString().slice(-9)}${Math.random().toString().slice(2, 5)}`
    .slice(0, 11)
    .padStart(11, "0");
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

export async function authCreateUserUseCase(
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
      context: "auth.createUser.validation",
      code: 400,
    });
  }

  const existingUser = await findUserByEmail(normalizedEmail);
  if (existingUser) {
    throw new FriendlyError({
      message: AppError.USER_ALREADY_EXISTS,
      context: "auth.createUser.exists",
      code: 409,
    });
  }

  const existingCpfUser = await findUserByEmailOrCpf(normalizedEmail, normalizedCpf);
  if (existingCpfUser && existingCpfUser.email !== normalizedEmail) {
    throw new FriendlyError({
      message: AppError.USER_ALREADY_EXISTS,
      context: "auth.createUser.cpfExists",
      code: 409,
    });
  }

  const user = await createUser({
    name: normalizedName,
    cpf: normalizedCpf,
    email: normalizedEmail,
    password: hashPassword(normalizedPassword),
  });

  return toAuthUser(user);
}

export async function createAuthUser(input: CreateAuthUserInput & { cpf?: string }) {
  return authCreateUserUseCase(input.name, input.email, input.password, input.cpf);
}