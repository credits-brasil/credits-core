import { FastifyReply, FastifyRequest } from "fastify";

import { AppError } from "@/constants/auth";
import { resetUserPassword } from "@/use-cases/auth-user";
import { FriendlyError } from "@/utils";

export const authUserResetPasswordController = async (
  request: FastifyRequest<{
    Body: { email: string; resetToken: string; newPassword: string };
  }>,
  reply: FastifyReply,
) => {
  const { email, resetToken, newPassword } = request.body ?? {};

  try {
    const result = await resetUserPassword(email, resetToken, newPassword);

    return reply.code(200).send({ statusCode: 200, ...result });
  } catch (error: unknown) {
    if (error instanceof FriendlyError) {
      return reply.code(error.code).send({
        statusCode: error.code,
        message: error.message,
      });
    }

    console.error("[auth.user.resetPassword]", error);

    return reply.code(500).send({
      statusCode: 500,
      message: AppError.INTERNAL_SERVER_ERROR,
    });
  }
};