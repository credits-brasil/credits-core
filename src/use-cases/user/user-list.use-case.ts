import { findCompanyById } from "@/repositories/company.repository";
import { listCompanyUsersByCompany } from "@/repositories/user.repository";
import { FriendlyError } from "@/utils";
import { AppError } from "@/constants/user";

export async function userListUseCase(companyId: string) {
  const company = await findCompanyById(companyId);

  if (!company || company.status === "DELETED") {
    throw new FriendlyError({
      message: AppError.COMPANY_NOT_FOUND,
      context: "user.list.companyNotFound",
      code: 404,
    });
  }

  return listCompanyUsersByCompany(companyId);
}
