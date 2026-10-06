import { FastifyReply, FastifyRequest } from "fastify";

import { AppError } from "@/constants/auth";
import { verifyUserPasswordResetCode } from "@/use-cases/auth-user";
import { FriendlyError } from "@/utils";

export const authUserVerifyResetCodeController = async (
  request: FastifyRequest<{
    Body: { email: string; code: string };
  }>,
  reply: FastifyReply,
) => {
  const { email, code } = request.body ?? {};

  try {
    const result = await verifyUserPasswordResetCode(email, code);

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