import { AppError } from "@/constants/auth";
import { prisma } from "@/repositories/prisma";
import { findUserByEmail } from "@/repositories/user.repository";
import { FriendlyError } from "@/utils";

export async function authUserAcceptTermsUseCase(email: string) {
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!normalizedEmail) {
    throw new FriendlyError({
      message: AppError.INVALID_PAYLOAD,
      context: "auth.user.acceptTerms.validation",
      code: 400,
    });
  }

  const user = await findUserByEmail(normalizedEmail);

  if (!user) {
    throw new FriendlyError({
      message: AppError.USER_NOT_FOUND,
      context: "auth.user.acceptTerms.notFound",
      code: 404,
    });
  }

  if (user.acceptedTerms) {
    return { id: user.id, acceptedTerms: true };
  }

  return prisma.user.update({
    where: { id: user.id },
    data: { acceptedTerms: true },
    select: {
      id: true,
      acceptedTerms: true,
    },
  });
}
