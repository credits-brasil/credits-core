import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/auth";
import { FriendlyError } from "@/utils";
import { authCreateUserUseCase } from "@/use-cases/auth";

export const authCreateUserController = async (
  request: FastifyRequest<{
    Body: { name: string; email: string; password: string };
  }>,
  reply: FastifyReply,
) => {
  const { name, email, password } = request.body;

  try {
    const user = await authCreateUserUseCase(name, email, password);

    return reply.code(201).send({
      statusCode: 201,
      message: AppMessages.USER_CREATED_SUCCESS,
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