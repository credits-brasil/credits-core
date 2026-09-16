import { AppError } from "@/constants/user";
import { CreateUserInput } from "@/interfaces/user";
import { FriendlyError, hashPassword } from "@/utils";
import {
  createUser,
  findUserByEmailOrCpf,
} from "@/repositories/user.repository";

export async function userCreateUseCase(input: CreateUserInput) {
  const name = input.name?.trim();
  const cpf = input.cpf?.trim();
  const email = input.email?.trim().toLowerCase();
  const password = "1234567890";

  if (!name || !cpf || !email) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "user.create.validation",
      code: 400,
    });
  }

  const existingUser = await findUserByEmailOrCpf(email, cpf);

  if (existingUser) {
    throw new FriendlyError({
      message: AppError.USER_ALREADY_EXISTS,
      context: "user.create.exists",
      code: 409,
    });
  }

  return createUser({ name, cpf, email, password: hashPassword(password) });
}
