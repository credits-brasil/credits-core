import { AppError } from "@/constants/admin";
import { UpdateAdminInput } from "@/interfaces/admin";
import { FriendlyError, hashPassword } from "@/utils";
import { findAdminById, updateAdmin } from "@/repositories/admin.repository";

export async function adminUpdateUseCase(id: string, input: UpdateAdminInput) {
  const admin = await findAdminById(id);

  if (!admin || admin.status === "DELETED") {
    throw new FriendlyError({
      message: AppError.ADMIN_NOT_FOUND,
      context: "admin.update.notFound",
      code: 404,
    });
  }

  const data: UpdateAdminInput = { ...input };

  if (input.password) {
    data.password = hashPassword(input.password);
  }

  return updateAdmin(id, data);
}
