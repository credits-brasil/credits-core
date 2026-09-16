import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/operator";
import { CompanyOperatorCompanyIdParams, CompanyOperatorIdParams, CompanyOperatorUpdateBody } from "@/models/operator.model";
import { FriendlyError } from "@/utils";
import { operatorUpdateUseCase } from "@/use-cases/operator";

export const operatorUpdateController = async (
  request: FastifyRequest<{
    Params: CompanyOperatorCompanyIdParams & CompanyOperatorIdParams;
    Body: CompanyOperatorUpdateBody;
  }>,
  reply: FastifyReply,
) => {
  const { companyId, id } = request.params;

  try {
    const companyOperator = await operatorUpdateUseCase(companyId, id, request.body);

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.UPDATE_OPERATOR_SUCCESS,
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
