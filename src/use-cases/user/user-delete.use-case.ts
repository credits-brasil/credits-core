import { AppError } from "@/constants/user";
import { FriendlyError } from "@/utils";
import { findUserById, softDeleteUser } from "@/repositories/user.repository";

export async function userDeleteUseCase(id: string) {
  const user = await findUserById(id);

  if (!user || user.status === "DELETED") {
    throw new FriendlyError({
      message: AppError.USER_NOT_FOUND,
      context: "user.delete.notFound",
      code: 404,
    });
  }

  return softDeleteUser(id);
}
