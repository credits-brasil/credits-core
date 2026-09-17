import { AppError } from "@/constants/company";
import { CreateCompanyInput } from "@/interfaces/company";
import {
  createCompany,
  findCompanyByCnpj,
} from "@/repositories/company.repository";
import { FriendlyError } from "@/utils";

export async function companyCreateUseCase(input: CreateCompanyInput) {
  const cnpj = input.cnpj?.trim();
  const name = input.name?.trim();
  const operator_SPC = input.operator_SPC?.trim();
  const operator_SPC_password = input.operator_SPC_password?.trim();

  if (!cnpj || !name) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "company.create.validation",
      code: 400,
    });
  }

  const existingCompany = await findCompanyByCnpj(cnpj);

  if (existingCompany) {
    throw new FriendlyError({
      message: AppError.COMPANY_ALREADY_EXISTS,
      context: "company.create.exists",
      code: 409,
    });
  }

  return createCompany({
    ...input,
    cnpj,
    name,
    operator_SPC,
    operator_SPC_password,
  });
}
