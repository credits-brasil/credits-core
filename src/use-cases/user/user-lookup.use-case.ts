import { findCompanyById } from "@/repositories/company.repository";
import { findCompanyUserByCompanyAndUser, findUserByCpf } from "@/repositories/user.repository";
import { FriendlyError } from "@/utils";

export async function userLookupByCpfUseCase(companyId: string, cpf: string) {
  const company = await findCompanyById(companyId);

  if (!company || company.status === "DELETED") {
    throw new FriendlyError({
      message: "Empresa não encontrada.",
      context: "user.lookup.companyNotFound",
      code: 404,
    });
  }

  const normalizedCpf = cpf.replace(/\D/g, "");
  if (!normalizedCpf) {
    throw new FriendlyError({
      message: "CPF inválido.",
      context: "user.lookup.invalidCpf",
      code: 400,
    });
  }

  const user = await findUserByCpf(normalizedCpf);
  if (!user) {
    return { exists: false, user: null, alreadyLinkedToCompany: false };
  }

  const relation = await findCompanyUserByCompanyAndUser(companyId, user.id);

  return {
    exists: true,
    user,
    alreadyLinkedToCompany: relation?.status === "ACTIVE",
    relation,
  };
}
