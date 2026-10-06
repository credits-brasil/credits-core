import { FastifyReply, FastifyRequest } from "fastify";

import { AppError } from "@/constants/auth";
import { AuthVerifyResetCodeBody } from "@/models/auth.model";
import { verifyAdminPasswordResetCode } from "@/use-cases/auth-admin/auth-verify-reset-code.use-case";
import { FriendlyError } from "@/utils";

export const authAdminVerifyResetCodeController = async (
  request: FastifyRequest<{ Body: AuthVerifyResetCodeBody }>,
  reply: FastifyReply,
) => {
  const { email, code } = request.body ?? {};
  try {
    const result = await verifyAdminPasswordResetCode(email, code);
    return reply.code(200).send({ statusCode: 200, ...result });
  } catch (error: unknown) {
    if (error instanceof FriendlyError) {
      return reply.code(error.code).send({ statusCode: error.code, message: error.message });
    }
    request.log.error({ err: error }, "Admin reset code verification failed");
    return reply.code(500).send({ statusCode: 500, message: AppError.INTERNAL_SERVER_ERROR });
  }
};
