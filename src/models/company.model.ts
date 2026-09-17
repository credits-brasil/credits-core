export interface CompanyCreateBody {
  cnpj: string;
  name: string;
  operator_SPC?: string;
  operator_SPC_password?: string;
  limit_consults_daily?: number;
  limit_consults_monthly?: number;
}

export interface CompanyUpdateBody {
  cnpj?: string;
  name?: string;
  operator_SPC?: string;
  operator_SPC_password?: string;
  limit_consults_daily?: number;
  limit_consults_monthly?: number;
  status?: "ACTIVE" | "INACTIVE";
}

export interface CompanyIdParams {
  id: string;
}
