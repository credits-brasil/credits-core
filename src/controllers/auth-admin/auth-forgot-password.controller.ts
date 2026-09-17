import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/auth";
import { FriendlyError } from "@/utils";
import { authForgotPasswordUseCase } from "@/use-cases/auth-admin";

export const authForgotPasswordController = async (
  request: FastifyRequest<{
    Body: { email: string };
  }>,
  reply: FastifyReply,
) => {
  const { email } = request.body;

  try {
    const reset = await authForgotPasswordUseCase(email);

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.PASSWORD_RESET_TOKEN_SUCCESS,
      reset,
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
