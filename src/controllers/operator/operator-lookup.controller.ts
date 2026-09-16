import { FastifyReply, FastifyRequest } from "fastify";

import { AppError } from "@/constants/operator";
import { CompanyOperatorCompanyIdParams, CompanyOperatorLookupQuery } from "@/models/operator.model";
import { FriendlyError } from "@/utils";
import { operatorLookupByCpfUseCase } from "@/use-cases/operator";

export const operatorLookupController = async (
  request: FastifyRequest<{
    Params: CompanyOperatorCompanyIdParams;
    Querystring: CompanyOperatorLookupQuery;
  }>,
  reply: FastifyReply,
) => {
  const { companyId } = request.params;
  const { cpf } = request.query;

  try {
    const result = await operatorLookupByCpfUseCase(companyId, cpf);

    return reply.code(200).send({
      statusCode: 200,
      exists: result.exists,
      operator: result.operator,
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
