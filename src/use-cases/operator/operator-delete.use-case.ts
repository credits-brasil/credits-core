import { AppError } from "@/constants/operator";
import { findCompanyById } from "@/repositories/company.repository";
import { findCompanyOperatorById, softDeleteCompanyOperator } from "@/repositories/operator.repository";
import { FriendlyError } from "@/utils";

export async function operatorDeleteUseCase(companyId: string, operatorRelationId: string) {
  const company = await findCompanyById(companyId);

  if (!company || company.status === "DELETED") {
    throw new FriendlyError({
      message: AppError.COMPANY_NOT_FOUND,
      context: "operator.delete.companyNotFound",
      code: 404,
    });
  }

  const relation = await findCompanyOperatorById(operatorRelationId);

  if (!relation || relation.companyId !== companyId) {
    throw new FriendlyError({
      message: AppError.OPERATOR_NOT_FOUND,
      context: "operator.delete.notFound",
      code: 404,
    });
  }

  return softDeleteCompanyOperator(operatorRelationId);
}
