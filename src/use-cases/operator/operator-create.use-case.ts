import { AppError } from "@/constants/operator";
import { findCompanyById } from "@/repositories/company.repository";
import {
  createCompanyOperator,
  createOperator,
  findCompanyOperatorByCompanyAndOperator,
  findOperatorByCpf,
  findOperatorByEmail,
  findOperatorByPhone,
  updateCompanyOperator,
  updateOperator,
} from "@/repositories/operator.repository";
import { FriendlyError } from "@/utils";

export async function operatorCreateUseCase(
  companyId: string,
  input: { user?: string; name: string; cpf: string; email: string; phone: string; password?: string; role?: "ADMIN" | "OPERATOR"; status?: "ACTIVE" | "INACTIVE" },
) {
  const company = await findCompanyById(companyId);

  if (!company || company.status === "DELETED") {
    throw new FriendlyError({
      message: AppError.COMPANY_NOT_FOUND,
      context: "operator.create.companyNotFound",
      code: 404,
    });
  }

  const name = input.name.trim();
  const cpf = input.cpf.trim();
  const normalizedCpf = cpf.replace(/\D/g, "");
  const user = (input.user ?? String(Math.floor(10000000 + Math.random() * 90000000))).trim();
  const email = input.email.trim().toLowerCase();
  const phone = input.phone.trim();
  const password = (input.password?.trim() || normalizedCpf).replace(/\D/g, "");

  if (!name || !cpf || !user || !email || !phone) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "operator.create.invalidPayload",
      code: 400,
    });
  }

  if (!/^\d{8}$/.test(user)) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "operator.create.invalidUserCode",
      code: 400,
    });
  }

  let operator =
    (await findOperatorByEmail(email)) ??
    (await findOperatorByPhone(phone));

  if (operator && (operator.email === email || operator.phone === phone)) {
    throw new FriendlyError({
      message: AppError.OPERATOR_ALREADY_EXISTS,
      context: "operator.create.duplicateIdentity",
      code: 409,
    });
  }

  if (!operator) {
    operator = await createOperator({ user, name, cpf, email, phone, password });
  } else {
    const hasDifferentData =
      name !== operator.name ||
      email !== operator.email ||
      phone !== operator.phone ||
      user !== operator.user ||
      password !== operator.password;

    if (hasDifferentData) {
      operator = await updateOperator(operator.id, {
        user,
        name,
        cpf,
        email,
        phone,
        password,
      });
    }
  }

  if (!operator) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "operator.create.operatorUnavailable",
      code: 500,
    });
  }

  const existingRelation = await findCompanyOperatorByCompanyAndOperator(companyId, operator.id);

  if (existingRelation && existingRelation.status === "ACTIVE") {
    throw new FriendlyError({
      message: AppError.OPERATOR_ALREADY_EXISTS,
      context: "operator.create.alreadyExists",
      code: 409,
    });
  }

  if (existingRelation) {
    return updateCompanyOperator(existingRelation.id, {
      role: input.role ?? existingRelation.role,
      status: input.status ?? "ACTIVE",
    });
  }

  return createCompanyOperator(companyId, operator.id, {
    role: input.role ?? "OPERATOR",
    status: input.status ?? "ACTIVE",
  });
}
