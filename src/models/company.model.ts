export interface CompanyCreateBody {
  cnpj: string;
  name: string;
  operator_SPC?: string;
  operator_SPC_password?: string;
  limit_consults?: number;
  period_limit_consults?: "DAILY" | "WEEKLY" | "MONTHLY";
  tasting_product_quantity?: number;
  tasting_start_date?: string;
  tasting_end_date?: string;
}

export interface CompanyUpdateBody {
  cnpj?: string;
  name?: string;
  operator_SPC?: string;
  operator_SPC_password?: string;
  limit_consults?: number;
  period_limit_consults?: "DAILY" | "WEEKLY" | "MONTHLY";
  tasting_product_quantity?: number;
  tasting_start_date?: string;
  tasting_end_date?: string;
  status?: "ACTIVE" | "INACTIVE";
}

export interface CompanyIdParams {
  id: string;
}
