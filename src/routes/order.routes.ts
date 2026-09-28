import { FastifyInstance } from "fastify";

import { orderListController } from "@/controllers/order";

export async function orderRoutes(server: FastifyInstance) {
  server.get<{
    Querystring: {
      page?: string;
      pageSize?: string;
      search?: string;
      status?: "PROCESS" | "SUCCESS" | "FAILED";
    };
  }>("/api/orders", orderListController);
}