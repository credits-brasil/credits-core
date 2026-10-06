import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/company";
import { CompanyCreateBody } from "@/models/company.model";
import { FriendlyError } from "@/utils";
import { companyCreateUseCase } from "@/use-cases/company";

export const companyCreateController = async (
  request: FastifyRequest<{
    Body: CompanyCreateBody;
  }>,
  reply: FastifyReply,
) => {
  try {
    const company = await companyCreateUseCase(request.body);

    return reply.code(201).send({
      statusCode: 201,
      message: AppMessages.CREATE_COMPANY_SUCCESS,
      company,
    });
  } catch (error: unknown) {
    if (error instanceof FriendlyError) {
      return reply.code(error.code).send({
        statusCode: error.code,
        message: error.message,
      });
    }

    console.error("companyCreateController error:", error);

    return reply.code(500).send({
      statusCode: 500,
      message: AppError.INTERNAL_SERVER_ERROR,
    });
  }
};
