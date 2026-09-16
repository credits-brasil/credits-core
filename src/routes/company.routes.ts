import { FastifyInstance } from "fastify";

import {
  companyCreateController,
  companyDeleteController,
  companyListController,
  companyToggleStatusController,
  companyUpdateController,
} from "@/controllers/company";
import {
  CompanyCreateBody,
  CompanyIdParams,
  CompanyUpdateBody,
} from "@/models/company.model";

export async function companyRoutes(server: FastifyInstance) {
  server.post<{
    Body: CompanyCreateBody;
  }>("/api/company", companyCreateController);

  server.get<{
    Querystring: { q?: string; search?: string };
  }>("/api/companies", companyListController);

  server.put<{
    Params: CompanyIdParams;
    Body: CompanyUpdateBody;
  }>("/api/company/:id", companyUpdateController);

  server.patch<{
    Params: CompanyIdParams;
  }> ("/api/company/:id/status", companyToggleStatusController);

  server.patch<{
    Params: CompanyIdParams;
  }> ("/api/company/:id/toggle-status", companyToggleStatusController);

  server.delete<{
    Params: CompanyIdParams;
  }>("/api/company/:id", companyDeleteController);
}
