import { AppError } from "@/constants/admin";
import { FriendlyError } from "@/utils";
import { findAdminById, softDeleteAdmin } from "@/repositories/admin.repository";

export async function adminDeleteUseCase(id: string) {
  const admin = await findAdminById(id);

  if (!admin || admin.status === "DELETED") {
    throw new FriendlyError({
      message: AppError.ADMIN_NOT_FOUND,
      context: "admin.delete.notFound",
      code: 404,
    });
  }

  return softDeleteAdmin(id);
}
