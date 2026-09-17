export interface CompanyUserCreateBody {
  user?: string;
  name: string;
  cpf: string;
  email?: string;
  phone: string;
  password: string;
  role?: "ADMIN" | "USER";
  status?: "ACTIVE" | "INACTIVE";
}

export interface CompanyUserUpdateBody {
  user?: string;
  name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: "ADMIN" | "USER";
  status?: "ACTIVE" | "INACTIVE";
}

export interface CompanyUserIdParams {
  id: string;
}

export interface CompanyUserCompanyIdParams {
  companyId: string;
}

export interface CompanyUserLookupQuery {
  cpf: string;
}
