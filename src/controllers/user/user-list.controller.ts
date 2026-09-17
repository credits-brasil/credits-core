import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/user";
import { CompanyUserCompanyIdParams } from "@/models/user.model";
import { FriendlyError } from "@/utils";
import { userListUseCase } from "@/use-cases/user";

export const userListController = async (
  request: FastifyRequest<{
    Params: CompanyUserCompanyIdParams;
  }>,
  reply: FastifyReply,
) => {
  const { companyId } = request.params;

  try {
    const users = await userListUseCase(companyId);

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.LIST_USER_SUCCESS,
      users,
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
