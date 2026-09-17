import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/admin";
import { AdminCreateBody } from "@/models/admin.model";
import { FriendlyError } from "@/utils";
import { adminCreateUseCase } from "@/use-cases/admin";

export const adminCreateController = async (
  request: FastifyRequest<{
    Body: AdminCreateBody;
  }>,
  reply: FastifyReply,
) => {
  try {
    const admin = await adminCreateUseCase(request.body);

    return reply.code(201).send({
      statusCode: 201,
      message: AppMessages.CREATE_ADMIN_SUCCESS,
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
