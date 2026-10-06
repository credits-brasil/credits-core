import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/company";
import { CompanyIdParams } from "@/models/company.model";
import { FriendlyError } from "@/utils";
import { companyToggleStatusUseCase } from "@/use-cases/company";

export const companyToggleStatusController = async (
  request: FastifyRequest<{
    Params: CompanyIdParams;
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;

  try {
    const company = await companyToggleStatusUseCase(id);

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.UPDATE_COMPANY_SUCCESS,
      company,
    });
  } catch (error: unknown) {
    if (error instanceof FriendlyError) {
      return reply.code(error.code).send({
        statusCode: error.code,
        message: error.message,
      });
    }

    console.error("companyToggleStatusController error:", error);

    return reply.code(500).send({
      statusCode: 500,
      message: AppError.INTERNAL_SERVER_ERROR,
    });
  }
};
