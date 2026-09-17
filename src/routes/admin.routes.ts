import { FastifyInstance } from "fastify";

import {
  adminCreateController,
  adminDeleteController,
  adminListController,
  adminToggleStatusController,
  adminUpdateController,
} from "@/controllers/admin";
import { AdminCreateBody, AdminIdParams, AdminUpdateBody } from "@/models/admin.model";

export async function adminRoutes(server: FastifyInstance) {
  server.post<{
    Body: AdminCreateBody;
  }>("/api/admin", adminCreateController);

  server.get<{
    Querystring: { q?: string; search?: string };
  }>("/api/admins", adminListController);

  server.put<{
    Params: AdminIdParams;
    Body: AdminUpdateBody;
  }>("/api/admin/:id", adminUpdateController);
  server.patch<{
    Params: AdminIdParams;
  }> ("/api/admin/:id/status", adminToggleStatusController);
  server.delete<{
    Params: AdminIdParams;
  }>("/api/admin/:id", adminDeleteController);
}
