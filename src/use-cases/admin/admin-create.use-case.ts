import { AppError } from "@/constants/admin";
import { CreateAdminInput } from "@/interfaces/admin";
import { FriendlyError, hashPassword } from "@/utils";
import {
  createAdmin,
  findAdminByEmailOrCpf,
} from "@/repositories/admin.repository";
import { sendAdminWelcomeEmail } from "@/services/email.service";

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

  const admin = await createAdmin({
    name,
    cpf,
    email,
    password: hashPassword(password),
    firstAccess: true,
  });

  try {
    await sendAdminWelcomeEmail({
      email: admin.email,
      name: admin.name,
      temporaryPassword: password,
      loginUrl: process.env.FRONTEND_URL || "https://credits-platform-manager.vercel.app",
    });
  } catch (error) {
    console.error("Failed to send admin welcome email", error);
  }

  return admin;
}
