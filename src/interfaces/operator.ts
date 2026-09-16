export type OperatorRole = "ADMIN" | "OPERATOR";
export type OperatorCompanyStatus = "ACTIVE" | "INACTIVE";

export interface CreateCompanyOperatorInput {
  companyId: string;
  name: string;
  cpf: string;
  password: string;
  role?: OperatorRole;
  status?: OperatorCompanyStatus;
}

export interface UpdateCompanyOperatorInput {
  companyId?: string;
  name?: string;
  cpf?: string;
  password?: string;
  role?: OperatorRole;
  status?: OperatorCompanyStatus;
}
