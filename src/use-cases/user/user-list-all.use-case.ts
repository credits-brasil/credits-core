import { listUsersWithCompanies } from "@/repositories/user.repository";

export async function userListAllUseCase() {
  return listUsersWithCompanies();
}
