import { AppError } from "@/constants/user";
import { UpdateUserInput } from "@/interfaces/user";
import { FriendlyError, hashPassword } from "@/utils";
import { findUserById, updateUser } from "@/repositories/user.repository";

export async function userUpdateUseCase(id: string, input: UpdateUserInput) {
  const user = await findUserById(id);

  if (!user || user.status === "DELETED") {
    throw new FriendlyError({
      message: AppError.USER_NOT_FOUND,
      context: "user.update.notFound",
      code: 404,
    });
  }

  const data: UpdateUserInput = { ...input };

  if (input.password) {
    data.password = hashPassword(input.password);
  }

  return updateUser(id, data);
}
