import { AppError } from "@/constants/admin";
import { AdminStatus } from "@/generated/prisma/enums";
import { findAdminById, updateAdmin } from "@/repositories/admin.repository";
import { FriendlyError } from "@/utils";

export async function adminToggleStatusUseCase(id: string) {
  const admin = await findAdminById(id);

  if (!admin || admin.status === "DELETED") {
    throw new FriendlyError({
      message: AppError.ADMIN_NOT_FOUND,
      context: "admin.toggleStatus.notFound",
      code: 404,
    });
  }

  const nextStatus =
    admin.status === AdminStatus.ACTIVE ? AdminStatus.INACTIVE : AdminStatus.ACTIVE;

  return updateAdmin(id, { status: nextStatus });
}
