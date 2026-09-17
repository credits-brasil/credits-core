import { FastifyReply, FastifyRequest } from "fastify";

import { AppError } from "@/constants/auth";
import { resetUserPassword } from "@/use-cases/auth-user";
import { FriendlyError } from "@/utils";

export const authUserResetPasswordController = async (
  request: FastifyRequest<{
    Body: { email: string; code: string; newPassword: string };
  }>,
  reply: FastifyReply,
) => {
  const { email, code, newPassword } = request.body ?? {};

  try {
    const result = await resetUserPassword(email, code, newPassword);

    return reply.code(200).send({ statusCode: 200, ...result });
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