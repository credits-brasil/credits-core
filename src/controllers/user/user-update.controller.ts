import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/user";
import { CompanyUserCompanyIdParams, CompanyUserIdParams, CompanyUserUpdateBody } from "@/models/user.model";
import { FriendlyError } from "@/utils";
import { userUpdateUseCase } from "@/use-cases/user";

export const userUpdateController = async (
  request: FastifyRequest<{
    Params: CompanyUserCompanyIdParams & CompanyUserIdParams;
    Body: CompanyUserUpdateBody;
  }>,
  reply: FastifyReply,
) => {
  const { companyId, id } = request.params;

  try {
    const companyUser = await userUpdateUseCase(companyId, id, request.body);

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.UPDATE_USER_SUCCESS,
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
