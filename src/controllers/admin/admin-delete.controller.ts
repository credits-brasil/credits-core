import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/admin";
import { AdminIdParams } from "@/models/admin.model";
import { FriendlyError } from "@/utils";
import { adminDeleteUseCase } from "@/use-cases/admin";

export const adminDeleteController = async (
  request: FastifyRequest<{
    Params: AdminIdParams;
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;

  try {
    const admin = await adminDeleteUseCase(id);

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.DELETE_ADMIN_SUCCESS,
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
