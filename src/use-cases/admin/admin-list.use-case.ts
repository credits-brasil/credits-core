import { listAdmins } from "@/repositories/admin.repository";

export async function adminListUseCase(search?: string) {
  return listAdmins(search);
}
