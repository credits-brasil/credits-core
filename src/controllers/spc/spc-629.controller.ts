import { FastifyReply, FastifyRequest } from "fastify";

import { SPCUseCases } from "@/use-cases/spc";

import { FriendlyError } from "@/utils/friendly-error";

import { AppError, AppMessages } from "@/constants/spc";
import { requireUserCompany } from "@/utils/user-auth";

export const spc629Controller = async (request: FastifyRequest<{Body: { document: string; typeDocument: "CPF" | "CNPJ"; insumos: number[]; companyId: string; telefone?: string } }>, reply: FastifyReply) => {
    const { document, typeDocument, insumos, companyId } = request.body;
  const authenticatedUser = await requireUserCompany(request, reply, companyId);
  if (!authenticatedUser) return;

  const spcUseCases = new SPCUseCases();

  try {
    const spc = await spcUseCases.spc629(document, typeDocument, insumos, {
      userId: authenticatedUser.id,
      userName: authenticatedUser.name,
      companyId: authenticatedUser.companyId,
      companyName: authenticatedUser.companyName,
      ip: request.ip,
      host: request.headers.host ?? "",
    });

    return reply.code(200).send({ statusCode: 200, message: AppMessages.GET_ALL_BRANDS_SUCCESS, spc });
  } catch (error: unknown) {
    if (error instanceof FriendlyError) {
      return reply
        .code((error as FriendlyError).code)
        .send({ statusCode: (error as FriendlyError).code, message: (error as FriendlyError).message });
    } else {
      return reply.code(500).send({ statusCode: 500, message: AppError.INTERNAL_SERVER_ERROR });
    }
  }
};