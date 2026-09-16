import { findCompanyById } from "@/repositories/company.repository";
import { findCompanyOperatorByCompanyAndOperator, findOperatorByCpf } from "@/repositories/operator.repository";
import { FriendlyError } from "@/utils";

export async function operatorLookupByCpfUseCase(companyId: string, cpf: string) {
  const company = await findCompanyById(companyId);

  if (!company || company.status === "DELETED") {
    throw new FriendlyError({
      message: "Empresa não encontrada.",
      context: "operator.lookup.companyNotFound",
      code: 404,
    });
  }

  const normalizedCpf = cpf.replace(/\D/g, "");
  if (!normalizedCpf) {
    throw new FriendlyError({
      message: "CPF inválido.",
      context: "operator.lookup.invalidCpf",
      code: 400,
    });
  }

  const operator = await findOperatorByCpf(normalizedCpf);
  if (!operator) {
    return { exists: false, operator: null, alreadyLinkedToCompany: false };
  }

  const relation = await findCompanyOperatorByCompanyAndOperator(companyId, operator.id);

  return {
    exists: true,
    operator,
    alreadyLinkedToCompany: relation?.status === "ACTIVE",
    relation,
  };
}
