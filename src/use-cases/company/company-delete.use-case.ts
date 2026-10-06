import { AppError } from "@/constants/company";
import {
  findCompanyById,
  softDeleteCompany,
} from "@/repositories/company.repository";
import { FriendlyError } from "@/utils";

export async function companyDeleteUseCase(id: string) {
  const company = await findCompanyById(id);

  if (!company || company.status === "DELETED") {
    throw new FriendlyError({
      message: AppError.COMPANY_NOT_FOUND,
      context: "company.delete.notFound",
      code: 404,
    });
  }

  return softDeleteCompany(id);
}
