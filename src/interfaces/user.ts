export type UserRole = "ADMIN" | "USER";
export type UserCompanyStatus = "ACTIVE" | "INACTIVE";

export interface CreateCompanyUserInput {
  companyId: string;
  name: string;
  cpf: string;
  password: string;
  role?: UserRole;
  status?: UserCompanyStatus;
}

export interface UpdateCompanyUserInput {
  companyId?: string;
  name?: string;
  cpf?: string;
  password?: string;
  role?: UserRole;
  status?: UserCompanyStatus;
}
