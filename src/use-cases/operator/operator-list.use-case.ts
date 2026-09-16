import { findCompanyById } from "@/repositories/company.repository";
import { listCompanyOperatorsByCompany } from "@/repositories/operator.repository";
import { FriendlyError } from "@/utils";
import { AppError } from "@/constants/operator";

export async function operatorListUseCase(companyId: string) {
  const company = await findCompanyById(companyId);

  if (!company || company.status === "DELETED") {
    throw new FriendlyError({
      message: AppError.COMPANY_NOT_FOUND,
      context: "operator.list.companyNotFound",
      code: 404,
    });
  }

  return listCompanyOperatorsByCompany(companyId);
}
