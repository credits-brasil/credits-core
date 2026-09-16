import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/user";
import { UserCreateBody } from "@/models/user.model";
import { FriendlyError } from "@/utils";
import { userCreateUseCase } from "@/use-cases/user";

export const userCreateController = async (
  request: FastifyRequest<{
    Body: UserCreateBody;
  }>,
  reply: FastifyReply,
) => {
  try {
    const user = await userCreateUseCase(request.body);

    return reply.code(201).send({
      statusCode: 201,
      message: AppMessages.CREATE_USER_SUCCESS,
      user,
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
