import { FastifyReply, FastifyRequest } from "fastify";

import { AppError } from "@/constants/user";
import { CompanyUserCompanyIdParams, CompanyUserLookupQuery } from "@/models/user.model";
import { FriendlyError } from "@/utils";
import { userLookupByCpfUseCase } from "@/use-cases/user";

export const userLookupController = async (
  request: FastifyRequest<{
    Params: CompanyUserCompanyIdParams;
    Querystring: CompanyUserLookupQuery;
  }>,
  reply: FastifyReply,
) => {
  const { companyId } = request.params;
  const { cpf } = request.query;

  try {
    const result = await userLookupByCpfUseCase(companyId, cpf);

    return reply.code(200).send({
      statusCode: 200,
      exists: result.exists,
      user: result.user,
      alreadyLinkedToCompany: result.alreadyLinkedToCompany,
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
