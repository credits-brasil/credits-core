import { FastifyReply, FastifyRequest } from "fastify";

import { listOrders } from "@/repositories/order.repository";
import { listSpcInputDetailsByCodes } from "@/repositories/spc-input.repository";
import { findSpcOrderSnapshotsByOrderIds } from "@/repositories/spc-order-persistence.repository";
import { requireAdmin } from "@/utils/admin-auth";

export const orderListController = async (
  request: FastifyRequest<{
    Querystring: {
      page?: string;
      pageSize?: string;
      search?: string;
      status?: "PROCESS" | "SUCCESS" | "FAILED";
      companyId?: string;
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
    companyId: request.query.companyId,
  });

  const snapshots = await findSpcOrderSnapshotsByOrderIds(
    orders.map((order) => order.id),
  );

  const snapshotsByOrderId = new Map(
    snapshots.map((snapshot) => [snapshot._id, snapshot]),
  );

  const ordersWithSnapshots = await Promise.all(
    orders.map(async (order) => {
      const snapshot = snapshotsByOrderId.get(order.id);
      const inputCodes = Array.isArray(order.inputs)
        ? order.inputs.filter((value): value is string => typeof value === "string")
        : [];

      const inputDetails = await listSpcInputDetailsByCodes(
        order.typeDocument,
        inputCodes,
      );

      const resultError =
        typeof order.error === "string" && order.error.trim().length > 0
          ? order.error
          : typeof snapshot?.result === "object" && snapshot.result !== null && "error" in snapshot.result
            ? String((snapshot.result as { error?: unknown }).error ?? "")
            : null;

      return {
        ...order,
        error: resultError,
        xml: snapshot?.xml ?? null,
        result: snapshot?.result ?? null,
        json: snapshot?.json ?? null,
        inputCodes,
        inputDetails,
      };
    }),
  );

  return reply.send({
    statusCode: 200,
    orders: ordersWithSnapshots,
    pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  });
};