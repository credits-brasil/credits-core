import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/admin";
import { AdminIdParams, AdminUpdateBody } from "@/models/admin.model";
import { FriendlyError } from "@/utils";
import { adminUpdateUseCase } from "@/use-cases/admin";

export const adminUpdateController = async (
  request: FastifyRequest<{
    Params: AdminIdParams;
    Body: AdminUpdateBody;
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;

  try {
    const admin = await adminUpdateUseCase(id, request.body);

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.UPDATE_ADMIN_SUCCESS,
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
