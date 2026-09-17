import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/auth";
import { FriendlyError } from "@/utils";
import { authLoginUseCase } from "@/use-cases/auth-admin";

export const authLoginController = async (
  request: FastifyRequest<{
    Body: { email: string; password: string };
  }>,
  reply: FastifyReply,
) => {
  const { email, password } = request.body;

  try {
    const session = await authLoginUseCase(email, password);

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.LOGIN_SUCCESS,
      session,
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
