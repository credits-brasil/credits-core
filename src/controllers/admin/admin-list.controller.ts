import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/admin";
import { FriendlyError } from "@/utils";
import { adminListUseCase } from "@/use-cases/admin";

export const adminListController = async (
  request: FastifyRequest<{ Querystring: { q?: string; search?: string } }>,
  reply: FastifyReply,
) => {
  try {
    const search = request.query.q ?? request.query.search ?? "";
    const admins = await adminListUseCase(search);

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.LIST_ADMIN_SUCCESS,
      admins,
    });
  } catch (error: unknown) {
    if (error instanceof FriendlyError) {
      return reply.code(error.code).send({
        statusCode: error.code,
        message: error.message,
      });
    }

    return reply.code(500).send({
      statusCode: 500,
      message: AppError.INTERNAL_SERVER_ERROR,
    });
  }
};
