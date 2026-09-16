import { AppError } from "@/constants/user";
import { UserStatus } from "@/generated/prisma/enums";
import { findUserById, updateUser } from "@/repositories/user.repository";
import { FriendlyError } from "@/utils";

export async function userToggleStatusUseCase(id: string) {
  const user = await findUserById(id);

  if (!user || user.status === "DELETED") {
    throw new FriendlyError({
      message: AppError.USER_NOT_FOUND,
      context: "user.toggleStatus.notFound",
      code: 404,
    });
  }

  const nextStatus =
    user.status === UserStatus.ACTIVE ? UserStatus.INACTIVE : UserStatus.ACTIVE;

  return updateUser(id, { status: nextStatus });
}
