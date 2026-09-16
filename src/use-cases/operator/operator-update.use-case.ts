import { AppError } from "@/constants/operator";
import { findCompanyById } from "@/repositories/company.repository";
import {
  findCompanyOperatorById,
  updateCompanyOperator,
  updateOperator,
} from "@/repositories/operator.repository";
import { FriendlyError } from "@/utils";

export async function operatorUpdateUseCase(
  companyId: string,
  operatorRelationId: string,
  input: { name?: string; cpf?: string; email?: string; phone?: string; password?: string; role?: "ADMIN" | "OPERATOR"; status?: "ACTIVE" | "INACTIVE" },
) {
  const company = await findCompanyById(companyId);

  if (!company || company.status === "DELETED") {
    throw new FriendlyError({
      message: AppError.COMPANY_NOT_FOUND,
      context: "operator.update.companyNotFound",
      code: 404,
    });
  }

  const relation = await findCompanyOperatorById(operatorRelationId);

  if (!relation || relation.companyId !== companyId) {
    throw new FriendlyError({
      message: AppError.OPERATOR_NOT_FOUND,
      context: "operator.update.notFound",
      code: 404,
    });
  }

  if (input.name || input.password || input.email || input.phone || input.cpf) {
    await updateOperator(relation.operatorId, {
      name: input.name?.trim(),
      cpf: input.cpf?.trim(),
      email: input.email?.trim().toLowerCase(),
      phone: input.phone?.trim(),
      password: input.password?.trim(),
    });
  }

  return updateCompanyOperator(operatorRelationId, {
    role: input.role,
    status: input.status,
  });
}
