export interface UserCreateBody {
  name: string;
  cpf: string;
  email: string;
}

export interface UserUpdateBody {
  name?: string;
  cpf?: string;
  email?: string;
  password?: string;
  status?: "ACTIVE" | "INACTIVE";
}

export interface UserIdParams {
  id: string;
}
