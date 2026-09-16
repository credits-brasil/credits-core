import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/company";
import { CompanyIdParams } from "@/models/company.model";
import { FriendlyError } from "@/utils";
import { companyDeleteUseCase } from "@/use-cases/company";

export const companyDeleteController = async (
  request: FastifyRequest<{
    Params: CompanyIdParams;
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;

  try {
    const company = await companyDeleteUseCase(id);

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.DELETE_COMPANY_SUCCESS,
      company,
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
