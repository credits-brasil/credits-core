import { FastifyInstance } from "fastify";

import {
  userCreateController,
  userDeleteController,
  userListAllController,
  userListController,
  userLookupController,
  userToggleStatusController,
  userUpdateController,
} from "@/controllers/user";
import {
  CompanyUserCompanyIdParams,
  CompanyUserCreateBody,
  CompanyUserIdParams,
  CompanyUserLookupQuery,
  CompanyUserUpdateBody,
} from "@/models/user.model";

export async function userRoutes(server: FastifyInstance) {
  server.get("/api/users", userListAllController);

  server.get<{
    Params: CompanyUserCompanyIdParams;
  }> ("/api/company/:companyId/users", userListController);

  server.get<{
    Params: CompanyUserCompanyIdParams;
    Querystring: CompanyUserLookupQuery;
  }> ("/api/company/:companyId/users/lookup", userLookupController);

  server.post<{
    Params: CompanyUserCompanyIdParams;
    Body: CompanyUserCreateBody;
  }> ("/api/company/:companyId/users", userCreateController);

  server.put<{
    Params: CompanyUserCompanyIdParams & CompanyUserIdParams;
    Body: CompanyUserUpdateBody;
  }> ("/api/company/:companyId/users/:id", userUpdateController);

  server.patch<{
    Params: CompanyUserCompanyIdParams & CompanyUserIdParams;
  }> ("/api/company/:companyId/users/:id/status", userToggleStatusController);

  server.delete<{
    Params: CompanyUserCompanyIdParams & CompanyUserIdParams;
  }> ("/api/company/:companyId/users/:id", userDeleteController);
}
