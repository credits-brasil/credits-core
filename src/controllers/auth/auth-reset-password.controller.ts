import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/auth";
import { FriendlyError } from "@/utils";
import { authResetPasswordUseCase } from "@/use-cases/auth";

export const authResetPasswordController = async (
  request: FastifyRequest<{
    Body: { email: string; token: string; newPassword: string };
  }>,
  reply: FastifyReply,
) => {
  const { email, token, newPassword } = request.body;

  try {
    const user = await authResetPasswordUseCase(email, token, newPassword);

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.PASSWORD_RESET_SUCCESS,
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