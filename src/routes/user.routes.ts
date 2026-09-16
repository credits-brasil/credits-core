import { FastifyInstance } from "fastify";

import {
  userCreateController,
  userDeleteController,
  userListController,
  userToggleStatusController,
  userUpdateController,
} from "@/controllers/user";
import { UserCreateBody, UserIdParams, UserUpdateBody } from "@/models/user.model";

export async function userRoutes(server: FastifyInstance) {
  server.post<{
    Body: UserCreateBody;
  }>("/api/user", userCreateController);

  server.get<{
    Querystring: { q?: string; search?: string };
  }>("/api/users", userListController);

  server.put<{
    Params: UserIdParams;
    Body: UserUpdateBody;
  }>("/api/user/:id", userUpdateController);
  server.patch<{
    Params: UserIdParams;
  }> ("/api/user/:id/status", userToggleStatusController);
  server.delete<{
    Params: UserIdParams;
  }>("/api/user/:id", userDeleteController);
}
