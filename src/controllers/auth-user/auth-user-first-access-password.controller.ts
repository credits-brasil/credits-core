import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/auth";
import { authUserFirstAccessPasswordUseCase } from "@/use-cases/auth-user";
import { FriendlyError } from "@/utils";

export const authUserFirstAccessPasswordController = async (
  request: FastifyRequest<{
    Body: { email: string; currentPassword: string; newPassword: string };
  }>,
  reply: FastifyReply,
) => {
  const { email, currentPassword, newPassword } = request.body ?? {};

  try {
    const user = await authUserFirstAccessPasswordUseCase(email, currentPassword, newPassword);

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.FIRST_ACCESS_PASSWORD_SUCCESS,
      user,
    });
  } catch (error: unknown) {
    if (error instanceof FriendlyError) {
      return reply.code(error.code).send({
        statusCode: error.code,
        message: error.message,
      });
    }

    request.log.error({ err: error }, "User first-access password change failed");

    return reply.code(500).send({
      statusCode: 500,
      message: AppError.INTERNAL_SERVER_ERROR,
    });
  }
};
