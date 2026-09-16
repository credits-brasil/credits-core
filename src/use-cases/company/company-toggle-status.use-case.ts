import { AppError } from "@/constants/company";
import { CompanyStatus } from "@/generated/prisma/enums";
import { findCompanyById, updateCompany } from "@/repositories/company.repository";
import { FriendlyError } from "@/utils";

export async function companyToggleStatusUseCase(id: string) {
  const company = await findCompanyById(id);

  if (!company || company.status === "DELETED") {
    throw new FriendlyError({
      message: AppError.COMPANY_NOT_FOUND,
      context: "company.toggleStatus.notFound",
      code: 404,
    });
  }

  const nextStatus =
    company.status === CompanyStatus.ACTIVE ? CompanyStatus.INACTIVE : CompanyStatus.ACTIVE;

  return updateCompany(id, { status: nextStatus });
}
