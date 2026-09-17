import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/user";
import { CompanyUserCompanyIdParams, CompanyUserCreateBody } from "@/models/user.model";
import { FriendlyError } from "@/utils";
import { userCreateUseCase } from "@/use-cases/user";

export const userCreateController = async (
  request: FastifyRequest<{
    Params: CompanyUserCompanyIdParams;
    Body: CompanyUserCreateBody;
  }>,
  reply: FastifyReply,
) => {
  const { companyId } = request.params;

  try {
    const companyUser = await userCreateUseCase(companyId, request.body);

    return reply.code(201).send({
      statusCode: 201,
      message: AppMessages.CREATE_USER_SUCCESS,
      companyUser,
    });
  } catch (error: unknown) {
    if (error instanceof FriendlyError) {
      return reply.code(error.code).send({
        statusCode: error.code,
        message: error.message,
      });
    }

    const prismaUniqueError = error as { code?: string; meta?: { target?: string[] } };
    if (prismaUniqueError?.code === "P2002") {
      return reply.code(409).send({
        statusCode: 409,
        message: AppError.USER_ALREADY_EXISTS,
      });
    }

    return reply.code(500).send({
      statusCode: 500,
      message: AppError.INTERNAL_SERVER_ERROR,
    });
  }
};
