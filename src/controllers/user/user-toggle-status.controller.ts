import { FastifyReply, FastifyRequest } from "fastify";

import { AppError, AppMessages } from "@/constants/user";
import { CompanyUserCompanyIdParams, CompanyUserIdParams } from "@/models/user.model";
import { findCompanyUserById } from "@/repositories/user.repository";
import { FriendlyError } from "@/utils";
import { logPlatformAction } from "@/utils/platform-log";
import { userToggleStatusUseCase } from "@/use-cases/user";

export const userToggleStatusController = async (
  request: FastifyRequest<{
    Params: CompanyUserCompanyIdParams & CompanyUserIdParams;
  }>,
  reply: FastifyReply,
) => {
  const { companyId, id } = request.params;

  try {
    const previousState = await findCompanyUserById(id);
    const companyUser = await userToggleStatusUseCase(companyId, id);

    await logPlatformAction(request, {
      action: "USER_STATUS_UPDATE",
      entity: "USER",
      previousState,
      newState: companyUser,
      companyId,
      metadata: {
        userRelationId: id,
      },
    });

    return reply.code(200).send({
      statusCode: 200,
      message: AppMessages.UPDATE_USER_SUCCESS,
      companyUser,
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
