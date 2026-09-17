import { AppError } from "@/constants/company";
import { UpdateCompanyInput } from "@/interfaces/company";
import {
  findCompanyById,
  updateCompany,
} from "@/repositories/company.repository";
import { FriendlyError } from "@/utils";

export async function companyUpdateUseCase(
  id: string,
  input: UpdateCompanyInput,
) {
  const company = await findCompanyById(id);

  if (!company || company.status === "DELETED") {
    throw new FriendlyError({
      message: AppError.COMPANY_NOT_FOUND,
      context: "company.update.notFound",
      code: 404,
    });
  }

  const nextInput = { ...input };

  if (!nextInput.operator_SPC_password || nextInput.operator_SPC_password.trim() === "") {
    nextInput.operator_SPC_password = company.operator_SPC_password ?? undefined;
  }

  return updateCompany(id, {
    ...nextInput,
  });
}
