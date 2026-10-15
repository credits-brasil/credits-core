import { AppError } from "@/constants/user";
import { findCompanyById } from "@/repositories/company.repository";
import {
  createCompanyUser,
  createUser,
  findCompanyUserByCompanyAndUser,
  findUserByCpf,
  findUserByEmail,
  findUserByPhone,
  updateCompanyUser,
  updateUser,
} from "@/repositories/user.repository";
import { sendUserWelcomeEmail } from "@/services/email.service";
import { FriendlyError } from "@/utils";

const normalizeUserRole = (role?: "ADMIN" | "USER" | "OPERATOR") => {
  if (role === "OPERATOR") {
    return "USER" as const;
  }

  return (role ?? "USER") as "ADMIN" | "USER";
};

export const getDuplicateUserErrorMessage = ({
  email,
  phone,
  user,
}: {
  email?: string;
  phone?: string;
  user?: { email?: string | null; phone?: string | null } | null;
}) => {
  const normalizedEmail = email?.trim().toLowerCase() ?? "";
  const normalizedPhone = phone?.trim() ?? "";

  const emailMatches = Boolean(normalizedEmail) && Boolean(user?.email) && user!.email!.trim().toLowerCase() === normalizedEmail;
  const phoneMatches = Boolean(normalizedPhone) && Boolean(user?.phone) && user!.phone!.trim() === normalizedPhone;

  if (emailMatches && phoneMatches) {
    return AppError.USER_EMAIL_AND_PHONE_ALREADY_EXISTS;
  }

  if (emailMatches) {
    return AppError.USER_EMAIL_ALREADY_EXISTS;
  }

  if (phoneMatches) {
    return AppError.USER_PHONE_ALREADY_EXISTS;
  }

  return AppError.USER_ALREADY_EXISTS;
};

export async function userCreateUseCase(
  companyId: string,
  input: { user?: string; name: string; cpf: string; email?: string; phone: string; role?: "ADMIN" | "USER" | "OPERATOR"; status?: "ACTIVE" | "INACTIVE" },
) {
  const company = await findCompanyById(companyId);
  const normalizedRole = normalizeUserRole(input.role);

  if (!company || company.status === "DELETED") {
    throw new FriendlyError({
      message: AppError.COMPANY_NOT_FOUND,
      context: "user.create.companyNotFound",
      code: 404,
    });
  }

  const name = input.name.trim();
  const cpf = input.cpf.trim();
  const normalizedCpf = cpf.replace(/\D/g, "");
  const userCode = input.user?.trim() || "";
  const email = input.email?.trim().toLowerCase() || "";
  const phone = input.phone.trim();
  const password = String(
    Math.floor(10000000 + Math.random() * 90000000),
  );

  if (!name || !cpf || !phone || (Boolean(userCode) === Boolean(email))) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "user.create.invalidPayload",
      code: 400,
    });
  }

  if (userCode && !/^\d{8}$/.test(userCode)) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "user.create.invalidUserCode",
      code: 400,
    });
  }

  let user =
    (email ? await findUserByEmail(email) : undefined) ??
    (await findUserByPhone(phone));

  const duplicateUserMessage = getDuplicateUserErrorMessage({ email, phone, user });

  if (user && duplicateUserMessage !== AppError.USER_ALREADY_EXISTS) {
    throw new FriendlyError({
      message: duplicateUserMessage,
      context: "user.create.duplicateIdentity",
      code: 409,
    });
  }

  if (!user) {
    user = await createUser({ user: userCode || null, name, cpf, email: email || null, phone, password });
  } else {
    const hasDifferentData =
      name !== user.name ||
      email !== user.email ||
      phone !== user.phone ||
      userCode !== user.user ||
      password !== user.password;

    if (hasDifferentData) {
      user = await updateUser(user.id, {
        user: userCode,
        name,
        cpf,
        email,
        phone,
        password,
      });
    }
  }

  if (!user) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "user.create.userUnavailable",
      code: 500,
    });
  }

  const existingRelation = await findCompanyUserByCompanyAndUser(companyId, user.id);

  if (existingRelation && existingRelation.status === "ACTIVE") {
    throw new FriendlyError({
      message: AppError.USER_ALREADY_EXISTS,
      context: "user.create.alreadyExists",
      code: 409,
    });
  }

  if (existingRelation) {
    const companyUser = await updateCompanyUser(existingRelation.id, {
      role: normalizeUserRole(input.role ?? existingRelation.role),
      status: input.status ?? "ACTIVE",
    });

    if (email) {
      try {
        await sendUserWelcomeEmail({
          email,
          name,
          temporaryPassword: password,
        });
      } catch (error) {
        console.error("Failed to send user welcome email", error);
      }
    }

    return companyUser;
  }

  const companyUser = await createCompanyUser(companyId, user.id, {
    role: normalizedRole,
    status: input.status ?? "ACTIVE",
  });

  if (email) {
    try {
      await sendUserWelcomeEmail({
        email,
        name,
        temporaryPassword: password,
      });
    } catch (error) {
      console.error("Failed to send user welcome email", error);
    }
  }

  return companyUser;
}
