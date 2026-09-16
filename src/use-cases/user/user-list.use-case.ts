import { listUsers } from "@/repositories/user.repository";

export async function userListUseCase(search?: string) {
  return listUsers(search);
}
