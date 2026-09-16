import { AppError } from "@/constants/company";
import { UpdateCompanyInput } from "@/interfaces/company";
import {
  findCompanyById,
  updateCompany,
} from "@/repositories/company.repository";
import { FriendlyError } from "@/utils";

function normalizeDateInput(value?: string | Date | null) {
  if (!value) {
    return undefined;
  }

  if (value instanceof Date) {
    return value;
  }

  return new Date(value.includes("T") ? value : `${value}T00:00:00.000Z`);
}

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
    tasting_start_date: normalizeDateInput(input.tasting_start_date),
    tasting_end_date: normalizeDateInput(input.tasting_end_date),
  });
}
