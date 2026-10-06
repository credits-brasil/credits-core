import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/auth";
import { FriendlyError } from "@/utils";
import { authFirstAccessPasswordUseCase } from "@/use-cases/auth-admin";

export const authFirstAccessPasswordController = async (
  request: FastifyRequest<{
    Body: { email: string; currentPassword: string; newPassword: string };
  }>,
  reply: FastifyReply,
) => {
  const { email, currentPassword, newPassword } = request.body ?? {};

  try {
    const admin = await authFirstAccessPasswordUseCase(email, currentPassword, newPassword);

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.FIRST_ACCESS_PASSWORD_SUCCESS,
      admin,
    });
  } catch (error: unknown) {
    if (error instanceof FriendlyError) {
      return reply.code(error.code).send({
        statusCode: error.code,
        message: error.message,
      });
    }

    request.log.error({ err: error }, "Admin first-access password change failed");

    return reply.code(500).send({
      statusCode: 500,
      message: AppError.INTERNAL_SERVER_ERROR,
    });
  }
};
