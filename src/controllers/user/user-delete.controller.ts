import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/user";
import { CompanyUserCompanyIdParams, CompanyUserIdParams } from "@/models/user.model";
import { FriendlyError } from "@/utils";
import { userDeleteUseCase } from "@/use-cases/user";

export const userDeleteController = async (
  request: FastifyRequest<{
    Params: CompanyUserCompanyIdParams & CompanyUserIdParams;
  }>,
  reply: FastifyReply,
) => {
  const { companyId, id } = request.params;

  try {
    const companyUser = await userDeleteUseCase(companyId, id);

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.DELETE_USER_SUCCESS,
      companyUser,
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
