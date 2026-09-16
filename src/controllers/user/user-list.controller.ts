import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/user";
import { FriendlyError } from "@/utils";
import { userListUseCase } from "@/use-cases/user";

export const userListController = async (
  request: FastifyRequest<{ Querystring: { q?: string; search?: string } }>,
  reply: FastifyReply,
) => {
  try {
    const search = request.query.q ?? request.query.search ?? "";
    const users = await userListUseCase(search);

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.LIST_USER_SUCCESS,
      users,
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
