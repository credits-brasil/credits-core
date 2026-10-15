import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/company";
import { CompanyIdParams, CompanyUpdateBody } from "@/models/company.model";
import { findCompanyById } from "@/repositories/company.repository";
import { FriendlyError } from "@/utils";
import { logPlatformAction } from "@/utils/platform-log";
import { companyUpdateUseCase } from "@/use-cases/company";

export const companyUpdateController = async (
  request: FastifyRequest<{
    Params: CompanyIdParams;
    Body: CompanyUpdateBody;
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;

  try {
    const previousState = await findCompanyById(id);
    const company = await companyUpdateUseCase(id, request.body);

    await logPlatformAction(request, {
      action: "COMPANY_UPDATE",
      entity: "COMPANY",
      previousState,
      newState: company,
      companyId: id,
      companyName: company.name,
      metadata: {
        fieldCount: Object.keys(request.body ?? {}).length,
      },
    });

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

    return reply.code(500).send({
      statusCode: 500,
      message: AppError.INTERNAL_SERVER_ERROR,
    });
  }
};
