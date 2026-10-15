import { FastifyReply, FastifyRequest } from "fastify";

import { listPlatformLogs } from "@/repositories/platform-log.repository";

export const platformLogListController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const query = (request.query ?? {}) as Record<string, string | string[] | undefined>;
  const page = Number(Array.isArray(query.page) ? query.page[0] : query.page ?? "1");
  const limit = Number(Array.isArray(query.limit) ? query.limit[0] : query.limit ?? "20");
  const result = await listPlatformLogs(limit, page);

  return reply.code(200).send({
    statusCode: 200,
    page: result.page,
    limit: result.limit,
    total: result.total,
    totalPages: result.totalPages,
    hasPreviousPage: result.hasPreviousPage,
    hasNextPage: result.hasNextPage,
    logs: result.logs.map((log) => ({
      id: log._id,
      action: log.action,
      entity: log.entity,
      actor: log.actor,
      source: log.source,
      previousState: log.previousState,
      newState: log.newState,
      companyId: log.companyId,
      companyName: log.companyName,
      ip: log.ip,
      userAgent: log.userAgent,
      requestPath: log.requestPath,
      metadata: log.metadata,
      createdAt: log.createdAt,
      updatedAt: log.updatedAt,
    })),
  });
};
