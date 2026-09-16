import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/operator";
import { CompanyOperatorCompanyIdParams } from "@/models/operator.model";
import { FriendlyError } from "@/utils";
import { operatorListUseCase } from "@/use-cases/operator";

export const operatorListController = async (
  request: FastifyRequest<{
    Params: CompanyOperatorCompanyIdParams;
  }>,
  reply: FastifyReply,
) => {
  const { companyId } = request.params;

  try {
    const operators = await operatorListUseCase(companyId);

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.LIST_OPERATOR_SUCCESS,
      operators,
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
