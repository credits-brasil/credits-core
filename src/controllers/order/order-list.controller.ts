import { FastifyReply, FastifyRequest } from "fastify";

import { listOrders } from "@/repositories/order.repository";
import { requireAdmin } from "@/utils/admin-auth";

export const orderListController = async (
  request: FastifyRequest<{
    Querystring: {
      page?: string;
      pageSize?: string;
      search?: string;
      status?: "PROCESS" | "SUCCESS" | "FAILED";
    };
  }>,
  reply: FastifyReply,
) => {
  if (!(await requireAdmin(request, reply))) return;

  const page = Math.max(Number(request.query.page ?? 1) || 1, 1);
  const pageSize = Math.min(Math.max(Number(request.query.pageSize ?? 20) || 20, 1), 100);
  const [orders, total] = await listOrders({
    page,
    pageSize,
    search: request.query.search,
    status: request.query.status,
  });

  return reply.send({
    statusCode: 200,
    orders,
    pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  });
};