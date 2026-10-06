import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/user";
import { FriendlyError } from "@/utils";
import { userListAllUseCase } from "@/use-cases/user/user-list-all.use-case";

export const userListAllController = async (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const users = await userListAllUseCase();

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
