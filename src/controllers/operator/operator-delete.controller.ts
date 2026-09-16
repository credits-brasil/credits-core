import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/operator";
import { CompanyOperatorCompanyIdParams, CompanyOperatorIdParams } from "@/models/operator.model";
import { FriendlyError } from "@/utils";
import { operatorDeleteUseCase } from "@/use-cases/operator";

export const operatorDeleteController = async (
  request: FastifyRequest<{
    Params: CompanyOperatorCompanyIdParams & CompanyOperatorIdParams;
  }>,
  reply: FastifyReply,
) => {
  const { companyId, id } = request.params;

  try {
    const companyOperator = await operatorDeleteUseCase(companyId, id);

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.DELETE_OPERATOR_SUCCESS,
      companyOperator,
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
