import { UserStatus } from "../generated/prisma/enums";

export interface CreateUserInput {
  name: string;
  cpf: string;
  email: string;
  password?: string;
}

export interface UpdateUserInput {
  name?: string;
  cpf?: string;
  email?: string;
  password?: string;
  status?: UserStatus;
}
