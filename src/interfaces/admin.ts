import { AdminStatus } from "../generated/prisma/enums";

export interface CreateAdminInput {
  name: string;
  cpf: string;
  email: string;
  password?: string;
}

export interface UpdateAdminInput {
  name?: string;
  cpf?: string;
  email?: string;
  password?: string;
  status?: AdminStatus;
}
