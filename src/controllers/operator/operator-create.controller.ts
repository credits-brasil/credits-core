import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/operator";
import { CompanyOperatorCompanyIdParams, CompanyOperatorCreateBody } from "@/models/operator.model";
import { FriendlyError } from "@/utils";
import { operatorCreateUseCase } from "@/use-cases/operator";

export const operatorCreateController = async (
  request: FastifyRequest<{
    Params: CompanyOperatorCompanyIdParams;
    Body: CompanyOperatorCreateBody;
  }>,
  reply: FastifyReply,
) => {
  const { companyId } = request.params;

  try {
    const companyOperator = await operatorCreateUseCase(companyId, request.body);

    return reply.code(201).send({
      statusCode: 201,
      message: AppMessages.CREATE_OPERATOR_SUCCESS,
      companyOperator,
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
        message: AppError.OPERATOR_ALREADY_EXISTS,
      });
    }

    return reply.code(500).send({
      statusCode: 500,
      message: AppError.INTERNAL_SERVER_ERROR,
    });
  }
};
