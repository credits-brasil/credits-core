import { CompanyStatus } from "../generated/prisma/enums";

export interface CreateCompanyInput {
  cnpj: string;
  name: string;
  operator_SPC?: string;
  operator_SPC_password?: string;
  limit_consults_daily?: number;
  limit_consults_monthly?: number;
}

export interface UpdateCompanyInput {
  cnpj?: string;
  name?: string;
  operator_SPC?: string;
  operator_SPC_password?: string;
  limit_consults_daily?: number;
  limit_consults_monthly?: number;
  status?: CompanyStatus;
}
