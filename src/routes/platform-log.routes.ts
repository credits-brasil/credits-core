import { FastifyInstance } from "fastify";

import { platformLogListController } from "@/controllers/platform/platform-log-list.controller";

export async function platformLogRoutes(server: FastifyInstance) {
  server.get("/api/platform-logs", platformLogListController);
}
