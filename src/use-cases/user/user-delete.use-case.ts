import { AppError } from "@/constants/user";
import { findCompanyById } from "@/repositories/company.repository";
import { findCompanyUserById, softDeleteCompanyUser } from "@/repositories/user.repository";
import { FriendlyError } from "@/utils";

export async function userDeleteUseCase(companyId: string, userRelationId: string) {
  const company = await findCompanyById(companyId);

  if (!company || company.status === "DELETED") {
    throw new FriendlyError({
      message: AppError.COMPANY_NOT_FOUND,
      context: "user.delete.companyNotFound",
      code: 404,
    });
  }

  const relation = await findCompanyUserById(userRelationId);

  if (!relation || relation.companyId !== companyId) {
    throw new FriendlyError({
      message: AppError.USER_NOT_FOUND,
      context: "user.delete.notFound",
      code: 404,
    });
  }

  return softDeleteCompanyUser(userRelationId);
}
