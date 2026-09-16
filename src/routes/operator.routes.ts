import { FastifyInstance } from "fastify";

import {
  operatorCreateController,
  operatorDeleteController,
  operatorListController,
  operatorLookupController,
  operatorUpdateController,
} from "@/controllers/operator";
import {
  CompanyOperatorCompanyIdParams,
  CompanyOperatorCreateBody,
  CompanyOperatorIdParams,
  CompanyOperatorLookupQuery,
  CompanyOperatorUpdateBody,
} from "@/models/operator.model";

export async function operatorRoutes(server: FastifyInstance) {
  server.get<{
    Params: CompanyOperatorCompanyIdParams;
  }> ("/api/company/:companyId/operators", operatorListController);

  server.get<{
    Params: CompanyOperatorCompanyIdParams;
    Querystring: CompanyOperatorLookupQuery;
  }> ("/api/company/:companyId/operators/lookup", operatorLookupController);

  server.post<{
    Params: CompanyOperatorCompanyIdParams;
    Body: CompanyOperatorCreateBody;
  }> ("/api/company/:companyId/operators", operatorCreateController);

  server.put<{
    Params: CompanyOperatorCompanyIdParams & CompanyOperatorIdParams;
    Body: CompanyOperatorUpdateBody;
  }> ("/api/company/:companyId/operators/:id", operatorUpdateController);

  server.delete<{
    Params: CompanyOperatorCompanyIdParams & CompanyOperatorIdParams;
  }> ("/api/company/:companyId/operators/:id", operatorDeleteController);
}
