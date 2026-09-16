export interface CompanyOperatorCreateBody {
  user?: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  role?: "ADMIN" | "OPERATOR";
  status?: "ACTIVE" | "INACTIVE";
}

export interface CompanyOperatorUpdateBody {
  user?: string;
  name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: "ADMIN" | "OPERATOR";
  status?: "ACTIVE" | "INACTIVE";
}

export interface CompanyOperatorIdParams {
  id: string;
}

export interface CompanyOperatorCompanyIdParams {
  companyId: string;
}

export interface CompanyOperatorLookupQuery {
  cpf: string;
}
