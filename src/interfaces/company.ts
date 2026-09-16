import { CompanyPeriod, CompanyStatus } from "../generated/prisma/enums";

export interface CreateCompanyInput {
  cnpj: string;
  name: string;
  operator_SPC?: string;
  operator_SPC_password?: string;
  limit_consults?: number;
  period_limit_consults?: CompanyPeriod;
  tasting_product_quantity?: number;
  tasting_start_date?: Date | string | null;
  tasting_end_date?: Date | string | null;
}

export interface UpdateCompanyInput {
  cnpj?: string;
  name?: string;
  operator_SPC?: string;
  operator_SPC_password?: string;
  limit_consults?: number;
  period_limit_consults?: CompanyPeriod;
  tasting_product_quantity?: number;
  tasting_start_date?: Date | string | null;
  tasting_end_date?: Date | string | null;
  status?: CompanyStatus;
}
