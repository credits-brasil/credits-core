import { AppError } from "@/constants/user";
import { findCompanyById } from "@/repositories/company.repository";
import {
  findCompanyUserById,
  updateCompanyUser,
  updateUser,
} from "@/repositories/user.repository";
import { FriendlyError } from "@/utils";

export async function userUpdateUseCase(
  companyId: string,
  userRelationId: string,
  input: { name?: string; cpf?: string; email?: string; phone?: string; password?: string; role?: "ADMIN" | "USER"; status?: "ACTIVE" | "INACTIVE" },
) {
  const company = await findCompanyById(companyId);

  if (!company || company.status === "DELETED") {
    throw new FriendlyError({
      message: AppError.COMPANY_NOT_FOUND,
      context: "user.update.companyNotFound",
      code: 404,
    });
  }

  const relation = await findCompanyUserById(userRelationId);

  if (!relation || relation.companyId !== companyId) {
    throw new FriendlyError({
      message: AppError.USER_NOT_FOUND,
      context: "user.update.notFound",
      code: 404,
    });
  }

  if (input.name || input.password || input.email || input.phone || input.cpf) {
    await updateUser(relation.userId, {
      name: input.name?.trim(),
      cpf: input.cpf?.trim(),
      email: input.email?.trim().toLowerCase(),
      phone: input.phone?.trim(),
      password: input.password?.trim(),
    });
  }

  return updateCompanyUser(userRelationId, {
    role: input.role,
    status: input.status,
  });
}
