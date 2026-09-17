import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/auth";
import { FriendlyError } from "@/utils";
import { authCreateAdminUseCase } from "@/use-cases/auth-admin";

export const authCreateAdminController = async (
  request: FastifyRequest<{
    Body: { name: string; email: string; password: string };
  }>,
  reply: FastifyReply,
) => {
  const { name, email, password } = request.body;

  try {
    const admin = await authCreateAdminUseCase(name, email, password);

    return reply.code(201).send({
      statusCode: 201,
      message: AppMessages.ADMIN_CREATED_SUCCESS,
      admin,
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
