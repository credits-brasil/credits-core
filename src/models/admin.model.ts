export interface AdminCreateBody {
  name: string;
  cpf: string;
  email: string;
}

export interface AdminUpdateBody {
  name?: string;
  cpf?: string;
  email?: string;
  password?: string;
  status?: "ACTIVE" | "INACTIVE";
}

export interface AdminIdParams {
  id: string;
}
