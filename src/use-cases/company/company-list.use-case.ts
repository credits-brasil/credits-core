import { listCompanies } from "@/repositories/company.repository";

export async function companyListUseCase(search?: string) {
  return listCompanies(search);
}
