import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/auth";
import { authUserAcceptTermsUseCase } from "@/use-cases/auth-user";
import { FriendlyError } from "@/utils";

export const authUserAcceptTermsController = async (
  request: FastifyRequest<{
    Body: { email: string };
  }>,
  reply: FastifyReply,
) => {
  const { email } = request.body ?? {};

  try {
    const user = await authUserAcceptTermsUseCase(email);

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.TERMS_ACCEPTED_SUCCESS,
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
