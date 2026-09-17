import { AppError } from "@/constants/admin";
import { CreateAdminInput } from "@/interfaces/admin";
import { FriendlyError, hashPassword } from "@/utils";
import {
  createAdmin,
  findAdminByEmailOrCpf,
} from "@/repositories/admin.repository";

export async function adminCreateUseCase(input: CreateAdminInput) {
  const name = input.name?.trim();
  const cpf = input.cpf?.trim();
  const email = input.email?.trim().toLowerCase();
  const password = "1234567890";

  if (!name || !cpf || !email) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "admin.create.validation",
      code: 400,
    });
  }

  const existingAdmin = await findAdminByEmailOrCpf(email, cpf);

  if (existingAdmin) {
    throw new FriendlyError({
      message: AppError.ADMIN_ALREADY_EXISTS,
      context: "admin.create.exists",
      code: 409,
    });
  }

  return createAdmin({ name, cpf, email, password: hashPassword(password) });
}
